import Link from 'next/link';
import { requireAuth } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '280px', backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '2rem' }}>
        <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', fontWeight: 600, color: 'var(--cream)', display: 'block', marginBottom: '2rem', textDecoration: 'none' }}>
          Seven Events
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/dashboard/events" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            📅 My Bookings
          </Link>
          <Link href="/dashboard/backdrops" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            🎨 Backdrops
          </Link>
          <Link href="/dashboard/templates" style={{ color: 'var(--cream)', padding: '0.75rem', borderRadius: '0.25rem', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            ✏️ Templates
          </Link>
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid rgba(255,255,255,0.2)` }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--blush)', marginBottom: '1rem' }}>
            Need help? Contact us at info@seveneventsphotobooth.com
          </p>
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
