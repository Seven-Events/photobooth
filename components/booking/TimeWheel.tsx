'use client';

import { useEffect, useRef } from 'react';

const ROW_HEIGHT = 40;
const VISIBLE_ROWS = 5;
const PADDING = (ROW_HEIGHT * (VISIBLE_ROWS - 1)) / 2;

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1); // 1–12
const MINUTES = ['00', '30']; // the only two stops — this is what enforces the 30-minute step
const PERIODS = ['AM', 'PM'] as const;

function to24(hour12: number, minute: string, period: 'AM' | 'PM'): string {
  let h = hour12 % 12;
  if (period === 'PM') h += 12;
  return `${String(h).padStart(2, '0')}:${minute}`;
}

function from24(value: string): { hour12: number; minute: string; period: 'AM' | 'PM' } {
  const [hh, mm] = value.split(':').map(Number);
  const period: 'AM' | 'PM' = hh >= 12 ? 'PM' : 'AM';
  let hour12 = hh % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute: mm >= 30 ? '30' : '00', period };
}

function WheelColumn<T extends string | number>({
  items,
  value,
  onChange,
  renderLabel,
}: {
  items: readonly T[];
  value: T;
  onChange: (v: T) => void;
  renderLabel: (v: T) => string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedIndex = items.indexOf(value);

  // Keep the wheel in sync when the value changes from outside (e.g. another
  // column's change recomputing the whole time), without fighting a scroll
  // the user is actively mid-gesture on.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = selectedIndex * ROW_HEIGHT;
    if (Math.abs(el.scrollTop - target) > 2) el.scrollTo({ top: target, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const idx = Math.min(items.length - 1, Math.max(0, Math.round(el.scrollTop / ROW_HEIGHT)));
      el.scrollTo({ top: idx * ROW_HEIGHT, behavior: 'smooth' });
      if (items[idx] !== value) onChange(items[idx]);
    }, 110);
  }

  function tap(idx: number) {
    scrollRef.current?.scrollTo({ top: idx * ROW_HEIGHT, behavior: 'smooth' });
    onChange(items[idx]);
  }

  return (
    <div style={{ position: 'relative', height: ROW_HEIGHT * VISIBLE_ROWS }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: PADDING,
          height: ROW_HEIGHT,
          border: '2px solid var(--clay)',
          borderRadius: '0.6rem',
          backgroundColor: 'rgba(229,139,130,0.1)',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="time-wheel-track"
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          paddingTop: PADDING,
          paddingBottom: PADDING,
        }}
      >
        {items.map((item, i) => {
          const distance = Math.abs(i - selectedIndex);
          return (
            <div
              key={String(item)}
              onClick={() => tap(i)}
              style={{
                height: ROW_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                color: 'var(--ink)',
                fontWeight: distance === 0 ? 700 : 500,
                fontSize: distance === 0 ? '1.05rem' : '0.9rem',
                opacity: distance === 0 ? 1 : distance === 1 ? 0.5 : 0.28,
                transition: 'opacity 0.15s ease',
              }}
            >
              {renderLabel(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * A scrollable hour / minute / AM-PM picker in the site's own style. The
 * minute wheel only ever has "00" and "30" to land on — unlike a native
 * <input type="time">, there is no off-increment value to scroll past, so
 * the 30-minute restriction holds regardless of browser quirks.
 */
export default function TimeWheel({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { hour12, minute, period } = from24(value);

  return (
    <div
      role="group"
      aria-label="Start time"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        backgroundColor: 'var(--cream)',
        border: '1px solid var(--line)',
        borderRadius: '0.85rem',
        padding: '0.75rem 0.5rem',
      }}
    >
      <div>
        <p style={{ textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(37,70,65,0.5)', fontWeight: 700, margin: '0 0 0.4rem' }}>
          Hour
        </p>
        <WheelColumn
          items={HOURS}
          value={hour12}
          onChange={(h) => onChange(to24(h, minute, period))}
          renderLabel={(h) => String(h)}
        />
      </div>
      <div>
        <p style={{ textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(37,70,65,0.5)', fontWeight: 700, margin: '0 0 0.4rem' }}>
          Minute
        </p>
        <WheelColumn
          items={MINUTES}
          value={minute}
          onChange={(m) => onChange(to24(hour12, m, period))}
          renderLabel={(m) => m}
        />
      </div>
      <div>
        <p style={{ textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(37,70,65,0.5)', fontWeight: 700, margin: '0 0 0.4rem' }}>
          AM / PM
        </p>
        <WheelColumn
          items={PERIODS}
          value={period}
          onChange={(p) => onChange(to24(hour12, minute, p))}
          renderLabel={(p) => p}
        />
      </div>
    </div>
  );
}
