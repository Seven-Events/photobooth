/**
 * The single source of truth for what Seven Events sells.
 *
 * The packages page, the booking form and the server-side price calculation all
 * read from here. Never hardcode a price or a feature list anywhere else — the
 * booth feature lists drifted apart once already and the Snap Booth silently
 * lost its DSLR line for weeks.
 *
 * All prices are in CENTS and exclude HST.
 */

export type BoothId = 'snap' | 'oak' | 'mod';

export type Rate = {
  id: string;
  boothId: BoothId;
  label: string;
  /** Cents, excluding HST. */
  priceCents: number;
  note: string;
  badge?: string;
};

export type Booth = {
  id: BoothId;
  name: string;
  slug: string;
  tagline: string;
  /** Matches the flat backdrop baked into the product shot so it blends in. */
  panelBg: string;
  /** Anything true of this booth but not the others. */
  extraFeatures?: string[];
};

export type Addon = {
  id: string;
  label: string;
  priceCents: number;
  note: string;
  /**
   * Set when the price is per unit rather than flat, e.g. 'hour'.
   *
   * Quantity is stored by repeating the id in the addon list — two hours of
   * early setup is ['early-setup', 'early-setup']. That keeps the database
   * column a plain text[] and means the price maths below needs no special
   * case: summing the list already multiplies correctly.
   */
  perUnit?: string;
  maxUnits?: number;
};

/** True of every booth. All three carry a DSLR body and studio lighting. */
export const sharedFeatures = [
  'Choice of premium backdrop',
  'Studio-quality DSLR photos',
  'Professional studio lighting',
  'Photos, videos and boomerangs',
  'Video guestbook',
  'Personalized image template',
  'Live gallery',
  'Instant sharing via text & email',
  'Free travel up to 100 km from Omemee',
];

export const booths: Booth[] = [
  {
    id: 'snap',
    name: 'Snap Booth',
    slug: 'snap-booth',
    tagline: 'Sleek, compact and fully self-serve.',
    panelBg: '#ede3db',
  },
  {
    id: 'oak',
    name: 'Oak Booth',
    slug: 'oak-booth',
    tagline: 'Warm wood styling on a hardwood tripod.',
    panelBg: '#ede3db',
  },
  {
    id: 'mod',
    name: 'Mod Booth',
    slug: 'mod-booth',
    tagline: 'Our full-service booth, staffed by an onsite attendant.',
    panelBg: '#ede3db',
    extraFeatures: ['Onsite attendant'],
  },
];

export const rates: Rate[] = [
  {
    id: 'snap-digital-dropoff',
    boothId: 'snap',
    label: 'Digital Drop-off',
    priceCents: 60000,
    note: 'Up to 14 hours unlimited use — no attendant, no prints',
  },
  {
    id: 'oak-print-dropoff',
    boothId: 'oak',
    label: 'Print Drop-off',
    priceCents: 75000,
    note: 'Up to 14 hours unlimited use — no attendant, max 300 prints',
  },
  {
    id: 'mod-completely-captured',
    boothId: 'mod',
    label: 'Completely Captured',
    priceCents: 120000,
    note: '1.5 hrs cocktail hour plus 3 hrs reception — split coverage so there is never a line',
    badge: 'Best for weddings',
  },
  // Attendant-staffed hourly options, Mod Booth only.
  { id: 'mod-2h-digital', boothId: 'mod', label: '2 hours — digital only', priceCents: 60000, note: 'Staffed by an attendant' },
  { id: 'mod-2h-prints', boothId: 'mod', label: '2 hours — with prints', priceCents: 80000, note: 'Staffed by an attendant, unlimited prints' },
  { id: 'mod-3h-digital', boothId: 'mod', label: '3 hours — digital only', priceCents: 75000, note: 'Staffed by an attendant' },
  { id: 'mod-3h-prints', boothId: 'mod', label: '3 hours — with prints', priceCents: 95000, note: 'Staffed by an attendant, unlimited prints' },
  { id: 'mod-4h-digital', boothId: 'mod', label: '4 hours — digital only', priceCents: 90000, note: 'Staffed by an attendant' },
  { id: 'mod-4h-prints', boothId: 'mod', label: '4 hours — with prints', priceCents: 110000, note: 'Staffed by an attendant, unlimited prints' },
];

