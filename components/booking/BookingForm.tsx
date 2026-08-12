'use client';

import { useMemo, useState } from 'react';
import {
  addons,
  booths,
  calculateTotals,
  formatPrice,
  ratesForBooth,
  type BoothId,
} from '@/lib/packages';

/** Today in YYYY-MM-DD, used to stop anyone booking a date in the past. */
function today(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function BookingForm() {
  const [boothId, setBoothId] = useState<BoothId>('mod');
  const [rateId, setRateId] = useState('mod-completely-captured');
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const boothRates = useMemo(() => ratesForBooth(boothId), [boothId]);
  const totals = useMemo(() => calculateTotals(rateId, addonIds), [rateId, addonIds]);

  function chooseBooth(id: BoothId) {
    setBoothId(id);
    // The current rate belongs to the old booth, so move to the new booth's first.
    const first = ratesForBooth(id)[0];
    if (first) setRateId(first.id);
  }

  function toggleAddon(id: string) {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          phone,
          eventDate,
          eventTime,
          eventTitle,
          boothId,
          rateId,
          addonIds,
          venue,
          guestCount: guestCount ? Number(guestCount) : undefined,
          specialRequests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      // Stripe configured → straight to hosted checkout. Otherwise the booking
      // was saved as a request and we show the confirmation page instead.
      window.location.href = data.checkoutUrl || `/book/received?id=${data.eventId}`;
    } catch {
      setError('We could not reach the server. Please check your connection and try again.');
      setSubmitting(false);
    }
  }

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: '1.5rem',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    marginBottom: '1.5rem',
  };

  const stepLabel: React.CSSProperties = {
    fontSize: '0.75rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--clay)',
    fontWeight: 700,
    marginBottom: '0.75rem',
    display: 'block',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 0 }}>
        {/* 1 — booth */}
        <fieldset style={sectionStyle}>
          <legend style={{ padding: 0 }}>
            <span style={stepLabel}>Step 1</span>
          </legend>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Pick your booth
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {booths.map((b) => {
              const selected = b.id === boothId;
              return (
                <label
                  key={b.id}
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    borderRadius: '1rem',
                    border: selected ? '2px solid var(--clay)' : '1px solid var(--line)',
                    backgroundColor: selected ? 'rgba(229,139,130,0.08)' : 'var(--cream)',
                    padding: '1rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="booth"
                    value={b.id}
                    checked={selected}
                    onChange={() => chooseBooth(b.id)}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  <div style={{ backgroundColor: b.panelBg, borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/booths/${b.slug}.webp`} alt="" style={{ height: '120px', width: 'auto', maxWidth: '100%', objectFit: 'contain', display: 'inline-block' }} />
                  </div>
                  <span style={{ display: 'block', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>{b.name}</span>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(37,70,65,0.7)' }}>{b.tagline}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 2 — package */}
        <fieldset style={sectionStyle}>
          <legend style={{ padding: 0 }}>
            <span style={stepLabel}>Step 2</span>
          </legend>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Choose a package
          </h2>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {boothRates.map((r) => {
              const selected = r.id === rateId;
              return (
                <label
                  key={r.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    borderRadius: '0.85rem',
                    border: selected ? '2px solid var(--clay)' : '1px solid var(--line)',
                    backgroundColor: selected ? 'rgba(229,139,130,0.08)' : 'var(--cream)',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <input
                    type="radio"
                    name="rate"
                    value={r.id}
                    checked={selected}
                    onChange={() => setRateId(r.id)}
                    style={{ marginTop: '0.3rem', accentColor: 'var(--clay)' }}
                  />
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: 'var(--ink)' }}>
                        {r.label}
                        {r.badge && (
                          <span className="pill" style={{ backgroundColor: 'var(--clay)', color: 'var(--ink)', marginLeft: '0.6rem', fontSize: '0.65rem' }}>
                            {r.badge}
                          </span>
                        )}
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--clay)', whiteSpace: 'nowrap' }}>
                        {formatPrice(r.priceCents)} + HST
                      </span>
                    </span>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(37,70,65,0.65)', marginTop: '0.35rem' }}>
                      {r.note}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 3 — add-ons */}
        <fieldset style={sectionStyle}>
          <legend style={{ padding: 0 }}>
            <span style={stepLabel}>Step 3 — optional</span>
          </legend>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Add-ons
          </h2>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {addons.map((a) => {
              const selected = addonIds.includes(a.id);
              return (
                <label
                  key={a.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    borderRadius: '0.85rem',
                    border: selected ? '2px solid var(--clay)' : '1px solid var(--line)',
                    backgroundColor: selected ? 'rgba(229,139,130,0.08)' : 'var(--cream)',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleAddon(a.id)}
                    style={{ marginTop: '0.3rem', accentColor: 'var(--clay)' }}
                  />
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{a.label}</span>
                      <span style={{ fontWeight: 700, color: 'var(--clay)', whiteSpace: 'nowrap' }}>
                        + {formatPrice(a.priceCents)}
                      </span>
                    </span>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(37,70,65,0.65)', marginTop: '0.35rem' }}>
                      {a.note}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 4 — event */}
        <fieldset style={sectionStyle}>
          <legend style={{ padding: 0 }}>
            <span style={stepLabel}>Step 4</span>
          </legend>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Your event
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="field-label" htmlFor="eventDate">Event date</label>
              <input id="eventDate" className="field" type="date" min={today()} value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            </div>
            <div>
              <label className="field-label" htmlFor="eventTime">Start time</label>
              <input id="eventTime" className="field" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
            </div>
            <div>
              <label className="field-label" htmlFor="eventTitle">Type of event</label>
              <input id="eventTitle" className="field" type="text" placeholder="Wedding, staff party, birthday…" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
            </div>
            <div>
              <label className="field-label" htmlFor="guestCount">Approx. guests</label>
              <input id="guestCount" className="field" type="number" min={1} placeholder="120" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="field-label" htmlFor="venue">Venue and town</label>
              <input id="venue" className="field" type="text" placeholder="The Barn at Sunset Ridge, Omemee" value={venue} onChange={(e) => setVenue(e.target.value)} />
              <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                Travel is free up to 100&nbsp;km from Omemee. We will let you know if your venue falls outside that.
              </p>
            </div>
          </div>
        </fieldset>

        {/* 5 — contact */}
        <fieldset style={sectionStyle}>
          <legend style={{ padding: 0 }}>
            <span style={stepLabel}>Step 5</span>
          </legend>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Your details
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="field-label" htmlFor="fullName">Full name</label>
              <input id="fullName" className="field" type="text" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="field-label" htmlFor="phone">Phone</label>
              <input id="phone" className="field" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input id="email" className="field" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="field-label" htmlFor="password">Create a password</label>
              <input id="password" className="field" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                At least 8 characters. This is how you sign in to design your print template and see your gallery.
              </p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="field-label" htmlFor="specialRequests">Anything else we should know?</label>
              <textarea id="specialRequests" className="field" rows={3} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
            </div>
          </div>
        </fieldset>

        {/* Summary */}
        <div
          style={{
            backgroundColor: 'var(--ink)',
            color: 'var(--cream)',
            borderRadius: '1.5rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', marginBottom: '1.5rem' }}>
            Your booking
          </h2>

          {totals ? (
            <>
              <Row label={totals.rate.label} value={formatPrice(totals.rate.priceCents)} />
              {totals.addons.map((a) => (
                <Row key={a.id} label={a.label} value={'+ ' + formatPrice(a.priceCents)} muted />
              ))}
              <Row label="HST" value={formatPrice(totals.hstCents)} muted />

              <div style={{ borderTop: '1px solid rgba(250,247,239,0.2)', margin: '1rem 0', paddingTop: '1rem' }}>
                <Row label="Total" value={formatPrice(totals.totalCents)} bold />
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(229,139,130,0.16)',
                  borderRadius: '0.85rem',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <Row label="Deposit due today" value={formatPrice(totals.depositCents)} bold accent />
                <p style={{ color: 'rgba(250,247,239,0.75)', fontSize: '0.82rem', margin: '0.5rem 0 0' }}>
                  Paid securely through Stripe to hold your date. The balance of{' '}
                  {formatPrice(totals.totalCents - totals.depositCents)} is invoiced closer to the event.
                </p>
              </div>
            </>
          ) : (
            <p style={{ color: 'rgba(250,247,239,0.75)' }}>Choose a package to see your total.</p>
          )}

          {error && (
            <p role="alert" style={{ color: '#ffb4a2', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !totals}
            className="button-primary"
            style={{ width: '100%' }}
          >
            {submitting ? 'Setting up your booking…' : 'Continue to deposit →'}
          </button>

          <p style={{ color: 'rgba(250,247,239,0.6)', fontSize: '0.8rem', margin: '1rem 0 0', textAlign: 'center' }}>
            We confirm every booking by email within 24 hours.
          </p>
        </div>
      </div>
    </form>
  );
}

function Row({ label, value, muted, bold, accent }: { label: string; value: string; muted?: boolean; bold?: boolean; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
      <span style={{ color: muted ? 'rgba(250,247,239,0.7)' : 'var(--cream)', fontWeight: bold ? 700 : 400, fontSize: bold ? '1.05rem' : '0.95rem' }}>
        {label}
      </span>
      <span
        style={{
          color: accent ? 'var(--clay)' : muted ? 'rgba(250,247,239,0.7)' : 'var(--cream)',
          fontWeight: bold ? 700 : 400,
          fontSize: bold ? '1.15rem' : '0.95rem',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
    </div>
  );
}
