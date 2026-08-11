import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Photo Gallery | Seven Events Photobooth',
  description:
    'Real weddings, galas and parties across Southern Ontario — booth setups, guest captures and print templates from Seven Events Photobooth.',
};

type Shot = {
  src: string;
  alt: string;
  /** Intrinsic ratio, used to reserve space and drive the masonry row span. */
  w: number;
  h: number;
};

const shots: Shot[] = [
  {
    src: '/gallery/guest-at-booth.webp',
    alt: 'A guest laughing in front of the Seven Events booth under purple uplighting',
    w: 1500,
    h: 1000,
  },
  {
    src: '/gallery/strip-bridesmaids.webp',
    alt: 'Wedding photo strip of three bridesmaids in green dresses',
    w: 400,
    h: 1200,
  },
  {
    src: '/gallery/gala-guests-pair.webp',
    alt: 'Two guests in black tie posing at a gala backdrop',
    w: 1400,
    h: 1232,
  },
  {
    src: '/gallery/booth-holiday-party.webp',
    alt: 'Guests crowding around the booth at a holiday party',
    w: 787,
    h: 1400,
  },
  {
    src: '/gallery/string-lights-guests.webp',
    alt: 'Two guests against a wood backdrop strung with festoon lights',
    w: 1600,
    h: 1067,
  },
  {
    src: '/gallery/strip-groomsmen.webp',
    alt: 'Wedding photo strip of the groomsmen pulling faces',
    w: 400,
    h: 1200,
  },
  {
    src: '/gallery/mod-booth-styled.webp',
    alt: 'The Mod Booth and printer styled beside a floral installation',
    w: 1067,
    h: 1600,
  },
  {
    src: '/gallery/floral-wall-guests.webp',
    alt: 'Two guests in pink blazers in front of a floral wall backdrop',
    w: 1080,
    h: 720,
  },
  {
    src: '/gallery/attendant-at-work.webp',
    alt: 'A Seven Events attendant setting up a group shot at a gala',
    w: 788,
    h: 1400,
  },
  {
    src: '/gallery/strip-polaroid.webp',
    alt: 'Polaroid-style wedding print template for Tszyan and Cheukting',
    w: 400,
    h: 1200,
  },
  {
    src: '/gallery/gala-guests-group.webp',
    alt: 'A family posing together at a charity gala',
    w: 1400,
    h: 933,
  },
  {
    src: '/gallery/setup-green-drape.webp',
    alt: 'The Oak Booth set up against a green drape backdrop in a marquee',
    w: 788,
    h: 1400,
  },
  {
    src: '/gallery/setup-gold-backdrop.webp',
    alt: 'The Oak Booth in front of a gold star backdrop in a barn venue',
    w: 788,
    h: 1400,
  },
];

export default function GalleryPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Recent work
          </span>
          <h1
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              margin: '1.75rem 0 1.25rem',
            }}
          >
            Event gallery
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Real weddings, galas and parties from across Southern Ontario — plus a few of the print
            templates guests took home.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 2rem 5rem' }}>
        {/* CSS columns give true masonry: every shot keeps its own aspect
            ratio, so nothing is cropped and no row-span maths is needed. */}
        <div className="masonry" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          {shots.map((shot) => (
            <figure
              key={shot.src}
              style={{
                margin: '0 0 1.25rem',
                breakInside: 'avoid',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                backgroundColor: 'var(--blush)',
                border: '1px solid var(--line)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.w}
                height={shot.h}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </figure>
          ))}
        </div>

        <div
          style={{
            maxWidth: '1180px',
            margin: '3.5rem auto 0',
            backgroundColor: 'var(--ink)',
            borderRadius: '1.75rem',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: 'var(--cream)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Want your event featured?
          </h3>
          <p style={{ color: 'rgba(250,247,239,0.75)', marginBottom: '2rem' }}>
            Book a booth and we will add your highlights to the gallery.
          </p>
          <Link
            href="/book"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--clay)',
              color: 'var(--ink)',
              padding: '1rem 2.25rem',
              borderRadius: '999px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Book Now →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
