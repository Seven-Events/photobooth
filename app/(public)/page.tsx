import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

const stats = [
  { value: '500+', label: 'Events captured' },
  { value: '2,000+', label: 'Happy guests' },
  { value: '10+', label: 'Years experience' },
  { value: '4.9★', label: 'Average rating' },
];

const booths = [
  {
    name: 'Snap Booth',
    blurb: 'Sleek, compact and fully self-serve. Digital drop-off from $500.',
    img: '/booths/snap-booth.webp',
    panelBg: '#ede3db',
  },
  {
    name: 'Oak Booth',
    blurb: 'Warm wood styling with studio-quality DSLR photos and prints.',
    img: '/booths/oak-booth.webp',
    panelBg: '#ede3db',
  },
  {
    name: 'Mod Booth',
    blurb: 'Our full-service booth, staffed by an onsite attendant.',
    img: '/booths/mod-booth.webp',
    panelBg: '#e1dfde',
  },
];

/** A few gallery shots surfaced on the home page as a teaser strip. */
const featured = [
  { src: '/gallery/guest-at-booth.webp', alt: 'A guest laughing at the Seven Events booth' },
  { src: '/gallery/floral-wall-guests.webp', alt: 'Two guests in front of a floral wall backdrop' },
  { src: '/gallery/string-lights-guests.webp', alt: 'Guests against a wood and festoon-light backdrop' },
  { src: '/gallery/gala-guests-group.webp', alt: 'A family posing together at a charity gala' },
];

const steps = [
  { n: '01', title: 'Check your date', copy: 'Send us the date and venue. We confirm availability same day.' },
  { n: '02', title: 'Design your look', copy: 'Pick a backdrop and customise your print template in Canva.' },
  { n: '03', title: 'We handle the rest', copy: 'Setup, attendant, prints, and a full digital gallery afterwards.' },
];

const testimonials = [
  {
    name: 'Sarah & John',
    event: 'Wedding',
    text: 'Our guests could not stop talking about the photobooth. It was the highlight of the reception.',
  },
  {
    name: 'Emily Chen',
    event: 'Corporate Event',
    text: 'Professional, fun, and memorable. Our team loved it and the photos were incredible.',
  },
  {
    name: 'The Martinez Family',
    event: 'Birthday Party',
    text: 'The kids had such a blast. The props and instant prints were perfect.',
  },
];

