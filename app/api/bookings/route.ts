import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      fullName,
      phone,
      eventDate,
      eventTime,
      eventTitle,
      packageType,
      specialRequests,
    } = body;

    // Validate required fields
    if (!email || !password || !fullName || !phone || !eventDate || !eventTime || !eventTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // 1. Create user in auth
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    const userId = authData.user.id;

    // 2. Create user record in database
    const { error: userError } = await adminClient
      .from('users')
      .insert({
        id: userId,
        email,
        full_name: fullName,
        phone,
        role: 'client',
      });

    if (userError) {
      // Delete auth user if user record creation fails
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    // 3. Create event booking
    const { data: eventData, error: eventError } = await adminClient
      .from('events')
      .insert({
        user_id: userId,
        event_date: eventDate,
        event_time: eventTime,
        event_title: eventTitle,
        package_type: packageType,
        special_requests: specialRequests || null,
        status: 'pending',
      })
      .select()
      .single();

    if (eventError) {
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // 4. Send confirmation email
    await sendBookingConfirmationEmail(
      email,
      fullName,
      eventDate,
      eventTime,
      packageType
    );

    return NextResponse.json(
      {
        success: true,
        userId,
        eventId: eventData?.id,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
