import { createAdminClient } from '@/lib/supabase/admin';
import { sendBookingReceivedEmail } from '@/lib/email';
import { calculateTotals, getBooth, getRate } from '@/lib/packages';
import { calculateTravelFee } from '@/lib/travel';
import { createDepositCheckoutSession, isStripeConfigured } from '@/lib/stripe';
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
      boothId,
      rateId,
      addonIds = [],
      venue,
      guestCount,
      specialRequests,
    } = body;

    if (!email || !password || !fullName || !phone || !eventDate || !eventTime || !eventTitle) {
      return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    // Reject dates in the past — the browser's min attribute is trivially bypassed.
    if (new Date(eventDate) < new Date(new Date().toDateString())) {
      return NextResponse.json({ error: 'That event date is in the past.' }, { status: 400 });
    }

    if (!venue || typeof venue !== 'string' || !venue.trim()) {
      return NextResponse.json({ error: 'Please enter the full event address.' }, { status: 400 });
    }

    if (!getBooth(boothId)) {
      return NextResponse.json({ error: 'Unknown booth.' }, { status: 400 });
    }

    const rate = getRate(rateId);
    if (!rate || !rate.boothIds.includes(boothId)) {
      return NextResponse.json({ error: 'That package is not available for this booth.' }, { status: 400 });
    }

    // Prices are recalculated here from ids. Anything the browser sent about
    // money is ignored — otherwise a customer could set their own deposit.
    const safeAddonIds: string[] = Array.isArray(addonIds) ? addonIds.filter((a) => typeof a === 'string') : [];

    // Free within 100km of the shop; $2/km beyond that. Never blocks the
    // booking if the distance cannot be resolved — it charges no fee and
    // flags the row for a human to check instead.
    const travel = await calculateTravelFee(venue);

    const totals = calculateTotals(rateId, safeAddonIds, boothId, travel.feeCents);
    if (!totals) {
      return NextResponse.json({ error: 'We could not price that combination.' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    // Availability is checked here, not just in the browser — two people can
    // reach checkout for the same Saturday within seconds of each other.
    const { data: available, error: availabilityError } = await adminClient.rpc('is_booth_available', {
      check_date: eventDate,
      check_booth: boothId,
    });

    if (!availabilityError && available === false) {
      return NextResponse.json(
        { error: 'Sorry — that booth is already taken on that date. Please pick another date.' },
        { status: 409 }
      );
    }

    // 1. Auth user
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      const alreadyExists = /already/i.test(authError.message);
      return NextResponse.json(
        {
          error: alreadyExists
            ? 'An account already exists for that email. Please log in first, then book.'
            : authError.message,
        },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Could not create your account.' }, { status: 500 });
    }

    const userId = authData.user.id;

    // 2. Profile row
    const { error: userError } = await adminClient.from('users').insert({
      id: userId,
      email,
      full_name: fullName,
      phone,
      role: 'client',
    });

    if (userError) {
      // Roll the auth user back so a retry is not blocked by a half-created account.
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: 'Could not save your details.' }, { status: 500 });
    }

    // 3. The booking itself
    const { data: eventData, error: eventError } = await adminClient
      .from('events')
      .insert({
        user_id: userId,
        event_date: eventDate,
        event_time: eventTime,
        event_title: eventTitle,
        booth_id: boothId,
        rate_id: rateId,
        addon_ids: safeAddonIds,
        venue,
        guest_count: guestCount ?? null,
        subtotal_cents: totals.subtotalCents,
        hst_cents: totals.hstCents,
        total_cents: totals.totalCents,
        deposit_cents: totals.depositCents,
        deposit_status: 'unpaid',
        travel_fee_cents: travel.feeCents,
        travel_distance_km: travel.distanceKm,
        travel_fee_needs_review: travel.needsReview,
        special_requests: specialRequests || null,
        status: isStripeConfigured() ? 'awaiting_deposit' : 'pending',
      })
      .select()
      .single();

    if (eventError || !eventData) {
      console.error('Could not save booking:', eventError);
      await adminClient.auth.admin.deleteUser(userId);
      // Not yet live to real customers, so surface the real reason rather than
      // a dead end — remove `detail` once this is confirmed working.
      return NextResponse.json(
        { error: 'Could not save your booking.', detail: eventError?.message },
        { status: 500 }
      );
    }

    // 4. Payment, if Stripe is set up
    if (isStripeConfigured()) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

      try {
        const session = await createDepositCheckoutSession({
          eventId: eventData.id,
          email,
          depositCents: totals.depositCents,
          totalCents: totals.totalCents,
          description: `${rate.label} — ${eventTitle} on ${eventDate}`,
          siteUrl,
        });

        await adminClient
          .from('events')
          .update({ stripe_session_id: session.id })
          .eq('id', eventData.id);

        return NextResponse.json({ success: true, eventId: eventData.id, checkoutUrl: session.url }, { status: 201 });
      } catch (stripeError) {
        // The booking is already saved, so treat this as a request rather than
        // losing it. The owner can take the deposit manually.
        console.error('Stripe checkout failed, falling back to request:', stripeError);
        await adminClient.from('events').update({ status: 'pending' }).eq('id', eventData.id);
      }
    }

    // 5. No payment step — confirm receipt by email
    await sendBookingReceivedEmail({
      email,
      name: fullName,
      eventDate,
      eventTime,
      packageLabel: rate.label,
      totalCents: totals.totalCents,
    });

    return NextResponse.json({ success: true, eventId: eventData.id }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Something went wrong on our end. Please try again.' }, { status: 500 });
  }
}
