import { Fragment } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import BoothImage from '@/components/site/BoothImage';

export const metadata: Metadata = {
  title: 'Photobooth Packages & Pricing | Seven Events',
  description:
    'Snap, Oak and Mod photobooth packages from $500. Drop-off, hourly and the Completely Captured wedding package, with free travel up to 100 km from Omemee.',
};

type Rate = { label: string; price: string; note: string; badge?: string };

type Booth = {
  name: string;
  slug: string;
  /** Matches the flat backdrop baked into the product shot so it blends in. */
  panelBg: string;
  tagline: string;
  /** Listed above the shared features, for anything unique to this booth. */
  extraFeatures?: string[];
  /** Fixed-price options. Empty means the booth is sold by the hour only. */
  rates: Rate[];
  /** Show the attendant-staffed hourly rates on this booth's card. */
  showHourly?: boolean;
};

/**
 * True of every booth — kept in one place so the lists cannot drift apart.
 * All three carry a DSLR body and studio lighting.
 */
const sharedFeatures = [
  'Choice of premium backdrop',
  'High-quality DSLR camera',
  'Professional studio lighting',
  'Photos, videos and boomerangs',
  'Video guestbook',
  'Personalized image template',
  'Live gallery',
  'Instant sharing via text & email',
  'Free travel up to 100 km from Omemee',
];

const hourly = [
  { duration: '2 hours', digital: '$600', prints: '$800' },
  { duration: '3 hours', digital: '$750', prints: '$950' },
  { duration: '4 hours', digital: '$900', prints: '$1100' },
];

