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

type Booth = {
  name: string;
  slug: string;
  /** Matches the flat backdrop baked into the product shot so it blends in. */
  panelBg: string;
  tagline: string;
  features: string[];
  pricing: {
    label: string;
    price: string;
    note: string;
  } | null;
  /** Optional pointer to the hourly table for booths sold by the hour too. */
  alsoHourly?: boolean;
};

const booths: Booth[] = [
  {
    name: 'Snap Booth',
    slug: 'snap-booth',
    panelBg: '#ede3db',
    tagline: 'Sleek, compact and fully self-serve.',
    features: [
      'Choice of premium backdrop',
      'Photos, videos and boomerangs',
      'Video guestbook',
      'Personalized image template',
      'Live gallery',
      'Instant sharing via text & email',
      'Free travel up to 100 km from Omemee',
    ],
    pricing: {
      label: 'Digital Drop-off',
      price: '$500',
      note: 'Up to 14 hours unlimited use — no attendant, no prints',
    },
  },
  {
    name: 'Oak Booth',
    slug: 'oak-booth',
    panelBg: '#ede3db',
    tagline: 'Warm wood styling with studio-quality DSLR photos.',
    features: [
      'Choice of premium backdrop',
      'Studio quality DSLR photos',
      'Photos, videos and boomerangs',
      'Video guestbook',
      'Personalized image template',
      'Live gallery',
      'Instant sharing via text & email',
      'Free travel up to 100 km from Omemee',
    ],
    pricing: {
      label: 'Print Drop-off',
      price: '$750',
      note: 'Up to 14 hours unlimited use — no attendant, max 300 prints',
    },
  },
  {
    name: 'Mod Booth',
    slug: 'mod-booth',
    panelBg: '#ede3db',
    tagline: 'Our full-service booth with an onsite attendant.',
    features: [
      'Choice of premium backdrop',
      'Studio quality DSLR photos',
      'Onsite attendant',
      'Photos, videos and boomerangs',
      'Video guestbook',
      'Personalized image template',
      'Live gallery',
      'Instant sharing via text & email',
      'Free travel up to 100 km from Omemee',
    ],
    pricing: {
      label: 'Completely Captured',
      price: '$1,200',
      note: '+ tax · 1.5 hrs of cocktail hour plus 3 hrs of reception — split coverage so there is never a line',
    },
    alsoHourly: true,
  },
];

const hourly = [
  { duration: '2 hours', digital: '$600', prints: '$800' },
  { duration: '3 hours', digital: '$750', prints: '$950' },
  { duration: '4 hours', digital: '$900', prints: '$1100' },
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
                    {booth.features.map((f) => (
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

                  {booth.pricing ? (
                    <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid var(--line)' }}>
                      <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--ink)', fontWeight: 600 }}>
                        {booth.pricing.label} —{' '}
                        <strong
                          style={{
                            fontFamily: "'Archivo Black', sans-serif",
                            fontSize: '1.6rem',
                            color: 'var(--clay)',
                          }}
                        >
                          {booth.pricing.price}
                        </strong>
                      </p>
                      <p
                        style={{
                          margin: '0.5rem 0 1.5rem',
                          fontSize: '0.85rem',
                          color: 'rgba(37,70,65,0.6)',
                        }}
                      >
                        {booth.pricing.note}
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
                        {booth.alsoHourly && (
                          <a href="#hourly" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                            or book it by the hour ↓
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid var(--line)' }}>
                      <p style={{ margin: '0 0 1.5rem', fontSize: '0.95rem', color: 'rgba(37,70,65,0.7)' }}>
                        Available with our attendant-staffed hourly packages below.
                      </p>
                      <a
                        href="#hourly"
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
                        See hourly pricing ↓
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Hourly packages */}
      <section id="hourly" style={{ padding: '5rem 2rem', backgroundColor: 'var(--paper)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="pill" style={{ backgroundColor: 'var(--blush)', color: 'var(--ink)' }}>
              Staffed by an attendant
            </span>
            <h2 style={{ color: 'var(--ink)', marginTop: '1.5rem', fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              Hourly packages
            </h2>
            <p style={{ fontSize: '1.05rem' }}>
              Our attendant handles setup, guests and breakdown so you never think about it.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--line)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr',
                padding: '1.25rem 2rem',
                backgroundColor: 'var(--ink)',
                color: 'var(--cream)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              <span>Duration</span>
              <span style={{ textAlign: 'right' }}>Digital only</span>
              <span style={{ textAlign: 'right' }}>With prints</span>
            </div>

            {hourly.map((row, i) => (
              <div
                key={row.duration}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr',
                  padding: '1.4rem 2rem',
                  alignItems: 'center',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{row.duration}</span>
                <span
                  style={{
                    textAlign: 'right',
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '1.35rem',
                    color: 'var(--ink)',
                  }}
                >
                  {row.digital}
                </span>
                <span
                  style={{
                    textAlign: 'right',
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '1.35rem',
                    color: 'var(--clay)',
                  }}
                >
                  {row.prints}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '0.85rem',
              color: 'rgba(37,70,65,0.6)',
              textAlign: 'center',
            }}
          >
            *All print packages include unlimited prints.
          </p>

          {/* Split-coverage option — the one most weddings actually want. */}
          <div
            style={{
              marginTop: '2.5rem',
              backgroundColor: 'var(--ink)',
              color: 'var(--cream)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="pill" style={{ backgroundColor: 'var(--clay)', color: 'var(--ink)' }}>
                Best for weddings
              </span>
              <h3 style={{ color: 'var(--cream)', margin: '1.25rem 0 0.75rem', fontSize: '1.75rem' }}>
                Completely Captured
              </h3>
              <p style={{ color: 'rgba(250,247,239,0.8)', margin: 0, fontSize: '0.95rem' }}>
                1.5 hrs of cocktail hour plus 3 hrs of reception with the Mod Booth. Splitting the
                coverage across the night is why our couples say there was never a line.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '3rem',
                  color: 'var(--clay)',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                $1,200
              </span>
              <p
                style={{
                  color: 'rgba(250,247,239,0.7)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  margin: '0.5rem 0 1.5rem',
                }}
              >
                + tax · 4.5 hrs total
              </p>
              <Link
                href="/book"
                style={{
                  display: 'inline-block',
                  padding: '0.9rem 2rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  backgroundColor: 'var(--clay)',
                  color: 'var(--ink)',
                }}
              >
                Book Completely Captured →
              </Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
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
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