const regions = [
  { name: 'Kawartha Lakes', desc: 'Lindsay, Port Perry, Bobcaygeon', href: '/kawartha-lakes' },
  { name: 'Prince Edward County', desc: 'Picton, Bloomfield, Wellington', href: '/prince-edward-county' },
  { name: 'Belleville', desc: 'Belleville, Quinte West', href: '/belleville' },
  { name: 'Durham Region', desc: 'Ajax, Pickering, Whitby, Oshawa', href: '/durham-region' },
];

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '7rem 2rem 5rem' }}>
        <div
          style={{
            position: 'absolute',
            top: '-180px',
            right: '-160px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(229,139,130,0.35), rgba(229,139,130,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-220px',
            left: '-180px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 40%, rgba(197,209,177,0.45), rgba(197,209,177,0) 70%)',
          }}
        />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <span
            className="pill"
            style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)', marginBottom: '2rem' }}
          >
            Southern Ontario · Weddings · Corporate · Parties
          </span>

          <h1
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 6rem)',
              color: 'var(--ink)',
              margin: '2rem 0 1.5rem',
            }}
          >
            Make your event
            <br />
            <span style={{ color: 'var(--clay)' }}>unforgettable</span>
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              maxWidth: '640px',
              margin: '0 auto 2.75rem',
              color: 'rgba(37,70,65,0.75)',
            }}
          >
            Instant photo and video experiences that get everyone off their seats — and send them home
            with something worth keeping.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/book"
              style={{
                backgroundColor: 'var(--ink)',
                color: 'var(--cream)',
                padding: '1.15rem 2.5rem',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Check Your Date →
            </Link>
            <Link
              href="/packages"
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
              See Packages
            </Link>
          </div>

          {/* Hero shot */}
          <div
            style={{
              marginTop: '4rem',
              borderRadius: '1.75rem',
              overflow: 'hidden',
              border: '1px solid var(--line)',
              backgroundColor: 'var(--blush)',
              aspectRatio: '16 / 9',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gallery/guest-at-booth.webp"
              alt="A guest laughing in front of the Seven Events booth under purple uplighting"
              width={1500}
              height={1000}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ padding: '0 2rem 5rem' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            backgroundColor: 'var(--ink)',
            borderRadius: '1.75rem',
            padding: '3rem 2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '2.75rem',
                  color: 'var(--clay)',
                  marginBottom: '0.35rem',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  color: 'var(--cream)',
                  opacity: 0.75,
                  fontSize: '0.8rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experiences */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--paper)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span className="pill" style={{ backgroundColor: 'var(--blush)', color: 'var(--ink)' }}>
              What we bring
            </span>
            <h2 style={{ color: 'var(--ink)', marginTop: '1.5rem', fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              Three booths, one obsession
            </h2>
            <p style={{ fontSize: '1.1rem' }}>
              Every setup includes a premium backdrop, unlimited sessions, a live gallery and free
              travel up to 100&nbsp;km from Omemee.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {booths.map((booth) => (
              <Link
                key={booth.name}
                href="/packages"
                style={{
                  backgroundColor: 'var(--cream)',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    backgroundColor: booth.panelBg,
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={booth.img}
                    alt={`The ${booth.name}`}
                    loading="lazy"
                    style={{ width: '100%', maxWidth: '200px', height: '220px', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ padding: '1.75rem 2rem 2rem' }}>
                  <h4 style={{ color: 'var(--ink)', fontSize: '1.15rem' }}>{booth.name}</h4>
                  <p style={{ fontSize: '0.95rem', margin: '0 0 1rem' }}>{booth.blurb}</p>
                  <span style={{ color: 'var(--clay)', fontWeight: 700, fontSize: '0.9rem' }}>
                    See pricing →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <h2
            style={{
              color: 'var(--ink)',
              textAlign: 'center',
              marginBottom: '3.5rem',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
          >
            How it works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {steps.map((step) => (
              <div
                key={step.n}
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  border: '1px solid var(--line)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '2.5rem',
                    color: 'var(--sage)',
                    display: 'block',
                    marginBottom: '1.25rem',
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </span>
                <h4 style={{ color: 'var(--ink)' }}>{step.title}</h4>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work teaser */}
      <section style={{ padding: '0 2rem 5rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ color: 'var(--ink)', margin: 0, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              Recent work
            </h2>
            <Link href="/gallery" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              See the full gallery →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {featured.map((shot) => (
              <Link
                key={shot.src}
                href="/gallery"
                style={{
                  display: 'block',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  backgroundColor: 'var(--blush)',
                  aspectRatio: '4 / 5',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--blush)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <h2
            style={{
              color: 'var(--ink)',
              textAlign: 'center',
              marginBottom: '3.5rem',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
          >
            People love us
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: '1.5rem',
                  padding: '2.25rem',
                  border: '1px solid var(--line)',
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  minHeight: '260px',
                }}
              >
                <div style={{ color: '#e0a300', fontSize: '1.1rem', letterSpacing: '0.1em' }}>★★★★★</div>
                <blockquote style={{ margin: 0, flex: 1 }}>
                  <p style={{ fontSize: '1.05rem', color: 'var(--ink)', margin: 0 }}>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
                <figcaption>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>{t.name}</p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(37,70,65,0.55)',
                    }}
                  >
                    {t.event}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
              Where we go
            </span>
            <h2
              style={{
                color: 'var(--ink)',
                marginTop: '1.5rem',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              }}
            >
              Proudly serving Southern Ontario
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {regions.map((r) => (
              <Link
                key={r.name}
                href={r.href}
                className="card"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <h4 style={{ color: 'var(--ink)' }}>{r.name}</h4>
                <p style={{ fontSize: '0.95rem' }}>{r.desc}</p>
                <span style={{ color: 'var(--clay)', fontWeight: 700, fontSize: '0.9rem' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
