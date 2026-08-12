import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Deposit not completed | Seven Events',
  robots: { index: false },
};

/** Where Stripe sends someone who backed out of checkout. */
export default function BookingCancelledPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--blush)', color: 'var(--ink)' }}>
            Nothing charged
          </span>

          <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: '1.75rem 0 1.25rem' }}>
            Deposit not completed
          </h1>

          <p style={{ fontSize: '1.1rem' }}>
            No payment was taken and your date is not held yet — but we did save your details, so
            nothing is lost. Get in touch and we will pick up where you left off, or start again
            whenever you are ready.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link
              href="/book"
              style={{
                backgroundColor: 'var(--clay)',
                color: 'var(--ink)',
                padding: '1.15rem 2.5rem',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Try again
            </Link>
            <Link
              href="/contact"
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
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
