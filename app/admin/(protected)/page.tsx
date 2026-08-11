import { requireAdmin } from '@/lib/auth';

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '2rem' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: 'var(--ink)' }}>Manage events, clients, and more. Coming soon!</p>
      </div>
    </main>
  );
}
