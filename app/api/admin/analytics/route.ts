import { createClient } from '@/lib/supabase/server';
import { getBooqableBookings, getBooqableCustomers } from '@/lib/booqable';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    // Fetch data from Booqable
    const bookings = await getBooqableBookings();
    const customers = await getBooqableCustomers();

    // Calculate analytics
    const now = new Date();
    const upcomingEvents = bookings.filter(
      (b: any) => new Date(b.starts_at) > now
    ).length;

    const totalRevenue = bookings.reduce((sum: number, b: any) => {
      return sum + (b.total_price || 0);
    }, 0);

    return NextResponse.json(
      {
        totalBookings: bookings.length,
        totalCustomers: customers.length,
        upcomingEvents,
        revenue: totalRevenue,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
