import { createAdminClient } from '@/lib/supabase/admin';
import { getBooth } from '@/lib/packages';
import { NextResponse } from 'next/server';

/**
 * Is a booth free on a date?
 *
 * Public, so the booking form can warn before someone fills in the whole thing.
 * Deliberately returns only a boolean — it must not leak who booked, or what,
 * to anyone who can guess a date.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const boothId = searchParams.get('booth');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Expected date as YYYY-MM-DD' }, { status: 400 });
  }
  if (!boothId || !getBooth(boothId)) {
    return NextResponse.json({ error: 'Unknown booth' }, { status: 400 });
  }

  // Fail open on any problem — telling a real customer a free date is taken
  // costs a booking, and the booking API re-checks before anything is saved.
  // The whole thing is wrapped because creating the client throws outright
  // when the environment is misconfigured.
  try {
    const db = createAdminClient();
    const { data, error } = await db.rpc('is_booth_available', {
      check_date: date,
      check_booth: boothId,
    });

    if (error) {
      console.error('Availability check failed:', error);
      return NextResponse.json({ available: true, degraded: true });
    }

    return NextResponse.json({ available: Boolean(data) });
  } catch (err) {
    console.error('Availability check threw:', err);
    return NextResponse.json({ available: true, degraded: true });
  }
}
