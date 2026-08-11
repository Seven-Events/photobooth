import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Photobooth Packages & Pricing | Seven Events',
  description:
    'Bronze, Silver and Gold photobooth packages from $299. Setup, attendant, instant prints and unlimited sessions included.',
};

const packages = [
  {
    name: 'Bronze',
    price: '$299',
    duration: '2 hours',
    summary: 'Perfect for smaller parties and short receptions.',
    features: [
      'Instant prints',
      'Custom backdrop',
      'Digital gallery link',
      'Professional attendant',
      '5 prop packages',
      'Unlimited sessions',
    ],
    popular: false,
  },
  {
    name: 'Silver',
    price: '$499',
    duration: '4 hours',
    summary: 'Our most booked package — built for weddings.',
    features: [
      'Everything in Bronze',
      'GIF & boomerang creation',
      'Social media sharing',
      'Premium props package',
      'Custom photo templates',
      'Email gallery delivery',
    ],
    popular: true,
  },
  {
    name: 'Gold',
    price: '$799',
    duration: '8 hours',
    summary: 'Full-day coverage for corporate and large events.',
    features: [
      'Everything in Silver',
      'Extended full-day duration',
      'Premium backdrop options',
      'Video boomerang features',
      'Custom branded prints',
      'Priority scheduling',
    ],
    popular: false,
  },
];

const addons = [
  { title: 'Extended hours', price: '+$100 / hour', desc: 'For longer events or extra coverage.' },
  { title: 'Premium backdrop', price: '+$150', desc: 'Custom design tailored to your theme.' },
  { title: 'Luxury props bundle', price: '+$75', desc: 'Exclusive props curated for your event.' },
  { title: 'Premium print upgrade', price: '+$0.50 / print', desc: 'Heavier stock with a luxe finish.' },
];

export default function PackagesPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      {/* Header */}
      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '640px',
            height: '440px',
            background: 'radial-gradient(circle, rgba(229,139,130,0.25), rgba(229,139,130,0) 70%)',
          }}
        />
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Transparent pricing
          </span>
          <h1
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              margin: '1.75rem 0 1.25rem',
            }}
          >
            Photobooth packages
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Every package includes setup, breakdown, a friendly attendant, and unlimited sessions. No
            surprise fees.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '0 2rem 5rem' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              style={{
                backgroundColor: pkg.popular ? 'var(--ink)' : 'var(--paper)',
                color: pkg.popular ? 'var(--cream)' : 'var(--ink)',
                borderRadius: '1.75rem',
                padding: '2.75rem 2.25rem',
                border: pkg.popular ? '1px solid var(--ink)' : '1px solid var(--line)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {pkg.popular && (
                <span
                  className="pill"
                  style={{
                    backgroundColor: 'var(--clay)',
                    color: 'var(--ink)',
                    position: 'absolute',
                    top: '-14px',
                    left: '2.25rem',
                  }}
                >
                  Most popular
                </span>
              )}

              <h3
                style={{
                  fontSize: '1.75rem',
                  color: pkg.popular ? 'var(--cream)' : 'var(--ink)',
                  marginBottom: '0.5rem',
                }}
              >
                {pkg.name}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: pkg.popular ? 'rgba(250,247,239,0.75)' : 'rgba(37,70,65,0.7)',
                  marginBottom: '1.75rem',
                }}
              >
                {pkg.summary}
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '3.25rem',
                    color: 'var(--clay)',
                    lineHeight: 1,
                  }}
                >
                  {pkg.price}
                </span>
                <p
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: pkg.popular ? 'rgba(250,247,239,0.7)' : 'rgba(37,70,65,0.6)',
                  }}
                >
                  {pkg.duration}
                </p>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '2.25rem', flex: 1 }}>
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      marginBottom: '0.9rem',
                      paddingLeft: '1.75rem',
                      position: 'relative',
                      fontSize: '0.95rem',
                      color: pkg.popular ? 'rgba(250,247,239,0.9)' : 'rgba(37,70,65,0.85)',
                    }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: 'var(--clay)', fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/book"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '1rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  backgroundColor: pkg.popular ? 'var(--clay)' : 'var(--ink)',
                  color: pkg.popular ? 'var(--ink)' : 'var(--cream)',
                }}
              >
                Book {pkg.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--paper)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <h2
            style={{
              color: 'var(--ink)',
              textAlign: 'center',
              marginBottom: '3.5rem',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
          >
            Optional add-ons
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {addons.map((a) => (
              <div
                key={a.title}
                style={{
                  backgroundColor: 'var(--cream)',
                  padding: '2.25rem',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--line)',
                }}
              >
                <h4 style={{ color: 'var(--ink)' }}>{a.title}</h4>
                <p style={{ color: 'var(--clay)', fontWeight: 700, marginBottom: '0.75rem' }}>{a.price}</p>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
