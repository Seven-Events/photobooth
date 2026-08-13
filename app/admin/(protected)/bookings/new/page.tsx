'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { addons, booths, calculateTotals, formatPrice, ratesForBooth, type BoothId } from '@/lib/packages';

export default function NewBookingPage() {
  const [boothId, setBoothId] = useState<BoothId>('mod');
  const [rateId, setRateId] = useState('mod-completely-captured');
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [overrideSubtotal, setOverrideSubtotal] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    eventTitle: '',
    venue: '',
    guestCount: '',
    specialRequests: '',
    status: 'pending',
    depositStatus: 'unpaid',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const boothRates = useMemo(() => ratesForBooth(boothId), [boothId]);
  const standard = useMemo(() => calculateTotals(rateId, addonIds), [rateId, addonIds]);

  // Mirror the server: an override replaces the subtotal, and tax and deposit
  // are recalculated from it.
  const totals = useMemo(() => {
    if (!standard) return null;
    if (overrideSubtotal === '') return standard;
    const subtotalCents = Math.round(Number(overrideSubtotal) * 100);
    if (!Number.isFinite(subtotalCents) || subtotalCents < 0) return standard;
    const hstCents = Math.round(subtotalCents * 0.13);
    const totalCents = subtotalCents + hstCents;
    return { ...standard, subtotalCents, hstCents, totalCents, depositCents: Math.round(totalCents * 0.25) };
  }, [standard, overrideSubtotal]);

  function chooseBooth(id: BoothId) {
    setBoothId(id);
    const first = ratesForBooth(id)[0];
    if (first) setRateId(first.id);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/admin/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, boothId, rateId, addonIds, overrideSubtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not save the booking.');
        setSaving(false);
        return;
      }
      window.location.href = `/admin/bookings/${data.booking.id}`;
    } catch {
      setError('Could not reach the server.');
      setSaving(false);
    }
  }

  const card: React.CSSProperties = { marginBottom: '1.5rem' };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.25rem',
  };

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <Link href="/admin/bookings" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
          ← All bookings
        </Link>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: 'var(--ink)', margin: '1rem 0 0.5rem' }}>
          Add a booking
        </h1>
        <p style={{ color: 'rgba(37,70,65,0.7)', marginBottom: '2rem' }}>
          For enquiries that came in by phone, DM or in person. No password is set — the customer can
          claim their account later using “forgot password”.
        </p>

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={submit}>
          <section className="card" style={card}>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Customer</h2>
            <div style={grid}>
              <div>
                <label className="field-label" htmlFor="fullName">Full name</label>
                <input id="fullName" className="field" required value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" className="field" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="field-label" htmlFor="phone">Phone</label>
                <input id="phone" className="field" type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.75rem 0 0' }}>
              If this email already exists, the booking is attached to that customer rather than
              creating a duplicate.
            </p>
          </section>

          <section className="card" style={card}>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Booth and package</h2>

            <div style={{ ...grid, marginBottom: '1.25rem' }}>
              <div>
                <label className="field-label" htmlFor="booth">Booth</label>
                <select id="booth" className="field" value={boothId}
                  onChange={(e) => chooseBooth(e.target.value as BoothId)}>
                  {booths.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="rate">Package</label>
                <select id="rate" className="field" value={rateId} onChange={(e) => setRateId(e.target.value)}>
                  {boothRates.map((r) => (
                    <option key={r.id} value={r.id}>{r.label} — {formatPrice(r.priceCents)}</option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="field-label" style={{ padding: 0 }}>Add-ons</legend>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {addons.map((a) => {
                  const qty = addonIds.filter((x) => x === a.id).length;

                  if (a.perUnit) {
                    return (
                      <div key={a.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.92rem', color: 'var(--ink)', flexWrap: 'wrap' }}>
                        <select
                          className="field"
                          style={{ width: 'auto', padding: '0.4rem 0.6rem' }}
                          value={qty}
                          onChange={(e) => {
                            const n = Number(e.target.value);
                            setAddonIds((prev) => [...prev.filter((x) => x !== a.id), ...Array(n).fill(a.id)]);
                          }}
                        >
                          {Array.from({ length: (a.maxUnits ?? 4) + 1 }).map((_, n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        {a.label} — {formatPrice(a.priceCents)} / {a.perUnit}
                        {qty > 0 && (
                          <strong style={{ color: 'var(--clay)' }}>{formatPrice(a.priceCents * qty)}</strong>
                        )}
                      </div>
                    );
                  }

                  return (
                    <label key={a.id} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.92rem', color: 'var(--ink)' }}>
                      <input
                        type="checkbox"
                        checked={qty > 0}
                        style={{ accentColor: 'var(--clay)' }}
                        onChange={() =>
                          setAddonIds((prev) => prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id])
                        }
                      />
                      {a.label} — {formatPrice(a.priceCents)}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div style={{ marginTop: '1.5rem' }}>
              <label className="field-label" htmlFor="override">Override price (optional)</label>
              <input
                id="override"
                className="field"
                type="number"
                min={0}
                step="0.01"
                placeholder={standard ? (standard.subtotalCents / 100).toFixed(2) : ''}
                value={overrideSubtotal}
                onChange={(e) => setOverrideSubtotal(e.target.value)}
              />
              <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                Before HST. Leave blank to use the published price. HST and the deposit recalculate
                from whatever you enter.
              </p>
            </div>
          </section>

          <section className="card" style={card}>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Event</h2>
            <div style={grid}>
              <div>
                <label className="field-label" htmlFor="eventDate">Date</label>
                <input id="eventDate" className="field" type="date" required value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
              </div>
              <div>
                <label className="field-label" htmlFor="eventTime">Start time</label>
                <input id="eventTime" className="field" type="time" required value={form.eventTime}
                  onChange={(e) => setForm({ ...form, eventTime: e.target.value })} />
              </div>
              <div>
                <label className="field-label" htmlFor="eventTitle">Type of event</label>
                <input id="eventTitle" className="field" required placeholder="Wedding, staff party…"
                  value={form.eventTitle} onChange={(e) => setForm({ ...form, eventTitle: e.target.value })} />
              </div>
              <div>
                <label className="field-label" htmlFor="guestCount">Guests</label>
                <input id="guestCount" className="field" type="number" min={0} value={form.guestCount}
                  onChange={(e) => setForm({ ...form, guestCount: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="field-label" htmlFor="venue">Venue</label>
                <input id="venue" className="field" value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="field-label" htmlFor="specialRequests">Notes from the customer</label>
                <textarea id="specialRequests" className="field" rows={3} value={form.specialRequests}
                  onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="card" style={card}>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Status</h2>
            <div style={grid}>
              <div>
                <label className="field-label" htmlFor="status">Booking status</label>
                <select id="status" className="field" value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="pending">Pending confirmation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="depositStatus">Deposit</label>
                <select id="depositStatus" className="field" value={form.depositStatus}
                  onChange={(e) => setForm({ ...form, depositStatus: e.target.value })}>
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          </section>

          {totals && (
            <section className="card" style={{ ...card, backgroundColor: 'var(--ink)', color: 'var(--cream)' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '1rem' }}>Total</h2>
              <Row label="Subtotal" value={formatPrice(totals.subtotalCents)} />
              <Row label="HST" value={formatPrice(totals.hstCents)} muted />
              <Row label="Total" value={formatPrice(totals.totalCents)} bold />
              <Row label="Deposit" value={formatPrice(totals.depositCents)} accent />
            </section>
          )}

          <button type="submit" className="button-primary" disabled={saving} style={{ width: '100%' }}>
            {saving ? 'Saving…' : 'Create booking'}
          </button>
        </form>
      </div>
    </main>
  );
}

function Row({ label, value, muted, bold, accent }: { label: string; value: string; muted?: boolean; bold?: boolean; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem' }}>
      <span style={{ color: muted ? 'rgba(250,247,239,0.7)' : 'var(--cream)', fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ color: accent ? 'var(--clay)' : muted ? 'rgba(250,247,239,0.7)' : 'var(--cream)', fontWeight: bold || accent ? 700 : 400, whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}
