'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { booths, getBooth } from '@/lib/packages';

type CalBooking = {
  id: string;
  event_date: string;
  event_time: string;
  event_title: string;
  booth_id: string;
  status: string;
  users: { full_name: string | null } | null;
};

type Blocked = {
  id: string;
  blocked_on: string;
  booth_id: string | null;
  reason: string | null;
};

const STATUS_DOT: Record<string, string> = {
  awaiting_deposit: '#d99a4e',
  pending: '#7c8c86',
  confirmed: '#4a7a5e',
  completed: '#5d7b88',
};

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function iso(y: number, m: number, day: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date());
  const [bookings, setBookings] = useState<CalBooking[]>([]);
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [blockBooth, setBlockBooth] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [busy, setBusy] = useState(false);

  const month = monthKey(cursor);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/calendar?month=${month}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not load the calendar.');
        return;
      }
      setBookings(data.bookings);
      setBlocked(data.blocked);
      setError('');
    } catch {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    load();
  }, [load]);

  const year = cursor.getFullYear();
  const m = cursor.getMonth();
  const firstWeekday = new Date(year, m, 1).getDay();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const todayIso = iso(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  async function block() {
    if (!selected) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selected, boothId: blockBooth || null, reason: blockReason }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Could not block that date.');
      else {
        setBlockReason('');
        setBlockBooth('');
        await load();
      }
    } finally {
      setBusy(false);
    }
  }

  async function unblock(id: string) {
    setBusy(true);
    try {
      await fetch(`/api/admin/calendar?id=${id}`, { method: 'DELETE' });
      await load();
    } finally {
      setBusy(false);
    }
  }

  const selectedBookings = bookings.filter((b) => b.event_date === selected);
  const selectedBlocks = blocked.filter((b) => b.blocked_on === selected);

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: 'var(--ink)', margin: 0 }}>
            {cursor.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="button-secondary" style={{ padding: '0.5rem 1rem' }}
              onClick={() => setCursor(new Date(year, m - 1, 1))}>← Prev</button>
            <button className="button-secondary" style={{ padding: '0.5rem 1rem' }}
              onClick={() => setCursor(new Date())}>Today</button>
            <button className="button-secondary" style={{ padding: '0.5rem 1rem' }}
              onClick={() => setCursor(new Date(year, m + 1, 1))}>Next →</button>
          </div>
        </div>

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', opacity: loading ? 0.6 : 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(37,70,65,0.5)', fontWeight: 700, padding: '0.5rem 0' }}>
                {d}
              </div>
            ))}

            {Array.from({ length: firstWeekday }).map((_, i) => <div key={`pad-${i}`} />)}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = iso(year, m, day);
              const dayBookings = bookings.filter((b) => b.event_date === date);
              const dayBlocks = blocked.filter((b) => b.blocked_on === date);
              const isToday = date === todayIso;
              const isSelected = date === selected;

              return (
                <button
                  key={date}
                  onClick={() => setSelected(isSelected ? null : date)}
                  style={{
                    minHeight: '84px',
                    padding: '0.4rem',
                    textAlign: 'left',
                    borderRadius: '0.6rem',
                    border: isSelected ? '2px solid var(--clay)' : '1px solid var(--line)',
                    backgroundColor: dayBlocks.length ? '#f7e3e0' : 'var(--paper)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: isToday ? 800 : 600, color: isToday ? 'var(--clay)' : 'var(--ink)' }}>
                    {day}
                  </span>
                  {dayBookings.slice(0, 2).map((b) => (
                    <span key={b.id} style={{ fontSize: '0.65rem', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      <span style={{ width: 6, height: 6, borderRadius: 99, backgroundColor: STATUS_DOT[b.status] ?? '#999', flexShrink: 0 }} />
                      {getBooth(b.booth_id)?.name.replace(' Booth', '') ?? b.booth_id}
                    </span>
                  ))}
                  {dayBookings.length > 2 && (
                    <span style={{ fontSize: '0.62rem', color: 'rgba(37,70,65,0.6)' }}>+{dayBookings.length - 2} more</span>
                  )}
                  {dayBlocks.length > 0 && (
                    <span style={{ fontSize: '0.62rem', color: '#8a3b32', fontWeight: 700 }}>Blocked</span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--line)' }}>
            {Object.entries(STATUS_DOT).map(([k, colour]) => (
              <span key={k} style={{ fontSize: '0.75rem', color: 'rgba(37,70,65,0.7)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, backgroundColor: colour }} />
                {k.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>

        {selected && (
          <section className="card">
            <h2 style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>
              {new Date(selected + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </h2>

            {selectedBookings.length > 0 ? (
              <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1.75rem' }}>
                {selectedBookings.map((b) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`}
                    style={{ display: 'block', backgroundColor: 'var(--blush)', borderRadius: '0.75rem', padding: '0.9rem 1.1rem', textDecoration: 'none' }}>
                    <strong style={{ color: 'var(--ink)' }}>{b.event_title}</strong>
                    <span style={{ color: 'rgba(37,70,65,0.7)', fontSize: '0.88rem' }}>
                      {' '}— {b.users?.full_name ?? 'Customer'} · {getBooth(b.booth_id)?.name} · {b.event_time} · {b.status.replace('_', ' ')}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(37,70,65,0.6)', fontSize: '0.9rem' }}>No bookings on this date.</p>
            )}

            {selectedBlocks.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>Blocked</h3>
                {selectedBlocks.map((b) => (
                  <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', backgroundColor: '#f7e3e0', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#8a3b32' }}>
                      {b.booth_id ? getBooth(b.booth_id)?.name : 'All booths'}
                      {b.reason ? ` — ${b.reason}` : ''}
                    </span>
                    <button className="button-secondary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                      disabled={busy} onClick={() => unblock(b.id)}>
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '1rem' }}>Block this date</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                <div>
                  <label className="field-label" htmlFor="blockBooth">Which booth</label>
                  <select id="blockBooth" className="field" value={blockBooth} onChange={(e) => setBlockBooth(e.target.value)}>
                    <option value="">All booths</option>
                    {booths.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="blockReason">Reason (optional)</label>
                  <input id="blockReason" className="field" value={blockReason} placeholder="Holiday, maintenance…"
                    onChange={(e) => setBlockReason(e.target.value)} />
                </div>
                <button className="button-primary" disabled={busy} onClick={block}>
                  {busy ? 'Working…' : 'Block'}
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.75rem 0 0' }}>
                Customers cannot book a blocked date on the website.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
