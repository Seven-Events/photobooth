import { createAdminClient } from '@/lib/supabase/admin';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { isStripeConfigured, stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

/**
 * Stripe tells us a deposit succeeded here — not the browser redirect, which a
 * customer can close, refresh or fake. This is the only place a booking is
 * marked paid.
 *
 * Set the signing secret as STRIPE_WEBHOOK_SECRET and point the Stripe
 * dashboard at /api/stripe/webhook for the checkout.session.completed event.
 */
export async function POST(request: Request) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  // The raw body is required for signature verification — parsing it first
  // would change the bytes and every event would be rejected.
  const rawBody = await request.text();

  let event;
  try {
    event = stripe().webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    // Acknowledge everything else so Stripe stops retrying.
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as {
    id: string;
    payment_status?: string;
    metadata?: { eventId?: string } | null;
  };

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true });
  }

  const eventId = session.metadata?.eventId;
  if (!eventId) {
    console.error('checkout.session.completed with no eventId in metadata:', session.id);
    return NextResponse.json({ received: true });
  }

  const admin = createAdminClient();

  const { data: booking, error } = await admin
    .from('events')
    .update({ deposit_status: 'paid', status: 'pending' })
    .eq('id', eventId)
    // Only move it forward once, so a replayed event does not resend the email.
    .eq('deposit_status', 'unpaid')
    .select('*, users(email, full_name)')
    .maybeSingle();

  if (error) {
    console.error('Failed to mark deposit paid:', error);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }

  if (booking) {
    const customer = booking.users as { email?: string; full_name?: string } | null;
    if (customer?.email) {
      await sendBookingConfirmationEmail({
        email: customer.email,
        name: customer.full_name || 'there',
        eventDate: booking.event_date,
        eventTime: booking.event_time,
        packageLabel: booking.rate_id,
        depositCents: booking.deposit_cents,
        balanceCents: booking.total_cents - booking.deposit_cents,
      });
    }
  }

  return NextResponse.json({ received: true });
}
