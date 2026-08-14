import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { confirmDeposit } from '@/lib/confirm-deposit';
import { isStripeConfigured, stripe } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Booking confirmed | Seven Events',
  robots: { index: false },
};

// Never cached: this page does real work on arrival.
export const dynamic = 'force-dynamic';

/**
 * Where Stripe returns the customer after checkout.
 *
 * The session id in the URL is not taken on trust — we ask Stripe directly
 * whether that session was actually paid. Someone typing this URL by hand gets
 * nothing, because Stripe will not report an unpaid session as paid.
 *
 * This is the backstop for the webhook. If the webhook is configured it will
 * usually have confirmed the booking already, and confirmDeposit() no-ops.
 */
export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let paid = false;

  if (sessionId && isStripeConfigured()) {
    try {
      const session = await stripe().checkout.sessions.retrieve(sessionId);
      const eventId = session.metadata?.eventId;

      if (session.payment_status === 'paid' && eventId) {
        paid = true;
        await confirmDeposit(eventId);
      }
    } catch (err) {
      // A bad or expired session id should not break the page — the customer
      // has paid either way, and the webhook is the other line of defence.
      console.error('Could not verify checkout session:', err);
    }
  }

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            {paid ? 'Deposit received' : 'Booking received'}
          </span>

          <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: '1.75rem 0 1.25rem' }}>
            {paid ? 'Your date is held' : 'Thanks — we have got it'}
          </h1>

          {paid ? (
            <>
              <p style={{ fontSize: '1.1rem' }}>
                Your deposit came through and your date is locked in. A receipt is on its way to your
                inbox, and we will follow up within 24 hours to confirm the details.
              </p>
              <p style={{ fontSize: '1.05rem' }}>
                Next we will send a short questionnaire so we can build your custom print template.
              </p>
            </>
          ) : (
            <p style={{ fontSize: '1.1rem' }}>
              We have your booking and will be in touch within 24 hours to confirm everything. If you
              have just paid, the receipt will arrive shortly.
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link
              href="/login"
              style={{
                backgroundColor: 'var(--ink)',
                color: 'var(--cream)',
                padding: '1.15rem 2.5rem',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Sign in to your booking
            </Link>
            <Link
              href="/gallery"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--ink)',
                padding: '1.15rem 2.5rem',
                borderRadius: '999px',
                fontWeight: 700,
                border: '2px solid var(--ink)',
                textDecoration: 'none',
              }}
            >
              Browse the gallery
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
