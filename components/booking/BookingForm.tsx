'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addonsForBooth,
  booths,
  calculateTotals,
  DEPOSIT_PERCENT,
  formatPrice,
  getRate,
  groupAddons,
  ratesForBooth,
  type BoothId,
} from '@/lib/packages';
import { addHoursToTime, daysBeforeDisplay, formatTime } from '@/lib/time';
import AvailabilityCalendar from './AvailabilityCalendar';
import TimeWheel from './TimeWheel';

type TravelPreview = {
  feeCents: number;
  distanceKm: number | null;
  needsReview: boolean;
  configured: boolean;
};

const PROVINCES = [
  { code: 'ON', label: 'Ontario' },
  { code: 'QC', label: 'Quebec' },
  { code: 'NS', label: 'Nova Scotia' },
  { code: 'NB', label: 'New Brunswick' },
  { code: 'MB', label: 'Manitoba' },
  { code: 'BC', label: 'British Columbia' },
  { code: 'PE', label: 'Prince Edward Island' },
  { code: 'SK', label: 'Saskatchewan' },
  { code: 'AB', label: 'Alberta' },
  { code: 'NL', label: 'Newfoundland and Labrador' },
  { code: 'NT', label: 'Northwest Territories' },
  { code: 'NU', label: 'Nunavut' },
  { code: 'YT', label: 'Yukon' },
];

