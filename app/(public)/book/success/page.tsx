import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Booking confirmed | Seven Events',
  robots: { index: false },
};

export default function BookingSuccessPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Deposit received
          </span>

          <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: '1.75rem 0 1.25rem' }}>
            Your date is held
          </h1>

          <p style={{ fontSize: '1.1rem' }}>
            Thank you — your deposit came through and we have your booking. A receipt is on its way
            to your inbox, and we will follow up within 24 hours to confirm the details.
          </p>

          <p style={{ fontSize: '1.05rem' }}>
            Next we will send a short questionnaire so we can build your custom print template.
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
