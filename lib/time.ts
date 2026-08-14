/**
 * Adds `hours` to a 24-hour "HH:MM" time string. Wraps past midnight and
 * reports whether it rolled into the next day, e.g. 23:00 + 3h -> 02:00, next day.
 */
export function addHoursToTime(time: string, hours: number): { time: string; nextDay: boolean } | null {
  if (!/^\d{2}:\d{2}$/.test(time)) return null;

  const [h, m] = time.split(':').map(Number);
  const totalMinutes = h * 60 + m + hours * 60;
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const nextDay = totalMinutes >= 1440;
  const outH = Math.floor(wrapped / 60);
  const outM = wrapped % 60;

  return { time: `${String(outH).padStart(2, '0')}:${String(outM).padStart(2, '0')}`, nextDay };
}

/** Formats a 24-hour "HH:MM" string as e.g. "6:30 PM". */
export function formatTime(time: string): string {
  if (!/^\d{2}:\d{2}$/.test(time)) return time;
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * A date `days` before a "YYYY-MM-DD" event date, formatted for display.
 * Used for the balance-due date shown on the booking form and in the
 * confirmation email — kept in one place so the two can never disagree.
 */
export function daysBeforeDisplay(eventDate: string, days: number): string | null {
  if (!eventDate) return null;
  const d = new Date(eventDate + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() - days);
  return d.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
}
