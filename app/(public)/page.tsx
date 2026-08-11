import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

// Every figure here must be defensible. 100+ events since 2023 at ~120 guests
// each is where the 12,000 comes from; 100 km free travel is the real policy.
const stats = [
  { value: '100+', label: 'Events since 2023' },
  { value: '12,000+', label: 'Guests entertained' },
  { value: '100 km', label: 'Free travel radius' },
  { value: '5.0★', label: 'On Google' },
];

const booths = [
  {
    name: 'Snap Booth',
    blurb: 'Sleek, compact and fully self-serve. Digital drop-off from $600 + HST.',
    img: '/booths/snap-booth.webp',
    panelBg: '#ede3db',
  },
  {
    name: 'Oak Booth',
    blurb: 'Warm wood styling on a hardwood tripod. Print drop-off from $750 + HST.',
    img: '/booths/oak-booth.webp',
    panelBg: '#ede3db',
  },
  {
    name: 'Mod Booth',
    blurb: 'Full-service with an onsite attendant. Hourly, or $1,200 + HST for a wedding.',
    img: '/booths/mod-booth.webp',
    panelBg: '#ede3db',
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

/**
 * Real customer reviews only — never invent these. `quote` must be a verbatim
 * excerpt of `full`, not a paraphrase, and `full` is reproduced exactly as the
 * reviewer wrote it. The section below hides itself when this array is empty.
 */
const testimonials: { name: string; event: string; quote: string; full?: string }[] = [
  {
    name: 'Shangni',
    event: 'Wedding · November 2025',
    quote:
      'With the wonderful service, super customizable personal template that you can send them as your frame design, the flexible options in packages, and the price transparency on their website, this is a DREAM wedding vendor.',
    full: `Booked them for my Wedding in Nov 2025.

We did the Completely Captured package $1,200+tax
- 1.5 hrs of cocktail hour Photo Booth
- 3hrs of reception Photo Booth

Highly recommend this package if you can swing it because there was never ever a line for the Photo Booth!

The attendants came right on time, made everything was set up and ready to go. There were several different modes including boomerang, and the photo booth angle is slightly adjustable for taller guests or for better face light!

They sent me a questionnaire with the option of a custom template. I sent back a JPG I made in canva with my 2 cats, and they made the exact template I sent be our frame for the printouts, WHICH WAS ADORABLE EVERYONE LOVED IT.

While they have an attendant there the photo booth is very intuitive to use. I've used other mirror photo booths at weddings and those can sometimes be buggy and hard to use.

There's a gallery link that guests and you can access that has every single photo in it, the individual ones, and then 1 in your template.

The attendants for the booth also printed out every single photo our guests took and kept 1 copy aside for us so we can have at least 1 of each 🙏

With the wonderful service, super customizable personal template that you can send them as your frame design, the flexible options in packages, and the price transparency on their website, this is a DREAM wedding vendor. 👌🏻👌🏻

My fiancé didn't even want a photo booth, but he admits with joy that Seven Events was a wonderful breeze to have and work with. You won't regret booking with them ❤️`,
  },
  {
    name: 'RJ',
    event: 'Staff Party',
    quote:
      'As the evening progressed, taking advantage of the simple to use service left us with plenty of fun photos with a mix of staff. The memories created with this are wonderful!',
    full: `My workplace took advantage of this service during our last staff party, and it was a wonderful addition. As the evening progressed, taking advantage of the simple to use service left us with plenty of fun photos with a mix of staff. The memories created with this are wonderful! I strongly recommend you consider this service at your next party. The owner of the business is a good person as well.`,
  },
];

/** What actually removes hesitation at the point of booking. */
const included = [
  {
    title: 'A real camera, not a tablet',
    copy: 'Every booth runs a high-quality DSLR with professional studio lighting — the difference shows on the print.',
  },
  {
    title: 'No surprise travel fees',
    copy: 'Free travel up to 100 km from Omemee — most of Kawartha Lakes, PEC, Belleville and Durham is covered.',
  },
  {
    title: 'Unlimited sessions, always',
    copy: 'Never a per-photo cap. Every guest can go again as many times as they want.',
  },
  {
    title: 'Setup and breakdown included',
    copy: 'We arrive early, set up around your timeline, and pack down without interrupting the party.',
  },
  {
    title: 'Photos land instantly',
    copy: 'A live gallery guests can text or email to themselves before they have left the booth.',
  },
  {
    title: 'Your branding on every print',
    copy: 'A personalised template designed around your names, colours or company logo.',
  },
  {
    title: 'Same-day date check',
    copy: 'Send us your date and we confirm availability the same day — no waiting on a quote.',
  },
  {
    title: 'Prints set aside for you',
    copy: 'Our attendant keeps a selection of the night’s prints back for you, so the hosts are not the ones left without any.',
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

      {/* What's included — the objections people actually have before booking */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--blush)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '640px', marginInline: 'auto' }}>
            <span className="pill" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>
              No surprises
            </span>
            <h2
              style={{
                color: 'var(--ink)',
                marginTop: '1.5rem',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              }}
            >
              What every booking includes
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {included.map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: '1.5rem',
                  padding: '2.25rem',
                  border: '1px solid var(--line)',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: 'block',
                    color: 'var(--clay)',
                    fontSize: '1.5rem',
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}
                >
                  ✓
                </span>
                <h4 style={{ color: 'var(--ink)', fontSize: '1.1rem' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — renders only when there are real ones to show */}
      {testimonials.length > 0 && (
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
                  <p style={{ fontSize: '1.05rem', color: 'var(--ink)', margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>

                  {/* Native disclosure — the full review stays one click away
                      so the excerpt can never be accused of cherry-picking. */}
                  {t.full && (
                    <details style={{ marginTop: '1.25rem' }}>
                      <summary
                        style={{
                          cursor: 'pointer',
                          color: 'var(--clay)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                        }}
                      >
                        Read the full review
                      </summary>
                      <p
                        style={{
                          marginTop: '1rem',
                          fontSize: '0.9rem',
                          whiteSpace: 'pre-line',
                          color: 'rgba(37,70,65,0.75)',
                        }}
                      >
                        {t.full}
                      </p>
                    </details>
                  )}
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
      )}

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
