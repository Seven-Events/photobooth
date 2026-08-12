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

export const addons: Addon[] = [
  { id: 'extra-hour', label: 'Extra hour', priceCents: 15000, note: 'Added to any attendant-staffed package' },
  { id: 'premium-backdrop', label: 'Premium backdrop', priceCents: 15000, note: 'Custom design built around your theme' },
  { id: 'guest-book', label: 'Physical guest book', priceCents: 10000, note: 'Prints mounted with space for guest messages' },
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
