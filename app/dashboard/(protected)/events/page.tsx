'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice, getBooth, getRate } from '@/lib/packages';

type Booking = {
  id: string;
  event_date: string;
  event_time: string;
  event_title: string;
  booth_id: string;
  rate_id: string;
  addon_ids: string[] | null;
  venue: string | null;
  guest_count: number | null;
  total_cents: number;
  deposit_cents: number;
  deposit_status: string;
  status: string;
};

const STATUS: Record<string, { bg: string; fg: string; label: string; help: string }> = {
  awaiting_deposit: {
    bg: '#fdf0e6',
    fg: '#8a5a2b',
    label: 'Awaiting deposit',
    help: 'Your date is not held until the deposit is paid.',
  },
  pending: {
    bg: '#f5efe8',
    fg: '#254641',
    label: 'Pending confirmation',
    help: 'We have your booking and will confirm within 24 hours.',
  },
  confirmed: { bg: '#e3ecd8', fg: '#3c5a2b', label: 'Confirmed', help: 'Your date is locked in.' },
  completed: { bg: '#e8eef0', fg: '#3a5560', label: 'Completed', help: 'Thanks for having us!' },
  cancelled: { bg: '#f7e3e0', fg: '#8a3b32', label: 'Cancelled', help: '' },
};

function longDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function EventsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/bookings/user');
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/login';
            return;
          }
          const d = await response.json().catch(() => ({}));
          throw new Error(d.error || 'Could not load your bookings');
        }
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            My Bookings
          </h1>
          <p style={{ color: 'rgba(37,70,65,0.7)', margin: 0 }}>
            Your photobooth bookings and their status.
          </p>
        </div>

        {loading && (
          <div className="card" style={{ textAlign: 'center' }}>
            Loading your bookings…
          </div>
        )}

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>You do not have any bookings yet.</p>
            <Link href="/book" className="button-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Book your event
            </Link>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {bookings.map((b) => {
              const tone = STATUS[b.status] ?? STATUS.pending;
              const rate = getRate(b.rate_id);
              const booth = getBooth(b.booth_id);
              const balance = b.total_cents - b.deposit_cents;

              return (
                <article key={b.id} className="card">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div>
                      <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: '0.35rem' }}>
                        {b.event_title}
                      </h2>
                      <p style={{ color: 'var(--clay)', fontWeight: 700, margin: 0 }}>{longDate(b.event_date)}</p>
                    </div>
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        padding: '0.4rem 0.9rem',
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
                  </div>

                  {tone.help && (
                    <p style={{ fontSize: '0.9rem', color: 'rgba(37,70,65,0.7)', marginTop: 0 }}>{tone.help}</p>
                  )}

                  <dl
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: '1rem',
                      margin: '1.25rem 0 0',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--line)',
                    }}
                  >
                    <Fact label="Start time" value={b.event_time} />
                    <Fact label="Booth" value={booth?.name ?? b.booth_id} />
                    <Fact label="Package" value={rate?.label ?? b.rate_id} />
                    {b.venue && <Fact label="Venue" value={b.venue} />}
                    {b.guest_count ? <Fact label="Guests" value={`~${b.guest_count}`} /> : null}
                    <Fact label="Total" value={`${formatPrice(b.total_cents)} incl. HST`} />
                    <Fact
                      label="Deposit"
                      value={`${formatPrice(b.deposit_cents)} — ${b.deposit_status}`}
                    />
                    {balance > 0 && <Fact label="Balance due" value={formatPrice(balance)} />}
                  </dl>

                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link
                      href="/dashboard/templates"
                      className="button-secondary"
                      style={{ display: 'inline-block', textDecoration: 'none', padding: '0.6rem 1.25rem' }}
                    >
                      Design your print template
                    </Link>
                    <Link
                      href="/dashboard/backdrops"
                      className="button-secondary"
                      style={{ display: 'inline-block', textDecoration: 'none', padding: '0.6rem 1.25rem' }}
                    >
                      Choose a backdrop
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(37,70,65,0.55)',
          fontWeight: 700,
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0, color: 'var(--ink)', fontSize: '0.95rem' }}>{value}</dd>
    </div>
  );
}
