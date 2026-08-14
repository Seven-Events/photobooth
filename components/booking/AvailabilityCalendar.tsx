'use client';

import { useEffect, useState } from 'react';
import type { BoothId } from '@/lib/packages';

function iso(y: number, m: number, day: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

type Props = {
  boothId: BoothId;
  value: string;
  onChange: (date: string) => void;
};

/**
 * Month-grid date picker for the public booking form. Greys out dates already
 * taken or blocked for the chosen booth, fetched fresh whenever the booth or
 * visible month changes — a plain <input type="date"> gave no hint a date was
 * gone until after the whole form was filled in and submitted.
 */
export default function AvailabilityCalendar({ boothId, value, onChange }: Props) {
  const [cursor, setCursor] = useState(() => new Date());
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const month = monthKey(cursor);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`/api/availability/month?month=${month}&booth=${boothId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setUnavailable(new Set<string>(d.unavailable ?? []));
      })
      .catch(() => {
        if (!cancelled) setUnavailable(new Set());
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [month, boothId]);

  const year = cursor.getFullYear();
  const m = cursor.getMonth();
  const firstWeekday = new Date(year, m, 1).getDay();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const todayIso = iso(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  return (
    <div
      style={{
        backgroundColor: 'var(--cream)',
        border: '1px solid var(--line)',
        borderRadius: '1rem',
        padding: '1rem',
        opacity: loading ? 0.6 : 1,
        transition: 'opacity 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, m - 1, 1))}
          aria-label="Previous month"
          style={{ background: 'none', border: 'none', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer', padding: '0.25rem 0.5rem' }}
        >
          ←
        </button>
        <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.9rem' }}>
          {cursor.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, m + 1, 1))}
          aria-label="Next month"
          style={{ background: 'none', border: 'none', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer', padding: '0.25rem 0.5rem' }}
        >
          →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(37,70,65,0.5)', fontWeight: 700, padding: '0.25rem 0' }}>
            {d}
          </div>
        ))}

        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = iso(year, m, day);
          const isPast = date < todayIso;
          const isTaken = unavailable.has(date);
          const disabled = isPast || isTaken;
          const isSelected = date === value;

          return (
            <button
              key={date}
              type="button"
              disabled={disabled}
              onClick={() => onChange(date)}
              title={isTaken ? 'Not available' : undefined}
              style={{
                aspectRatio: '1',
                borderRadius: '0.5rem',
                border: isSelected ? '2px solid var(--clay)' : '1px solid transparent',
                backgroundColor: isSelected ? 'rgba(229,139,130,0.16)' : disabled ? 'transparent' : 'var(--paper)',
                color: disabled ? 'rgba(37,70,65,0.3)' : 'var(--ink)',
                textDecoration: isTaken ? 'line-through' : 'none',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.85rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'rgba(37,70,65,0.55)', margin: '0.75rem 0 0' }}>
        Greyed-out dates are already booked or unavailable for this booth.
      </p>
    </div>
  );
}
