import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '280px', backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '2rem' }}>
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--cream)', display: 'block', marginBottom: '2rem', textDecoration: 'none' }}>
          Seven Events Admin
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/admin/dashboard" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            📊 Dashboard
          </Link>
          <Link href="/admin/bookings" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            📅 Bookings
          </Link>
          <Link href="/admin/clients" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            👥 Clients
          </Link>
          <Link href="/admin/analytics" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            📈 Analytics
          </Link>
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid rgba(255,255,255,0.2)` }}>
          <Link href="/" style={{ color: 'var(--cream)', fontSize: '0.875rem', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: 'var(--cream)' }}>
        {children}
      </main>
    </div>
  );
}
