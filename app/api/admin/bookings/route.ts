import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

/**
 * Bookings list for the admin panel, read from our own events table.
 *
 * This used to point at Booqable, which meant a booking made through the
 * website could never appear here.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  // Role read through the service role rather than the session client — see
  // lib/admin-api.ts for why relying on RLS here silently misfires.
  const admin = createAdminClient();
  const { data: profile } = await admin.from('users').select('role').eq('id', user.id).maybeSingle();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
  }

  const { data, error } = await admin
    .from('events')
    .select('*, users(full_name, email, phone)')
    .order('event_date', { ascending: false })
    .limit(200);

  if (error) {
    console.error('Failed to load bookings:', error);
    return NextResponse.json({ error: 'Could not load bookings' }, { status: 500 });
  }

  return NextResponse.json({ bookings: data ?? [] });
}
