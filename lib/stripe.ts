import Stripe from 'stripe';

/**
 * Stripe is optional at runtime.
 *
 * Until the owner adds the keys, the booking form still works — it saves the
 * booking as a request and skips checkout — rather than throwing a 500 at a
 * customer mid-booking. `isStripeConfigured()` is what decides which path the
 * booking API takes.
 */

let client: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return client;
}

/**
 * Hosted Stripe Checkout. Card details are entered on Stripe's own page and
 * never touch this site, which keeps us out of PCI scope entirely.
 */
export async function createDepositCheckoutSession(opts: {
  eventId: string;
  email: string;
  depositCents: number;
  totalCents: number;
  description: string;
  siteUrl: string;
}) {
  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    customer_email: opts.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'cad',
          unit_amount: opts.depositCents,
          product_data: {
            name: 'Photobooth deposit',
            description: opts.description,
          },
        },
      },
    ],
    // The webhook uses this to find the booking again. Never trust anything
    // else coming back from the browser.
    metadata: {
      eventId: opts.eventId,
      totalCents: String(opts.totalCents),
    },
    success_url: `${opts.siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${opts.siteUrl}/book/cancelled?event=${opts.eventId}`,
  });

  return session;
}
