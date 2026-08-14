import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

/**
 * Admin headline numbers, computed from our events table.
 *
 * Previously read from Booqable, which meant every figure showed zero once
 * bookings started saving to our own database.
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    // Role read through the service role rather than the session client — see
    // lib/admin-api.ts for why relying on RLS here silently misfires.
    const admin = createAdminClient();
    const { data: profile } = await admin.from('users').select('role').eq('id', user.id).maybeSingle();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
    }

    const { data: events, error } = await admin
      .from('events')
      .select('event_date, status, total_cents, deposit_cents, deposit_status, user_id');

    if (error) {
      console.error('Error fetching analytics:', error);
      return NextResponse.json({ error: 'Could not load analytics' }, { status: 500 });
    }

    const rows = events ?? [];
    const today = new Date(new Date().toDateString());
    const live = rows.filter((e) => e.status !== 'cancelled');

    // Revenue counts money actually taken, not money hoped for: deposits that
    // cleared, plus the full amount on bookings marked completed.
    const depositsCollectedCents = live
      .filter((e) => e.deposit_status === 'paid')
      .reduce((sum, e) => sum + (e.deposit_cents ?? 0), 0);

    const completedCents = live
      .filter((e) => e.status === 'completed')
      .reduce((sum, e) => sum + (e.total_cents ?? 0), 0);

    const bookedValueCents = live.reduce((sum, e) => sum + (e.total_cents ?? 0), 0);

    return NextResponse.json(
      {
        totalBookings: live.length,
        totalCustomers: new Set(live.map((e) => e.user_id)).size,
        upcomingEvents: live.filter((e) => new Date(e.event_date + 'T00:00:00') >= today).length,
        awaitingDeposit: rows.filter((e) => e.status === 'awaiting_deposit').length,
        pendingConfirmation: rows.filter((e) => e.status === 'pending').length,
        depositsCollectedCents,
        completedCents,
        bookedValueCents,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
