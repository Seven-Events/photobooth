import { requireAdminApi, logActivity } from '@/lib/admin-api';
import { NextResponse } from 'next/server';

const ALLOWED_STATUSES = ['awaiting_deposit', 'pending', 'confirmed', 'completed', 'cancelled'];
const ALLOWED_DEPOSIT = ['unpaid', 'paid', 'refunded'];

/** One booking, with its notes and activity trail. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { id } = await params;

  const { data: booking, error } = await gate.db
    .from('events')
    .select('*, users(id, full_name, email, phone)')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Could not load booking:', error);
    return NextResponse.json({ error: 'Could not load booking' }, { status: 500 });
  }
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const [{ data: notes }, { data: activity }] = await Promise.all([
    gate.db
      .from('booking_notes')
      .select('id, body, created_at, author_id, users:author_id(full_name, email)')
      .eq('event_id', id)
      .order('created_at', { ascending: false }),
    gate.db
      .from('event_activity')
      .select('id, action, detail, created_at, actor_id, users:actor_id(full_name, email)')
      .eq('event_id', id)
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  return NextResponse.json({ booking, notes: notes ?? [], activity: activity ?? [] });
}

/** Update status, deposit status, or the editable event details. */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { id } = await params;
  const body = await request.json();

  const { data: existing } = await gate.db.from('events').select('*').eq('id', id).maybeSingle();
  if (!existing) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const patch: Record<string, unknown> = { updated_by: gate.actor.id };
  const changes: string[] = [];

  if (body.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Unknown status' }, { status: 400 });
    }
    if (body.status !== existing.status) {
      patch.status = body.status;
      changes.push(`status ${existing.status} → ${body.status}`);
    }
  }

  if (body.depositStatus !== undefined) {
    if (!ALLOWED_DEPOSIT.includes(body.depositStatus)) {
      return NextResponse.json({ error: 'Unknown deposit status' }, { status: 400 });
    }
    if (body.depositStatus !== existing.deposit_status) {
      patch.deposit_status = body.depositStatus;
      changes.push(`deposit ${existing.deposit_status} → ${body.depositStatus}`);
    }
  }

  // Details the team may correct after the fact.
  for (const [field, column] of [
    ['eventDate', 'event_date'],
    ['eventTime', 'event_time'],
    ['eventTitle', 'event_title'],
    ['venue', 'venue'],
    ['specialRequests', 'special_requests'],
  ] as const) {
    if (body[field] !== undefined && body[field] !== existing[column]) {
      patch[column] = body[field] || null;
      changes.push(`${column} updated`);
    }
  }

  if (body.guestCount !== undefined) {
    const n = body.guestCount === null || body.guestCount === '' ? null : Number(body.guestCount);
    if (n !== null && (!Number.isFinite(n) || n < 0)) {
      return NextResponse.json({ error: 'Guest count must be a positive number' }, { status: 400 });
    }
    if (n !== existing.guest_count) {
      patch.guest_count = n;
      changes.push('guest count updated');
    }
  }

  if (changes.length === 0) {
    return NextResponse.json({ booking: existing, unchanged: true });
  }

  const { data: updated, error } = await gate.db
    .from('events')
    .update(patch)
    .eq('id', id)
    .select('*, users(id, full_name, email, phone)')
    .single();

  if (error) {
    console.error('Could not update booking:', error);
    return NextResponse.json({ error: 'Could not save your changes' }, { status: 500 });
  }

  await logActivity(gate.db, {
    eventId: id,
    actorId: gate.actor.id,
    action: 'updated',
    detail: changes.join(', '),
  });

  return NextResponse.json({ booking: updated });
}
