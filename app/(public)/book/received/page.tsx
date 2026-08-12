import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Booking request received | Seven Events',
  robots: { index: false },
};

/**
 * Shown when the booking saved but no deposit was taken — either Stripe is not
 * configured yet, or the checkout session could not be created. The booking is
 * safely stored either way.
 */
export default function BookingReceivedPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Request received
          </span>

          <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: '1.75rem 0 1.25rem' }}>
            Thanks — we have got it
          </h1>

          <p style={{ fontSize: '1.1rem' }}>
            Your booking request is in and nothing has been charged. We will check the date and get
            back to you by email within 24 hours to confirm and arrange the deposit.
          </p>

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
              href="/"
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
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
