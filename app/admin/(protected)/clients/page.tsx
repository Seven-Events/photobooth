'use client';

import { useEffect, useState } from 'react';

interface Client {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // For now, we'll fetch from Supabase
        // In the future, sync from Booqable
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Clients
          </h1>
          <p style={{ color: 'var(--ink)' }}>Manage your photobooth clients</p>
        </div>

        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid var(--line)` }}>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Phone</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink)' }}>
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink)' }}>
                    No clients yet. They'll appear after their first booking.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} style={{ borderBottom: `1px solid var(--line)` }}>
                    <td style={{ padding: '1rem', color: 'var(--ink)' }}>{client.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--ink)' }}>{client.email}</td>
                    <td style={{ padding: '1rem', color: 'var(--ink)' }}>{client.phone || '—'}</td>
                    <td style={{ padding: '1rem' }}>
                      <a href={`/admin/clients/${client.id}`} style={{ color: 'var(--clay)', textDecoration: 'none', fontWeight: 600 }}>
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