const booths: Booth[] = [
  {
    name: 'Snap Booth',
    slug: 'snap-booth',
    panelBg: '#ede3db',
    tagline: 'Sleek, compact and fully self-serve.',
    rates: [
      {
        label: 'Digital Drop-off',
        price: '$500',
        note: 'Up to 14 hours unlimited use — no attendant, no prints',
      },
    ],
  },
  {
    name: 'Oak Booth',
    slug: 'oak-booth',
    panelBg: '#ede3db',
    tagline: 'Warm wood styling on a hardwood tripod.',
    rates: [
      {
        label: 'Print Drop-off',
        price: '$750',
        note: 'Up to 14 hours unlimited use — no attendant, max 300 prints',
      },
    ],
  },
  {
    name: 'Mod Booth',
    slug: 'mod-booth',
    panelBg: '#ede3db',
    tagline: 'Our full-service booth, staffed by an onsite attendant.',
    extraFeatures: ['Onsite attendant'],
    rates: [
      {
        label: 'Completely Captured',
        price: '$1,200',
        note: '+ tax · 1.5 hrs cocktail hour plus 3 hrs reception — split coverage so there is never a line',
        badge: 'Best for weddings',
      },
    ],
    showHourly: true,
  },
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
            Booths &amp; packages
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Three booths, drop-off or fully staffed. Every option includes a premium backdrop, a live
            gallery and free travel up to 100&nbsp;km from Omemee.
          </p>
        </div>
      </section>

      {/* Booths */}
      <section style={{ padding: '0 2rem 5rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gap: '2.5rem' }}>
          {booths.map((booth, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={booth.name}
                style={{
                  backgroundColor: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: '1.75rem',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                }}
              >
                {/* Image panel */}
                <div
                  style={{
                    backgroundColor: booth.panelBg,
                    minHeight: '340px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3rem',
                    order: reversed ? 2 : 1,
                  }}
                >
                  <BoothImage
                    src={`/booths/${booth.slug}.webp`}
                    alt={`${booth.name} photobooth`}
                    label={booth.name}
                  />
                </div>

                {/* Detail panel */}
                <div
                  style={{
                    padding: '3rem 2.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    order: reversed ? 1 : 2,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'var(--sage)',
                      color: 'var(--ink)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem 1.75rem',
                      marginBottom: '1.75rem',
                      textAlign: 'center',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        margin: 0,
                        color: 'var(--ink)',
                      }}
                    >
                      {booth.name}
                    </h2>
                  </div>

                  <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>{booth.tagline}</p>

                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
                    {[...(booth.extraFeatures ?? []), ...sharedFeatures].map((f) => (
                      <li
                        key={f}
                        style={{
                          marginBottom: '0.7rem',
                          paddingLeft: '1.6rem',
                          position: 'relative',
                          fontSize: '0.95rem',
                          color: 'rgba(37,70,65,0.85)',
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: 'var(--clay)', fontWeight: 700 }}>
                          •
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid var(--line)' }}>
                    {booth.rates.map((rate) => (
                      <div key={rate.label} style={{ marginBottom: '1.5rem' }}>
                        {rate.badge && (
                          <span
                            className="pill"
                            style={{
                              backgroundColor: 'var(--clay)',
                              color: 'var(--ink)',
                              marginBottom: '0.75rem',
                            }}
                          >
                            {rate.badge}
                          </span>
                        )}
                        <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--ink)', fontWeight: 600 }}>
                          {rate.label} —{' '}
                          <strong
                            style={{
                              fontFamily: "'Archivo Black', sans-serif",
                              fontSize: '1.6rem',
                              color: 'var(--clay)',
                            }}
                          >
                            {rate.price}
                          </strong>
                        </p>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'rgba(37,70,65,0.6)' }}>
                          {rate.note}
                        </p>
                      </div>
                    ))}

                    {booth.showHourly && (
                      <div style={{ marginBottom: '1.75rem' }}>
                        <p
                          style={{
                            margin: '0 0 0.85rem',
                            fontSize: '0.75rem',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'rgba(37,70,65,0.55)',
                            fontWeight: 700,
                          }}
                        >
                          Or by the hour
                        </p>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1.2fr 1fr 1fr',
                            gap: '0.4rem 0.75rem',
                            fontSize: '0.85rem',
                            alignItems: 'baseline',
                          }}
                        >
                          <span style={{ color: 'rgba(37,70,65,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Duration
                          </span>
                          <span style={{ color: 'rgba(37,70,65,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>
                            Digital
                          </span>
                          <span style={{ color: 'rgba(37,70,65,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>
                            With prints
                          </span>

                          {hourly.map((row) => (
                            <Fragment key={row.duration}>
                              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{row.duration}</span>
                              <span style={{ textAlign: 'right', color: 'var(--ink)' }}>{row.digital}</span>
                              <span style={{ textAlign: 'right', color: 'var(--clay)', fontWeight: 700 }}>
                                {row.prints}
                              </span>
                            </Fragment>
                          ))}
                        </div>

                        <p style={{ margin: '0.85rem 0 0', fontSize: '0.78rem', color: 'rgba(37,70,65,0.55)' }}>
                          All print packages include unlimited prints.
                        </p>
                      </div>
                    )}

                    <Link
                      href="/book"
                      style={{
                        display: 'inline-block',
                        padding: '0.9rem 2rem',
                        borderRadius: '999px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        backgroundColor: 'var(--ink)',
                        color: 'var(--cream)',
                      }}
                    >
                      Book the {booth.name} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: '0 2rem 6rem' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            backgroundColor: 'var(--ink)',
            borderRadius: '1.75rem',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Not sure which booth?
          </h2>
          <p style={{ color: 'rgba(250,247,239,0.75)', marginBottom: '2rem', maxWidth: '520px', marginInline: 'auto' }}>
            Send us your date and venue and we will tell you what fits — same-day answer, no pressure.
          </p>
          <Link
            href="/book"
            style={{
              display: 'inline-block',
              padding: '1.15rem 2.5rem',
              borderRadius: '999px',
              fontWeight: 700,
              textDecoration: 'none',
              backgroundColor: 'var(--clay)',
              color: 'var(--ink)',
            }}
          >
            Check Your Date →
          </Link>
        </div>
      </section>


      <SiteFooter />
    </main>
  );
}
