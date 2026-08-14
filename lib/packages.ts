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
  /** A rate can belong to more than one booth — Completely Captured and the
   *  hourly packages run on either Oak or Mod, whichever the customer picked. */
  boothIds: BoothId[];
  label: string;
  /** Cents, excluding HST. */
  priceCents: number;
  note: string;
  badge?: string;
  /**
   * Hours of contiguous coverage, for rates with a simple start+duration
   * shape. Omitted for drop-off packages (a 14-hour window, not a booked
   * slot) and Completely Captured (two separate blocks with a gap between
   * them) — both need their own copy rather than a computed end time.
   */
  durationHours?: number;
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
  /** Restricts this add-on to specific booths. Omit for "available on any booth". */
  boothIds?: BoothId[];
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

/** Attendant-staffed hourly and package rates. Shared between Oak and Mod —
 *  both can run attendant mode; Snap is drop-off only. */
const ATTENDANT_BOOTHS: BoothId[] = ['oak', 'mod'];

/** Digital-only hourly rates are Mod-only — Oak's whole point is the physical
 *  print, so it never runs a digital-only slot. */
const DIGITAL_HOURLY_BOOTHS: BoothId[] = ['mod'];

export const rates: Rate[] = [
  {
    id: 'snap-digital-dropoff',
    boothIds: ['snap'],
    label: 'Digital Drop-off',
    priceCents: 60000,
    note: 'Up to 14 hours unlimited use — no attendant, no prints',
  },
  {
    id: 'oak-print-dropoff',
    boothIds: ['oak'],
    label: 'Print Drop-off',
    priceCents: 75000,
    note: 'Up to 14 hours unlimited use — no attendant, max 300 prints',
  },
  {
    id: 'completely-captured',
    boothIds: ATTENDANT_BOOTHS,
    label: 'Completely Captured',
    priceCents: 120000,
    note: '1.5 hrs cocktail hour plus 3 hrs reception — split coverage so there is never a line',
    badge: 'Best for weddings',
  },
  // Attendant-staffed hourly options — available on Oak or Mod.
  { id: '2h-digital', boothIds: DIGITAL_HOURLY_BOOTHS, label: '2 hours — digital only', priceCents: 60000, note: 'Staffed by an attendant', durationHours: 2 },
  { id: '2h-prints', boothIds: ATTENDANT_BOOTHS, label: '2 hours — with prints', priceCents: 80000, note: 'Staffed by an attendant, unlimited prints', durationHours: 2 },
  { id: '3h-digital', boothIds: DIGITAL_HOURLY_BOOTHS, label: '3 hours — digital only', priceCents: 75000, note: 'Staffed by an attendant', durationHours: 3 },
  { id: '3h-prints', boothIds: ATTENDANT_BOOTHS, label: '3 hours — with prints', priceCents: 95000, note: 'Staffed by an attendant, unlimited prints', durationHours: 3 },
  { id: '4h-digital', boothIds: DIGITAL_HOURLY_BOOTHS, label: '4 hours — digital only', priceCents: 90000, note: 'Staffed by an attendant', durationHours: 4 },
  { id: '4h-prints', boothIds: ATTENDANT_BOOTHS, label: '4 hours — with prints', priceCents: 110000, note: 'Staffed by an attendant, unlimited prints', durationHours: 4 },
];

/** Rendered as the hourly comparison table on the packages page. */
export const hourlyTable = [
  { duration: '2 hours', digital: '2h-digital', prints: '2h-prints' },
  { duration: '3 hours', digital: '3h-digital', prints: '3h-prints' },
  { duration: '4 hours', digital: '4h-digital', prints: '4h-prints' },
];

/**
 * Only add-ons Seven Events actually sells.
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
  {
    id: 'linen-guestbook',
    label: 'Linen photo guestbook',
    priceCents: 7500,
    note: 'A linen-bound book guests fill with a printed photo and a message. Needs a print package.',
    boothIds: ['oak', 'mod'],
  },
];

/**
 * Deposit taken online to hold the date. The balance is due 7 days before the
 * event and invoiced separately.
 */
export const DEPOSIT_PERCENT = 35;

/** HST. Shown on the site as "+ HST" and applied at invoicing. */
export const HST_PERCENT = 13;

export function getRate(rateId: string): Rate | undefined {
  return rates.find((r) => r.id === rateId);
}

export function getBooth(boothId: string): Booth | undefined {
  return booths.find((b) => b.id === boothId);
}

export function ratesForBooth(boothId: BoothId): Rate[] {
  return rates.filter((r) => r.boothIds.includes(boothId));
}

/** Add-ons sellable on this booth — everything with no boothIds restriction,
 *  plus anything explicitly scoped to it. */
export function addonsForBooth(boothId: BoothId): Addon[] {
  return addons.filter((a) => !a.boothIds || a.boothIds.includes(boothId));
}

/** The headline rate shown on a booth card — the first one defined for it. */
export function featuredRate(boothId: BoothId): Rate | undefined {
  return rates.find((r) => r.boothIds.includes(boothId));
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
 *
 * Returns null if the rate does not exist, does not belong to the given
 * booth, or any add-on does not belong to the given booth — e.g. the linen
 * guestbook on the digital-only Snap Booth. Travel fee is a separate,
 * optional add-in since it depends on an address, not a catalogue id.
 */
export function calculateTotals(
  rateId: string,
  addonIds: string[],
  boothId: BoothId,
  travelFeeCents = 0
) {
  const rate = getRate(rateId);
  if (!rate || !rate.boothIds.includes(boothId)) return null;

  const allowedAddonIds = new Set(addonsForBooth(boothId).map((a) => a.id));
  if (addonIds.some((id) => !allowedAddonIds.has(id))) return null;

  const chosenAddons = addonIds
    .map((id) => addons.find((a) => a.id === id))
    .filter((a): a is Addon => Boolean(a));

  const addonsCents = chosenAddons.reduce((sum, a) => sum + a.priceCents, 0);
  const subtotalCents = rate.priceCents + addonsCents + travelFeeCents;
  const hstCents = Math.round(subtotalCents * (HST_PERCENT / 100));
  const totalCents = subtotalCents + hstCents;
  const depositCents = Math.round(totalCents * (DEPOSIT_PERCENT / 100));

  return {
    rate,
    addons: chosenAddons,
    travelFeeCents,
    subtotalCents,
    hstCents,
    totalCents,
    depositCents,
  };
}
