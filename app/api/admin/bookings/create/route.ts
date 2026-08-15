import { requireAdminApi, logActivity } from '@/lib/admin-api';
import { calculateTotals, getBooth, getRate, HST_PERCENT, DEPOSIT_PERCENT } from '@/lib/packages';
import { calculateTravelFee } from '@/lib/travel';
import { NextResponse } from 'next/server';

/**
 * Booking taken by the team — phone, DM, wedding fair.
 *
 * Differs from the public route in three ways: no password is set (the
 * customer can claim the account later via password reset), the price may be
 * overridden since phone deals do not always match the published rate, and
 * the travel fee may be typed in directly rather than looked up — useful when
 * the address lookup is not configured, or the team already knows the fee.
 */
export async function POST(request: Request) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const body = await request.json();
  const {
    fullName,
    email,
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
    overrideSubtotal, // dollars, optional — replaces rate + add-ons + travel entirely
    overrideTravelFee, // dollars, optional — replaces just the travel fee
    status = 'pending',
    depositStatus = 'unpaid',
  } = body;

  if (!fullName || !email || !eventDate || !eventTime || !eventTitle) {
    return NextResponse.json({ error: 'Name, email, date, time and event type are required.' }, { status: 400 });
  }

  if (!getBooth(boothId)) {
    return NextResponse.json({ error: 'Pick a booth.' }, { status: 400 });
  }

  const rate = getRate(rateId);
  if (!rate || !rate.boothIds.includes(boothId)) {
    return NextResponse.json({ error: 'That package is not available for this booth.' }, { status: 400 });
  }

  const safeAddonIds: string[] = Array.isArray(addonIds) ? addonIds.filter((a) => typeof a === 'string') : [];

  // Travel fee: an explicit override wins, otherwise look it up from the
  // address if one was given. Either way this is a known, reviewed figure —
  // only "nothing given at all" is left flagged for a human to check.
  let travelFeeCents = 0;
  let travelDistanceKm: number | null = null;
  let travelNeedsReview = true;

  if (overrideTravelFee !== undefined && overrideTravelFee !== null && overrideTravelFee !== '') {
    const cents = Math.round(Number(overrideTravelFee) * 100);
    if (!Number.isFinite(cents) || cents < 0) {
      return NextResponse.json({ error: 'Travel fee override must be a positive number.' }, { status: 400 });
    }
    travelFeeCents = cents;
    travelNeedsReview = false;
  } else if (venue && String(venue).trim()) {
    const travel = await calculateTravelFee(venue);
    travelFeeCents = travel.feeCents;
    travelDistanceKm = travel.distanceKm;
    travelNeedsReview = travel.needsReview;
  }

  const standard = calculateTotals(rateId, safeAddonIds, boothId, travelFeeCents);
  if (!standard) {
    return NextResponse.json({ error: 'Could not price that combination.' }, { status: 400 });
  }

  // Recompute from an overridden subtotal so tax and deposit stay consistent
  // with it, rather than being carried over from the published price.
  let totals = standard;
  let priceOverride = false;

  if (overrideSubtotal !== undefined && overrideSubtotal !== null && overrideSubtotal !== '') {
    const subtotalCents = Math.round(Number(overrideSubtotal) * 100);
    if (!Number.isFinite(subtotalCents) || subtotalCents < 0) {
      return NextResponse.json({ error: 'Override price must be a positive number.' }, { status: 400 });
    }
    const hstCents = Math.round(subtotalCents * (HST_PERCENT / 100));
    const totalCents = subtotalCents + hstCents;
    totals = {
      ...standard,
      subtotalCents,
      hstCents,
      totalCents,
      depositCents: Math.round(totalCents * (DEPOSIT_PERCENT / 100)),
    };
    priceOverride = subtotalCents !== standard.subtotalCents;
  }

  // Reuse the customer if we already know this email, so their booking history
  // stays on one record instead of fragmenting across duplicates.
  const normalisedEmail = String(email).trim().toLowerCase();
  const { data: existingProfile } = await gate.db
    .from('users')
    .select('id')
    .eq('email', normalisedEmail)
    .maybeSingle();

  let userId = existingProfile?.id as string | undefined;
  let createdCustomer = false;

  if (!userId) {
    const { data: created, error: authError } = await gate.db.auth.admin.createUser({
      email: normalisedEmail,
      email_confirm: true,
    });

    if (authError || !created.user) {
      return NextResponse.json(
        { error: authError?.message || 'Could not create the customer record.' },
        { status: 400 }
      );
    }

    userId = created.user.id;
    createdCustomer = true;

    const { error: profileError } = await gate.db.from('users').insert({
      id: userId,
      email: normalisedEmail,
      full_name: fullName,
      phone: phone || null,
      role: 'client',
    });

    if (profileError) {
      await gate.db.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: 'Could not save the customer.' }, { status: 500 });
    }
  }

  const { data: event, error: eventError } = await gate.db
    .from('events')
    .insert({
      user_id: userId,
      event_date: eventDate,
      event_time: eventTime,
      event_title: eventTitle,
      booth_id: boothId,
      rate_id: rateId,
      addon_ids: safeAddonIds,
      venue: venue || null,
      guest_count: guestCount ? Number(guestCount) : null,
      subtotal_cents: totals.subtotalCents,
      hst_cents: totals.hstCents,
      total_cents: totals.totalCents,
      deposit_cents: totals.depositCents,
      deposit_status: depositStatus,
      travel_fee_cents: travelFeeCents,
      travel_distance_km: travelDistanceKm,
      travel_fee_needs_review: travelNeedsReview,
      special_requests: specialRequests || null,
      status,
      source: 'manual',
      price_override: priceOverride,
      updated_by: gate.actor.id,
    })
    .select()
    .single();

  if (eventError || !event) {
    console.error('Could not create manual booking:', eventError);
    // Admin-only screen, so the real Postgres error is safe to show directly
    // rather than sending you to check server logs for it.
    return NextResponse.json(
      { error: 'Could not save the booking.', detail: eventError?.message },
      { status: 500 }
    );
  }

  await logActivity(gate.db, {
    eventId: event.id,
    actorId: gate.actor.id,
    action: 'created this booking manually',
    detail: [
      createdCustomer ? 'new customer' : 'existing customer',
      priceOverride ? 'price overridden' : null,
      travelNeedsReview ? 'travel fee needs review' : null,
    ]
      .filter(Boolean)
      .join(', '),
  });

  return NextResponse.json({ booking: event }, { status: 201 });
}
