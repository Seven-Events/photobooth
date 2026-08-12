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
  // Verify the caller is a signed-in admin before touching the service-role
  // client, which bypasses row level security.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
  }

  const admin = createAdminClient();
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
