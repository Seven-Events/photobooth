'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/packages';

type Client = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  count: number;
  lifetimeCents: number;
  latest: string | null;
  upcoming: number;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/clients');
        const data = await res.json();
        if (!res.ok) setError(data.error || 'Could not load clients.');
        else setClients(data.clients);
      } catch {
        setError('Could not reach the server.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = clients.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.full_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q)
    );
  });

  const th: React.CSSProperties = {
    textAlign: 'left',
    padding: '0.85rem 1rem',
    color: 'rgba(37,70,65,0.6)',
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  };
  const td: React.CSSProperties = { padding: '1rem', color: 'var(--ink)', verticalAlign: 'top' };

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: 'var(--ink)', marginBottom: '0.5rem' }}>
          Clients
        </h1>
        <p style={{ color: 'rgba(37,70,65,0.7)', marginBottom: '1.5rem' }}>
          {loading ? 'Loading…' : `${clients.length} customer${clients.length === 1 ? '' : 's'}`}
        </p>

        <input
          className="field"
          placeholder="Search by name, email or phone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: '380px', marginBottom: '1.5rem' }}
        />

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--blush)' }}>
                  <th style={th}>Client</th>
                  <th style={th}>Bookings</th>
                  <th style={th}>Upcoming</th>
                  <th style={th}>Lifetime value</th>
                  <th style={th}>Most recent event</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ ...td, textAlign: 'center', padding: '3rem' }}>Loading…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ ...td, textAlign: 'center', padding: '3rem', color: 'rgba(37,70,65,0.6)' }}>
                      {clients.length === 0 ? 'No customers yet.' : 'Nobody matches that search.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={td}>
                        <strong>{c.full_name}</strong>
                        <br />
                        <span style={{ fontSize: '0.82rem', color: 'rgba(37,70,65,0.6)' }}>
                          <a href={`mailto:${c.email}`}>{c.email}</a>
                          {c.phone ? <> · <a href={`tel:${c.phone}`}>{c.phone}</a></> : null}
                        </span>
                      </td>
                      <td style={td}>{c.count}</td>
                      <td style={td}>
                        {c.upcoming > 0 ? (
                          <span style={{ color: '#3c5a2b', fontWeight: 700 }}>{c.upcoming}</span>
                        ) : (
                          <span style={{ color: 'rgba(37,70,65,0.45)' }}>—</span>
                        )}
                      </td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{formatPrice(c.lifetimeCents)}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{c.latest ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
