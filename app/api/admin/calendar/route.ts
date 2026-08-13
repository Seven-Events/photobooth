import { requireAdminApi } from '@/lib/admin-api';
import { NextResponse } from 'next/server';

/** Bookings and blocked dates for one month. */
export async function GET(request: Request) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month'); // YYYY-MM

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: 'Expected month as YYYY-MM' }, { status: 400 });
  }

  const [y, m] = month.split('-').map(Number);
  const from = `${month}-01`;
  // Day 0 of the next month is the last day of this one.
  const to = `${month}-${String(new Date(y, m, 0).getDate()).padStart(2, '0')}`;

  const [{ data: bookings, error: bErr }, { data: blocked, error: blErr }] = await Promise.all([
    gate.db
      .from('events')
      .select('id, event_date, event_time, event_title, booth_id, status, users(full_name)')
      .gte('event_date', from)
      .lte('event_date', to)
      .neq('status', 'cancelled')
      .order('event_date'),
    gate.db.from('blocked_dates').select('*').gte('blocked_on', from).lte('blocked_on', to),
  ]);

  if (bErr || blErr) {
    console.error('Calendar load failed:', bErr || blErr);
    return NextResponse.json({ error: 'Could not load the calendar' }, { status: 500 });
  }

  return NextResponse.json({ bookings: bookings ?? [], blocked: blocked ?? [] });
}

/** Block a date, for all booths or just one. */
export async function POST(request: Request) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { date, boothId, reason } = await request.json();

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Pick a date.' }, { status: 400 });
  }

  const { error } = await gate.db.from('blocked_dates').insert({
    blocked_on: date,
    booth_id: boothId || null,
    reason: reason || null,
    created_by: gate.actor.id,
  });

  if (error) {
    // 23505 is a unique violation — that date is already blocked.
    if (error.code === '23505') {
      return NextResponse.json({ error: 'That date is already blocked.' }, { status: 409 });
    }
    console.error('Could not block date:', error);
    return NextResponse.json({ error: 'Could not block that date' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Unblock. */
export async function DELETE(request: Request) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await gate.db.from('blocked_dates').delete().eq('id', id);

  if (error) {
    console.error('Could not unblock date:', error);
    return NextResponse.json({ error: 'Could not unblock that date' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
