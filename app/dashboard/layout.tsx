import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import LogoutButton from '@/components/site/LogoutButton';

const links = [
  { href: '/dashboard/events', label: '📅 My Bookings' },
  { href: '/dashboard/backdrops', label: '🎨 Backdrops' },
  { href: '/dashboard/templates', label: '✏️ Templates' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="app-sidebar">
        <Link
          href="/"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--cream)',
            display: 'block',
            marginBottom: '2rem',
            textDecoration: 'none',
          }}
        >
          Seven Events
        </Link>

        <nav className="app-sidebar__nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="app-sidebar__link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '0.875rem', color: 'rgba(250,247,239,0.7)', marginBottom: '1rem' }}>
            Need help? Email info@seveneventsphotobooth.com
          </p>
          <Link href="/" style={{ color: 'var(--cream)', fontSize: '0.875rem', textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}>
            ← Back to the site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main style={{ flex: 1, backgroundColor: 'var(--cream)', minWidth: 0 }}>{children}</main>
    </div>
  );
}
