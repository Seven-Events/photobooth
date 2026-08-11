import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact | Seven Events Photobooth',
  description:
    'Get in touch about photobooth rental in Kawartha Lakes, Prince Edward County, Belleville and Durham Region.',
};

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Say hello
          </span>
          <h1
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              margin: '1.75rem 0 1.25rem',
            }}
          >
            Get in touch
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Tell us the date, the venue, and the vibe. We will come back with availability and a quote.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 2rem 5rem' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--paper)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              border: '1px solid var(--line)',
            }}
          >
            <h4 style={{ color: 'var(--ink)' }}>Email us</h4>
            <a
              href="mailto:info@seveneventsphotobooth.com"
              style={{ color: 'var(--clay)', fontWeight: 600, wordBreak: 'break-word' }}
            >
              info@seveneventsphotobooth.com
            </a>
            <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', marginBottom: 0 }}>
              We typically reply within 24 hours, seven days a week.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--paper)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              border: '1px solid var(--line)',
            }}
          >
            <h4 style={{ color: 'var(--ink)' }}>Service areas</h4>
            <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
              Kawartha Lakes, Prince Edward County, Belleville and Durham Region — plus surrounding
              Southern Ontario by request.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--ink)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              color: 'var(--cream)',
            }}
          >
            <h4 style={{ color: 'var(--cream)' }}>Ready to book?</h4>
            <p style={{ color: 'rgba(250,247,239,0.75)', fontSize: '0.95rem' }}>
              Skip the back and forth — check your date and reserve online.
            </p>
            <Link
              href="/book"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                backgroundColor: 'var(--clay)',
                color: 'var(--ink)',
                padding: '0.9rem 2rem',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Book Now →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
