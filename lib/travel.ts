/**
 * Distance-based travel fee.
 *
 * Free within 100 km driving distance of the shop. Beyond that, $2/km on the
 * distance over 100 km. Uses Google's Distance Matrix API for real driving
 * distance rather than straight-line distance, which would under-charge on
 * anywhere the road route is meaningfully longer than "as the crow flies".
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
};

export async function calculateTravelFee(destinationAddress: string): Promise<TravelFeeResult> {
  if (!isDistanceLookupConfigured() || !destinationAddress?.trim()) {
    return { distanceKm: null, feeCents: 0, needsReview: true };
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
    url.searchParams.set('origins', ORIGIN_ADDRESS);
    url.searchParams.set('destinations', destinationAddress);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('key', process.env.GOOGLE_MAPS_API_KEY!);

    const res = await fetch(url.toString());
    const data = await res.json();
    const element = data?.rows?.[0]?.elements?.[0];

    if (data.status !== 'OK' || !element || element.status !== 'OK') {
      console.error(
        'Distance Matrix could not resolve address:',
        destinationAddress,
        data.status,
        element?.status
      );
      return { distanceKm: null, feeCents: 0, needsReview: true };
    }

    const distanceKm = element.distance.value / 1000;
    const billableKm = Math.max(0, distanceKm - FREE_RADIUS_KM);
    const feeCents = Math.round(billableKm * RATE_PER_KM_CENTS);

    return { distanceKm, feeCents, needsReview: false };
  } catch (err) {
    console.error('Distance Matrix request failed:', err);
    return { distanceKm: null, feeCents: 0, needsReview: true };
  }
}
