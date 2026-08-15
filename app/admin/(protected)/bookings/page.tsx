'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice, getRate } from '@/lib/packages';

type Booking = {
  id: string;
  event_date: string;
  event_time: string;
  event_title: string;
  rate_id: string;
  venue: string | null;
  guest_count: number | null;
  total_cents: number;
  deposit_cents: number;
  deposit_status: string;
  status: string;
  users: { full_name: string; email: string; phone: string } | null;
};

const STATUS_TONE: Record<string, { bg: string; fg: string; label: string }> = {
  awaiting_deposit: { bg: '#fdf0e6', fg: '#8a5a2b', label: 'Awaiting deposit' },
  pending: { bg: '#f5efe8', fg: '#254641', label: 'Pending' },
  confirmed: { bg: '#e3ecd8', fg: '#3c5a2b', label: 'Confirmed' },
  completed: { bg: '#e8eef0', fg: '#3a5560', label: 'Completed' },
  cancelled: { bg: '#f7e3e0', fg: '#8a3b32', label: 'Cancelled' },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/bookings');
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Could not load bookings.');
        } else {
          setBookings(data.bookings);
        }
      } catch {
        setError('Could not reach the server.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--ink)', marginBottom: '0.5rem' }}>
              Bookings
            </h1>
            <p style={{ color: 'rgba(37,70,65,0.7)', margin: 0 }}>
              {loading ? 'Loading…' : `${bookings.length} booking${bookings.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <Link href="/admin/bookings/new" className="button-primary" style={{ textDecoration: 'none' }}>
            Add booking
          </Link>
        </div>

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--blush)' }}>
                  <th style={th}>Client</th>
                  <th style={th}>Event</th>
                  <th style={th}>Date</th>
                  <th style={th}>Package</th>
                  <th style={th}>Total</th>
                  <th style={th}>Deposit</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ ...td, textAlign: 'center', padding: '3rem' }}>
                      Loading bookings…
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ ...td, textAlign: 'center', padding: '3rem', color: 'rgba(37,70,65,0.6)' }}>
                      No bookings yet. They will appear here as soon as someone books through the site.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => {
                    const tone = STATUS_TONE[b.status] ?? STATUS_TONE.pending;
                    return (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={td}>
                          <Link href={`/admin/bookings/${b.id}`} style={{ fontWeight: 700, color: 'var(--ink)' }}>
                            {b.users?.full_name ?? 'Open booking'}
                          </Link>
                          <br />
                          <span style={{ fontSize: '0.82rem', color: 'rgba(37,70,65,0.6)' }}>
                            {b.users?.email}
                            {b.users?.phone ? ` · ${b.users.phone}` : ''}
                          </span>
                        </td>
                        <td style={td}>
                          {b.event_title}
                          {b.venue && (
                            <>
                              <br />
                              <span style={{ fontSize: '0.82rem', color: 'rgba(37,70,65,0.6)' }}>{b.venue}</span>
                            </>
                          )}
                          {b.guest_count ? (
                            <>
                              <br />
                              <span style={{ fontSize: '0.82rem', color: 'rgba(37,70,65,0.6)' }}>
                                ~{b.guest_count} guests
                              </span>
                            </>
                          ) : null}
                        </td>
                        <td style={{ ...td, whiteSpace: 'nowrap' }}>
                          {b.event_date}
                          <br />
                          <span style={{ fontSize: '0.82rem', color: 'rgba(37,70,65,0.6)' }}>{b.event_time}</span>
                        </td>
                        <td style={td}>{getRate(b.rate_id)?.label ?? b.rate_id}</td>
                        <td style={{ ...td, whiteSpace: 'nowrap' }}>{formatPrice(b.total_cents)}</td>
                        <td style={{ ...td, whiteSpace: 'nowrap' }}>
                          {formatPrice(b.deposit_cents)}
                          <br />
                          <span
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: b.deposit_status === 'paid' ? '#3c5a2b' : 'rgba(37,70,65,0.55)',
                            }}
                          >
                            {b.deposit_status}
                          </span>
                        </td>
                        <td style={td}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: tone.bg,
                              color: tone.fg,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {tone.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
