import { confirmDeposit } from '@/lib/confirm-deposit';
import { isStripeConfigured, stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

/**
 * Stripe's own notification that a deposit succeeded.
 *
 * More reliable than the customer's return trip — it fires even if they close
 * the tab — but optional: the success page verifies the session too, and
 * confirmDeposit() is idempotent, so whichever arrives first wins and the
 * other does nothing.
 *
 * To enable: set STRIPE_WEBHOOK_SECRET and point Stripe at /api/stripe/webhook
 * for the checkout.session.completed event.
 */
export async function POST(request: Request) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 503 });
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

  const result = await confirmDeposit(eventId);

  if (result === 'failed') {
    // A non-2xx makes Stripe retry, which is what we want for a transient
    // database problem.
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true, result });
}
