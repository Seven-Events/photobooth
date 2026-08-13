import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * The signed-in customer's own bookings.
 *
 * Reads our events table, not Booqable. Bookings made through the website save
 * here, so pointing this at Booqable meant a customer could never see the
 * booking they had just paid a deposit on.
 *
 * Row level security scopes this to the caller — the "clients read own events"
 * policy means the query cannot return anyone else's rows even if the filter
 * were wrong.
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

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id)
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching user bookings:', error);
      return NextResponse.json({ error: 'Could not load your bookings' }, { status: 500 });
    }

    return NextResponse.json({ bookings: data ?? [], email: user.email }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
