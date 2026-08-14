import { createAdminClient } from '@/lib/supabase/admin';
import { getBooth } from '@/lib/packages';
import { NextResponse } from 'next/server';

/**
 * Which dates in a month are unavailable for a booth, for the booking
 * calendar. Public, so only date strings come back — never who booked or what,
 * same privacy rule as /api/availability.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month'); // YYYY-MM
  const boothId = searchParams.get('booth');

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: 'Expected month as YYYY-MM' }, { status: 400 });
  }
  if (!boothId || !getBooth(boothId)) {
    return NextResponse.json({ error: 'Unknown booth' }, { status: 400 });
  }

  const [y, m] = month.split('-').map(Number);
  const from = `${month}-01`;
  // Day 0 of next month is the last day of this one.
  const to = `${month}-${String(new Date(y, m, 0).getDate()).padStart(2, '0')}`;

  const db = createAdminClient();

  const [{ data: events, error: eventsError }, { data: blocked, error: blockedError }] = await Promise.all([
    db
      .from('events')
      .select('event_date')
      .eq('booth_id', boothId)
      .in('status', ['awaiting_deposit', 'pending', 'confirmed'])
      .gte('event_date', from)
      .lte('event_date', to),
    db.from('blocked_dates').select('blocked_on, booth_id').gte('blocked_on', from).lte('blocked_on', to),
  ]);

  if (eventsError || blockedError) {
    console.error('Month availability lookup failed:', eventsError || blockedError);
    // Fail open: an empty list makes every date look free in the calendar,
    // but the per-date check on submit still catches anything this missed.
    return NextResponse.json({ unavailable: [] });
  }

  const unavailable = new Set<string>();
  for (const e of events ?? []) unavailable.add(e.event_date);
  for (const b of blocked ?? []) {
    if (b.booth_id === null || b.booth_id === boothId) unavailable.add(b.blocked_on);
  }

  return NextResponse.json({ unavailable: [...unavailable] });
}
