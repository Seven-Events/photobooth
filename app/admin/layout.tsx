import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';

const links = [
  { href: '/admin/dashboard', label: '📊 Dashboard' },
  { href: '/admin/calendar', label: '🗓️ Calendar' },
  { href: '/admin/bookings', label: '📅 Bookings' },
  { href: '/admin/clients', label: '👥 Clients' },
  { href: '/admin/team', label: '🔑 Team' },
  { href: '/admin/setup', label: '⚙️ Setup check' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

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
          Seven Events Admin
        </Link>

        <nav className="app-sidebar__nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="app-sidebar__link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Link href="/" style={{ color: 'var(--cream)', fontSize: '0.875rem', textDecoration: 'none' }}>
            ← Back to the site
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, backgroundColor: 'var(--cream)', minWidth: 0 }}>{children}</main>
    </div>
  );
}
