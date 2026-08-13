'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { formatPrice, getBooth, getRate, groupAddons } from '@/lib/packages';

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
  subtotal_cents: number;
  hst_cents: number;
  total_cents: number;
  deposit_cents: number;
  deposit_status: string;
  status: string;
  source: string | null;
  special_requests: string | null;
  created_at: string;
  users: { id: string; full_name: string; email: string; phone: string } | null;
};

type Note = {
  id: string;
  body: string;
  created_at: string;
  users: { full_name: string | null; email: string | null } | null;
};

type Activity = {
  id: string;
  action: string;
  detail: string | null;
  created_at: string;
  users: { full_name: string | null; email: string | null } | null;
};

const STATUSES = [
  { value: 'awaiting_deposit', label: 'Awaiting deposit' },
  { value: 'pending', label: 'Pending confirmation' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const DEPOSIT_STATUSES = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paid', label: 'Paid' },
  { value: 'refunded', label: 'Refunded' },
];

function when(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' });
}

function who(u: { full_name: string | null; email: string | null } | null) {
  return u?.full_name || u?.email || 'Someone';
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [booking, setBooking] = useState<Booking | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [noteBody, setNoteBody] = useState('');
  const [postingNote, setPostingNote] = useState(false);

  // Editable fields
  const [form, setForm] = useState({
    eventDate: '',
    eventTime: '',
    eventTitle: '',
    venue: '',
    guestCount: '',
    specialRequests: '',
  });

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not load this booking.');
        return;
      }
      setBooking(data.booking);
      setNotes(data.notes);
      setActivity(data.activity);
      setForm({
        eventDate: data.booking.event_date ?? '',
        eventTime: data.booking.event_time ?? '',
        eventTitle: data.booking.event_title ?? '',
        venue: data.booking.venue ?? '',
        guestCount: data.booking.guest_count?.toString() ?? '',
        specialRequests: data.booking.special_requests ?? '',
      });
    } catch {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function patch(payload: Record<string, unknown>) {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not save.');
        return;
      }
      setBooking(data.booking);
      setSavedAt(new Date().toLocaleTimeString('en-CA', { timeStyle: 'short' }));
      // Refresh so the activity trail reflects what just happened.
      load();
    } catch {
      setError('Could not reach the server.');
    } finally {
      setSaving(false);
    }
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteBody.trim()) return;
    setPostingNote(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: noteBody }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotes((n) => [data.note, ...n]);
        setNoteBody('');
        load();
      } else {
        setError(data.error || 'Could not save the note.');
      }
    } finally {
      setPostingNote(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>Loading…</div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--danger)' }}>{error || 'Booking not found.'}</p>
          <Link href="/admin/bookings" style={{ fontWeight: 700 }}>← Back to bookings</Link>
        </div>
      </main>
    );
  }

  const rate = getRate(booking.rate_id);
  const booth = getBooth(booking.booth_id);
  // Grouped, because quantity is stored as a repeated id.
  const chosenAddons = groupAddons(booking.addon_ids ?? []);
  const addonsTotalCents = chosenAddons.reduce((s, a) => s + a.totalCents, 0);
  const balance = booking.total_cents - booking.deposit_cents;

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/admin/bookings" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
          ← All bookings
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0 2rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: 'var(--ink)', marginBottom: '0.35rem' }}>
              {booking.event_title}
            </h1>
            <p style={{ margin: 0, color: 'rgba(37,70,65,0.7)' }}>
              {booking.users?.full_name} · booked {when(booking.created_at)}
              {booking.source === 'manual' && ' · added manually'}
            </p>
          </div>
          {savedAt && (
            <span style={{ fontSize: '0.8rem', color: 'var(--ok)', fontWeight: 700 }}>Saved {savedAt}</span>
          )}
        </div>

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Status controls */}
        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Status</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label className="field-label" htmlFor="status">Booking status</label>
              <select
                id="status"
                className="field"
                value={booking.status}
                disabled={saving}
                onChange={(e) => patch({ status: e.target.value })}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="deposit">Deposit</label>
              <select
                id="deposit"
                className="field"
                value={booking.deposit_status}
                disabled={saving}
                onChange={(e) => patch({ depositStatus: e.target.value })}
              >
                {DEPOSIT_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                Stripe sets this automatically. Change it only for payments taken another way.
              </p>
            </div>
          </div>
        </section>

        {/* Customer + money */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <section className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1rem' }}>Customer</h2>
            <p style={{ margin: '0 0 0.4rem', fontWeight: 700, color: 'var(--ink)' }}>{booking.users?.full_name}</p>
            <p style={{ margin: '0 0 0.3rem' }}>
              <a href={`mailto:${booking.users?.email}`}>{booking.users?.email}</a>
            </p>
            <p style={{ margin: 0 }}>
              <a href={`tel:${booking.users?.phone}`}>{booking.users?.phone}</a>
            </p>
          </section>

          <section className="card">
            <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1rem' }}>Money</h2>
            <Line label={rate?.label ?? booking.rate_id} value={formatPrice(booking.subtotal_cents - addonsTotalCents)} />
            {chosenAddons.map(({ addon, qty, totalCents }) => (
              <Line
                key={addon.id}
                label={qty > 1 ? `${addon.label} × ${qty}` : addon.label}
                value={formatPrice(totalCents)}
                muted
              />
            ))}
            <Line label="HST" value={formatPrice(booking.hst_cents)} muted />
            <div style={{ borderTop: '1px solid var(--line)', margin: '0.6rem 0', paddingTop: '0.6rem' }}>
              <Line label="Total" value={formatPrice(booking.total_cents)} bold />
              <Line label={`Deposit (${booking.deposit_status})`} value={formatPrice(booking.deposit_cents)} />
              <Line label="Balance due" value={formatPrice(balance)} bold />
            </div>
          </section>
        </div>

        {/* Editable details */}
        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Event details</h2>

          <p style={{ fontSize: '0.85rem', color: 'rgba(37,70,65,0.6)', marginTop: 0 }}>
            Booth: <strong>{booth?.name ?? booking.booth_id}</strong> · Package:{' '}
            <strong>{rate?.label ?? booking.rate_id}</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="field-label" htmlFor="eventDate">Date</label>
              <input id="eventDate" className="field" type="date" value={form.eventDate}
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
            </div>
            <div>
              <label className="field-label" htmlFor="eventTime">Start time</label>
              <input id="eventTime" className="field" type="time" value={form.eventTime}
                onChange={(e) => setForm({ ...form, eventTime: e.target.value })} />
            </div>
            <div>
              <label className="field-label" htmlFor="eventTitle">Event</label>
              <input id="eventTitle" className="field" type="text" value={form.eventTitle}
                onChange={(e) => setForm({ ...form, eventTitle: e.target.value })} />
            </div>
            <div>
              <label className="field-label" htmlFor="guestCount">Guests</label>
              <input id="guestCount" className="field" type="number" min={0} value={form.guestCount}
                onChange={(e) => setForm({ ...form, guestCount: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="field-label" htmlFor="venue">Venue</label>
              <input id="venue" className="field" type="text" value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="field-label" htmlFor="specialRequests">Customer notes</label>
              <textarea id="specialRequests" className="field" rows={3} value={form.specialRequests}
                onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} />
            </div>
          </div>

          <button
            className="button-primary"
            style={{ marginTop: '1.5rem' }}
            disabled={saving}
            onClick={() => patch({ ...form, guestCount: form.guestCount === '' ? null : form.guestCount })}
          >
            {saving ? 'Saving…' : 'Save details'}
          </button>
        </section>

        {/* Notes */}
        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Internal notes</h2>
          <p style={{ fontSize: '0.85rem', color: 'rgba(37,70,65,0.6)', marginTop: 0 }}>
            Only your team sees these. The customer never does.
          </p>

          <form onSubmit={addNote} style={{ marginBottom: '1.5rem' }}>
            <textarea
              className="field"
              rows={3}
              placeholder="Called to confirm timings…"
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
            />
            <button className="button-primary" style={{ marginTop: '0.75rem' }} disabled={postingNote || !noteBody.trim()}>
              {postingNote ? 'Adding…' : 'Add note'}
            </button>
          </form>

          {notes.length === 0 ? (
            <p style={{ color: 'rgba(37,70,65,0.55)', fontSize: '0.9rem', margin: 0 }}>No notes yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {notes.map((n) => (
                <div key={n.id} style={{ backgroundColor: 'var(--blush)', borderRadius: '0.75rem', padding: '1rem' }}>
                  <p style={{ margin: '0 0 0.5rem', color: 'var(--ink)', whiteSpace: 'pre-line' }}>{n.body}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(37,70,65,0.55)' }}>
                    {who(n.users)} · {when(n.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Activity */}
        <section className="card">
          <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1rem' }}>History</h2>
          {activity.length === 0 ? (
            <p style={{ color: 'rgba(37,70,65,0.55)', fontSize: '0.9rem', margin: 0 }}>Nothing recorded yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.6rem' }}>
              {activity.map((a) => (
                <li key={a.id} style={{ fontSize: '0.88rem', color: 'rgba(37,70,65,0.8)' }}>
                  <strong style={{ color: 'var(--ink)' }}>{who(a.users)}</strong> {a.action}
                  {a.detail ? ` — ${a.detail}` : ''}
                  <span style={{ color: 'rgba(37,70,65,0.5)' }}> · {when(a.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function Line({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.35rem' }}>
      <span style={{ color: muted ? 'rgba(37,70,65,0.6)' : 'var(--ink)', fontWeight: bold ? 700 : 400, fontSize: '0.92rem' }}>{label}</span>
      <span style={{ color: muted ? 'rgba(37,70,65,0.6)' : 'var(--ink)', fontWeight: bold ? 700 : 400, fontSize: '0.92rem', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}
