import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Photo Gallery | Seven Events Photobooth',
  description: 'Browse weddings, corporate events and parties we have photographed across Southern Ontario.',
};

const tiles = [
  { label: 'Weddings', tone: 'var(--clay)', span: 2 },
  { label: 'Corporate', tone: 'var(--sage)', span: 1 },
  { label: 'Birthdays', tone: 'var(--sage)', span: 1 },
  { label: 'Engagements', tone: 'var(--clay)', span: 1 },
  { label: 'Holiday Parties', tone: 'var(--sage)', span: 1 },
  { label: 'Fundraisers', tone: 'var(--clay)', span: 2 },
];

export default function GalleryPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
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
            A look at the rooms we have worked and the people we have photographed.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 2rem 5rem' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.label}
              style={{
                borderRadius: '1.5rem',
                minHeight: '280px',
                backgroundColor: 'var(--paper)',
                border: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(160deg, ${tile.tone}33, transparent 65%)`,
                }}
              />
              <div style={{ position: 'relative' }}>
                <span
                  className="pill"
                  style={{ backgroundColor: tile.tone, color: 'var(--ink)', marginBottom: '0.75rem' }}
                >
                  {tile.label}
                </span>
                <p style={{ margin: '0.75rem 0 0', fontSize: '0.9rem' }}>Photos coming soon</p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: '1180px',
            margin: '3rem auto 0',
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
