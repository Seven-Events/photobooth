'use client';

import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
  { href: '/kawartha-lakes', label: 'Kawartha Lakes' },
  { href: '/prince-edward-county', label: 'Prince Edward County' },
  { href: '/belleville', label: 'Belleville' },
  { href: '/durham-region', label: 'Durham Region' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '5rem 2rem 3rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}
          >
            Let&apos;s make it
            <br />
            <span style={{ color: 'var(--clay)' }}>unforgettable</span>
          </p>
          <Link
            href="/book"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--clay)',
              color: 'var(--ink)',
              padding: '1.1rem 2.5rem',
              borderRadius: '999px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Check Your Date →
          </Link>
        </div>

        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.25rem 2.25rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(250, 247, 239, 0.15)',
          }}
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--cream)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                opacity: 0.85,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
            opacity: 0.7,
          }}
        >
          <span>&copy; {new Date().getFullYear()} Seven Events Photobooth</span>
          <a href="mailto:info@seveneventsphotobooth.com" style={{ color: 'var(--cream)', textDecoration: 'none' }}>
            info@seveneventsphotobooth.com
          </a>
          <span>Serving Southern Ontario</span>
        </div>
      </div>
    </footer>
  );
}
