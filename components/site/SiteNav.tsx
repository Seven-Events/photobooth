'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/packages', label: 'Packages' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--cream)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(250, 247, 239, 0.1)',
      }}
    >
      <div
        className="site-nav-bar"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1.75rem 2rem',
        }}
      >
        <Link
          href="/"
          style={{
            color: 'var(--cream)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: '1.5rem',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Seven Events
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--clay)',
              marginTop: '0.35rem',
              fontWeight: 600,
            }}
          >
            Photobooth Co.
          </span>
        </Link>

        <nav className="site-nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color: pathname === link.href ? 'var(--clay)' : 'var(--cream)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/book"
          style={{
            backgroundColor: 'var(--clay)',
            color: 'var(--ink)',
            padding: '0.9rem 1.75rem',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Book Your Date
        </Link>
      </div>
    </header>
  );
}
