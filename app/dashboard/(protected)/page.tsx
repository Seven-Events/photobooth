import { requireAuth } from '@/lib/auth';

export default async function DashboardPage() {
  await requireAuth();

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '2rem' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--ink)' }}>Welcome to your dashboard. More features coming soon!</p>
      </div>
    </main>
  );
}
