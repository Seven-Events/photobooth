import { createClient } from '@/lib/supabase/server';
import { getBooqableBookingByEmail } from '@/lib/booqable';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch bookings from Booqable for this email
    const bookings = await getBooqableBookingByEmail(user.email);

    return NextResponse.json(
      {
        bookings,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