export default function BookingForm() {
  const [boothId, setBoothId] = useState<BoothId>('mod');
  const [rateId, setRateId] = useState('completely-captured');
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const [eventDate, setEventDate] = useState('');
  // TimeWheel always has something centered — there is no "empty" state for
  // a scroll wheel — so this starts on a plausible evening-event time rather
  // than blank.
  const [eventTime, setEventTime] = useState('18:00');
  const [eventTitle, setEventTitle] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('ON');
  const [postalCode, setPostalCode] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [availability, setAvailability] = useState<'unknown' | 'checking' | 'free' | 'taken'>('unknown');
  const [travel, setTravel] = useState<TravelPreview | null>(null);
  const [travelLoading, setTravelLoading] = useState(false);

  const boothRates = useMemo(() => ratesForBooth(boothId), [boothId]);
  const boothAddons = useMemo(() => addonsForBooth(boothId), [boothId]);
  const selectedRate = useMemo(() => getRate(rateId), [rateId]);

  // One line for the travel-fee lookup and for storage — the four fields are
  // just for a cleaner form, the rest of the app still deals in one address.
  const venue = useMemo(() => {
    const parts = [addressLine1.trim(), city.trim()].filter(Boolean);
    const provincePostal = [province.trim(), postalCode.trim()].filter(Boolean).join(' ');
    if (provincePostal) parts.push(provincePostal);
    return parts.join(', ');
  }, [addressLine1, city, province, postalCode]);
  const addressComplete = Boolean(addressLine1.trim() && city.trim() && postalCode.trim());

  const totals = useMemo(
    () => calculateTotals(rateId, addonIds, boothId, travel?.feeCents ?? 0),
    [rateId, addonIds, boothId, travel]
  );

  const endTime = useMemo(() => {
    if (!eventTime || !selectedRate?.durationHours) return null;
    return addHoursToTime(eventTime, selectedRate.durationHours);
  }, [eventTime, selectedRate]);

  // Tell people the date is gone while they are still choosing, rather than
  // after they have filled in the whole form. The server checks again on submit.
  useEffect(() => {
    if (!eventDate) {
      setAvailability('unknown');
      return;
    }

    let cancelled = false;
    setAvailability('checking');

    fetch(`/api/availability?date=${eventDate}&booth=${boothId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setAvailability(d.available ? 'free' : 'taken');
      })
      .catch(() => {
        if (!cancelled) setAvailability('unknown');
      });

    return () => {
      cancelled = true;
    };
  }, [eventDate, boothId]);

  // Live travel-fee preview, debounced so it does not fire on every keystroke.
  useEffect(() => {
    if (!addressComplete) {
      setTravel(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      setTravelLoading(true);
      fetch(`/api/travel-fee?address=${encodeURIComponent(venue)}`)
        .then((r) => r.json())
        .then((d) => {
          if (!cancelled) setTravel(d);
        })
        .catch(() => {
          if (!cancelled) setTravel(null);
        })
        .finally(() => {
          if (!cancelled) setTravelLoading(false);
        });
    }, 800);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [venue, addressComplete]);

  function chooseBooth(id: BoothId) {
    setBoothId(id);
    // The current rate and any booth-restricted add-ons belong to the old
    // booth, so move to the new booth's first rate and drop anything that no
    // longer applies — e.g. the linen guestbook is not valid on Snap.
    const first = ratesForBooth(id)[0];
    if (first) setRateId(first.id);
    const validAddonIds = new Set(addonsForBooth(id).map((a) => a.id));
    setAddonIds((prev) => prev.filter((a) => validAddonIds.has(a)));
  }

  function toggleAddon(id: string) {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  /** Quantity is stored as repeated ids — see the note in lib/packages.ts. */
  function setAddonQty(id: string, qty: number) {
    setAddonIds((prev) => [...prev.filter((a) => a !== id), ...Array(Math.max(0, qty)).fill(id)]);
  }

  function addonQty(id: string) {
    return addonIds.filter((a) => a === id).length;
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
        setError([data.error || 'Something went wrong. Please try again.', data.detail].filter(Boolean).join(' — '));
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

  const dueDate = daysBeforeDisplay(eventDate, 7);

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
        {boothAddons.length > 0 && (
          <fieldset style={sectionStyle}>
            <legend style={{ padding: 0 }}>
              <span style={stepLabel}>Step 3 — optional</span>
            </legend>
            <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
              Add-ons
            </h2>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {boothAddons.map((a) => {
                const qty = addonQty(a.id);
                const selected = qty > 0;

                const header = (
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{a.label}</span>
                      <span style={{ fontWeight: 700, color: 'var(--clay)', whiteSpace: 'nowrap' }}>
                        + {formatPrice(a.priceCents)}
                        {a.perUnit ? ` / ${a.perUnit}` : ''}
                      </span>
                    </span>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(37,70,65,0.65)', marginTop: '0.35rem' }}>
                      {a.note}
                    </span>
                  </span>
                );

                const boxStyle: React.CSSProperties = {
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  borderRadius: '0.85rem',
                  border: selected ? '2px solid var(--clay)' : '1px solid var(--line)',
                  backgroundColor: selected ? 'rgba(229,139,130,0.08)' : 'var(--cream)',
                  padding: '1rem 1.25rem',
                };

                // Per-unit add-ons get a quantity picker instead of a checkbox —
                // "$75 / hour" is meaningless without a number of hours.
                if (a.perUnit) {
                  return (
                    <div key={a.id} style={{ ...boxStyle, flexWrap: 'wrap' }}>
                      {header}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <label className="field-label" htmlFor={`qty-${a.id}`} style={{ margin: 0 }}>
                          {a.perUnit}s
                        </label>
                        <select
                          id={`qty-${a.id}`}
                          className="field"
                          style={{ width: 'auto', padding: '0.5rem 0.75rem' }}
                          value={qty}
                          onChange={(e) => setAddonQty(a.id, Number(e.target.value))}
                        >
                          {Array.from({ length: (a.maxUnits ?? 4) + 1 }).map((_, n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        {qty > 0 && (
                          <span style={{ fontWeight: 700, color: 'var(--clay)', whiteSpace: 'nowrap' }}>
                            {formatPrice(a.priceCents * qty)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <label key={a.id} style={{ ...boxStyle, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleAddon(a.id)}
                      style={{ marginTop: '0.3rem', accentColor: 'var(--clay)' }}
                    />
                    {header}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* 4 — event */}
        <fieldset style={sectionStyle}>
          <legend style={{ padding: 0 }}>
            <span style={stepLabel}>Step 4</span>
          </legend>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Your event
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="field-label">Event date</label>
              <AvailabilityCalendar boothId={boothId} value={eventDate} onChange={setEventDate} />
              {availability === 'checking' && (
                <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                  Checking that date…
                </p>
              )}
              {availability === 'free' && eventDate && (
                <p style={{ fontSize: '0.8rem', color: '#3c5a2b', fontWeight: 600, margin: '0.5rem 0 0' }}>
                  ✓ {eventDate} is available
                </p>
              )}
              {availability === 'taken' && (
                <p role="alert" style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 600, margin: '0.5rem 0 0' }}>
                  That date just got taken for this booth — pick another date, or another booth.
                </p>
              )}
            </div>

            <div>
              <span className="field-label">Start time</span>
              <TimeWheel value={eventTime} onChange={setEventTime} />

              {selectedRate?.durationHours ? (
                endTime ? (
                  <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.65)', margin: '0.5rem 0 0' }}>
                    Ends around {formatTime(endTime.time)}
                    {endTime.nextDay ? ' (next day)' : ''} — {selectedRate.durationHours} hours of coverage
                  </p>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                    {selectedRate.durationHours} hours of coverage from your start time
                  </p>
                )
              ) : selectedRate?.id === 'completely-captured' ? (
                <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                  1.5 hrs cocktail hour, then 3 hrs at the reception — we will confirm exact timing with your venue
                </p>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.5rem 0 0' }}>
                  Booth is yours for up to 14 hours from this time
                </p>
              )}
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
              <label className="field-label" htmlFor="addressLine1">Address line 1</label>
              <input
                id="addressLine1"
                className="field"
                type="text"
                autoComplete="address-line1"
                placeholder="123 Main St"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="city">City</label>
              <input
                id="city"
                className="field"
                type="text"
                autoComplete="address-level2"
                placeholder="Lindsay"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="province">Province</label>
              <select
                id="province"
                className="field"
                autoComplete="address-level1"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              >
                {PROVINCES.map((p) => (
                  <option key={p.code} value={p.code}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="postalCode">Postal code</label>
              <input
                id="postalCode"
                className="field"
                type="text"
                autoComplete="postal-code"
                placeholder="K9V 1A1"
                pattern="^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$"
                title="A Canadian postal code, e.g. K9V 1A1"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                required
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: 0 }}>
                {travelLoading
                  ? 'Checking the distance…'
                  : travel?.configured && !travel.needsReview
                    ? travel.feeCents > 0
                      ? `${travel.distanceKm ? Math.round(travel.distanceKm) : '?'} km from Omemee — a travel fee applies beyond the free 100 km radius, shown in your total.`
                      : 'Within the free 100 km travel radius from Omemee ✓'
                    : 'Free travel up to 100 km from Omemee. We will confirm the exact address and any travel fee with you.'}
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
              {groupAddons(addonIds).map(({ addon, qty, totalCents }) => (
                <Row
                  key={addon.id}
                  label={qty > 1 ? `${addon.label} × ${qty}` : addon.label}
                  value={'+ ' + formatPrice(totalCents)}
                  muted
                />
              ))}
              {totals.travelFeeCents > 0 && (
                <Row label="Travel fee" value={'+ ' + formatPrice(totals.travelFeeCents)} muted />
              )}

              <div style={{ borderTop: '1px solid rgba(250,247,239,0.2)', margin: '1rem 0', paddingTop: '1rem' }}>
                <Row label="Subtotal" value={formatPrice(totals.subtotalCents)} />
                <Row label="HST" value={formatPrice(totals.hstCents)} muted />
              </div>

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
                <Row label={`${DEPOSIT_PERCENT}% deposit due today`} value={formatPrice(totals.depositCents)} bold accent />
                <p style={{ color: 'rgba(250,247,239,0.75)', fontSize: '0.82rem', margin: '0.5rem 0 0' }}>
                  Paid securely through Stripe to hold your date. The balance of{' '}
                  {formatPrice(totals.totalCents - totals.depositCents)} is due{' '}
                  {dueDate ? `by ${dueDate}` : '7 days before your event'}.
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
            disabled={submitting || !totals || availability === 'taken'}
            className="button-primary"
            style={{ width: '100%' }}
          >
            {submitting
              ? 'Setting up your booking…'
              : availability === 'taken'
                ? 'That date is taken'
                : 'Continue to deposit →'}
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