/** Rendered as the hourly comparison table on the packages page. */
export const hourlyTable = [
  { duration: '2 hours', digital: 'mod-2h-digital', prints: 'mod-2h-prints' },
  { duration: '3 hours', digital: 'mod-3h-digital', prints: 'mod-3h-prints' },
  { duration: '4 hours', digital: 'mod-4h-digital', prints: 'mod-4h-prints' },
];

/**
 * Only add-ons Seven Events actually sells.
 *
 * Three placeholders (extra hour, premium backdrop, guest book) were removed
 * rather than left in — they were invented during the build and were never
 * confirmed as real products. Add any genuine ones back here.
 */
export const addons: Addon[] = [
  {
    id: 'early-setup',
    label: 'Early setup',
    priceCents: 7500,
    note: 'We normally arrive 45 minutes before your start time. Add hours to come in earlier.',
    perUnit: 'hour',
    maxUnits: 6,
  },
];

/**
 * Deposit taken online to hold the date. The balance is invoiced separately.
 * ASSUMPTION — confirm the rate with the owner before going live.
 */
export const DEPOSIT_PERCENT = 25;

/** HST. Shown on the site as "+ HST" and applied at invoicing. */
export const HST_PERCENT = 13;

export function getRate(rateId: string): Rate | undefined {
  return rates.find((r) => r.id === rateId);
}

export function getBooth(boothId: string): Booth | undefined {
  return booths.find((b) => b.id === boothId);
}

export function ratesForBooth(boothId: BoothId): Rate[] {
  return rates.filter((r) => r.boothId === boothId);
}

/** The headline rate shown on a booth card — the first one defined for it. */
export function featuredRate(boothId: BoothId): Rate | undefined {
  return rates.find((r) => r.boothId === boothId);
}

export function formatPrice(cents: number): string {
  // Whole dollars read better as "$600" than "$600.00", but anything with a
  // fractional part must show both decimals — a deposit of "$169.5" looks broken.
  const hasCents = cents % 100 !== 0;
  return (
    '$' +
    (cents / 100).toLocaleString('en-CA', {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Collapse a repeated add-on list into one row per add-on with a quantity,
 * for display. ['early-setup','early-setup'] becomes 2 × Early setup.
 */
export function groupAddons(addonIds: string[]) {
  const counts = new Map<string, number>();
  for (const id of addonIds) counts.set(id, (counts.get(id) ?? 0) + 1);

  return [...counts.entries()]
    .map(([id, qty]) => {
      const addon = addons.find((a) => a.id === id);
      if (!addon) return null;
      return { addon, qty, totalCents: addon.priceCents * qty };
    })
    .filter((x): x is { addon: Addon; qty: number; totalCents: number } => x !== null);
}

/**
 * Authoritative price calculation. The client shows a running total, but the
 * server recomputes from these ids — never trust a total sent by the browser.
 */
export function calculateTotals(rateId: string, addonIds: string[]) {
  const rate = getRate(rateId);
  if (!rate) return null;

  const chosenAddons = addonIds
    .map((id) => addons.find((a) => a.id === id))
    .filter((a): a is Addon => Boolean(a));

  const subtotalCents = rate.priceCents + chosenAddons.reduce((sum, a) => sum + a.priceCents, 0);
  const hstCents = Math.round(subtotalCents * (HST_PERCENT / 100));
  const totalCents = subtotalCents + hstCents;
  const depositCents = Math.round(totalCents * (DEPOSIT_PERCENT / 100));

  return { rate, addons: chosenAddons, subtotalCents, hstCents, totalCents, depositCents };
}
