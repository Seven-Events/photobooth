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
      <div className="site-nav-bar">
        <Link href="/" className="site-nav-logo">
          <span className="site-nav-logo__name">Seven Events</span>
          <span className="site-nav-logo__sub">Photobooth Co.</span>
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

        <Link href="/book" className="site-nav-cta">
          Book Your Date
        </Link>
      </div>
    </header>
  );
}
