/**
 * Distance-based travel fee.
 *
 * Free within 100 km driving distance of the shop. Beyond that, $2/km on the
 * distance over 100 km. Uses Google's Routes API (computeRouteMatrix) for
 * real driving distance rather than straight-line distance, which would
 * under-charge on anywhere the road route is meaningfully longer than "as
 * the crow flies". The older Distance Matrix API is not an option here —
 * Google now treats it as legacy and does not enable it for new Cloud
 * projects, actively pointing callers at Routes API instead.
 *
 * Optional at runtime, the same way Stripe is: without GOOGLE_MAPS_API_KEY set,
 * no fee is charged and the booking is flagged for a human to check the
 * address and, if needed, invoice the difference — rather than blocking a
 * booking, or silently undercharging without anyone knowing to look.
 */

const ORIGIN_ADDRESS = '4441 Highway 7, Omemee, ON, Canada';
const FREE_RADIUS_KM = 100;
const RATE_PER_KM_CENTS = 200; // $2.00/km

export function isDistanceLookupConfigured(): boolean {
  return Boolean(process.env.GOOGLE_MAPS_API_KEY);
}

export type TravelFeeResult = {
  distanceKm: number | null;
  feeCents: number;
  /** True when the distance could not be determined — the fee is $0 and a
   *  human needs to check the address and invoice any difference by hand. */
  needsReview: boolean;
  /** Google's own status string when the lookup failed, e.g. "REQUEST_DENIED"
   *  — not shown to customers, just enough to diagnose a misconfigured key
   *  without needing to dig through server logs. */
  reason?: string;
};

export async function calculateTravelFee(destinationAddress: string): Promise<TravelFeeResult> {
  if (!isDistanceLookupConfigured() || !destinationAddress?.trim()) {
    return { distanceKm: null, feeCents: 0, needsReview: true };
  }

  try {
    const res = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY!,
        // Only ask for what we use — Routes API bills/limits by field mask size.
        'X-Goog-FieldMask': 'originIndex,destinationIndex,status,condition,distanceMeters',
      },
      body: JSON.stringify({
        origins: [{ waypoint: { address: ORIGIN_ADDRESS } }],
        destinations: [{ waypoint: { address: destinationAddress } }],
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE',
      }),
    });

    const data = await res.json();

    // A single origin/destination pair still comes back as an array with one
    // element (or zero, if the address could not be routed at all).
    const element = Array.isArray(data) ? data[0] : undefined;
    const errorMessage = !Array.isArray(data) ? data?.error?.message : undefined;

    if (!res.ok || errorMessage || !element || element.condition !== 'ROUTE_EXISTS' || typeof element.distanceMeters !== 'number') {
      const reason =
        errorMessage ||
        element?.status?.message ||
        element?.condition ||
        (!res.ok ? `HTTP ${res.status}: ${JSON.stringify(data).slice(0, 300)}` : 'unknown error');
      console.error('Routes API could not resolve address:', destinationAddress, reason);
      return { distanceKm: null, feeCents: 0, needsReview: true, reason };
    }

    const distanceKm = element.distanceMeters / 1000;
    const billableKm = Math.max(0, distanceKm - FREE_RADIUS_KM);
    const feeCents = Math.round(billableKm * RATE_PER_KM_CENTS);

    return { distanceKm, feeCents, needsReview: false };
  } catch (err) {
    console.error('Routes API request failed:', err);
    return { distanceKm: null, feeCents: 0, needsReview: true, reason: 'request failed' };
  }
}
