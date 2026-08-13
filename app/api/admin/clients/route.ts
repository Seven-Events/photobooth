import { requireAdminApi } from '@/lib/admin-api';
import { NextResponse } from 'next/server';

/** Customers with their booking history rolled up. */
export async function GET() {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { data: clients, error } = await gate.db
    .from('users')
    .select('id, full_name, email, phone, created_at')
    .eq('role', 'client')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load clients:', error);
    return NextResponse.json({ error: 'Could not load clients' }, { status: 500 });
  }

  const { data: events } = await gate.db
    .from('events')
    .select('id, user_id, event_date, event_title, status, total_cents, deposit_status');

  // Rolled up here rather than with a query per client, which would be one
  // round trip per row.
  const byUser = new Map<string, { count: number; lifetimeCents: number; latest: string | null; upcoming: number }>();
  const today = new Date(new Date().toDateString());

  for (const e of events ?? []) {
    if (e.status === 'cancelled') continue;
    const agg = byUser.get(e.user_id) ?? { count: 0, lifetimeCents: 0, latest: null, upcoming: 0 };
    agg.count += 1;
    agg.lifetimeCents += e.total_cents ?? 0;
    if (!agg.latest || e.event_date > agg.latest) agg.latest = e.event_date;
    if (new Date(e.event_date + 'T00:00:00') >= today) agg.upcoming += 1;
    byUser.set(e.user_id, agg);
  }

  return NextResponse.json({
    clients: (clients ?? []).map((c) => ({
      ...c,
      ...(byUser.get(c.id) ?? { count: 0, lifetimeCents: 0, latest: null, upcoming: 0 }),
    })),
  });
}
