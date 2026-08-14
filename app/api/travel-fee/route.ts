import { calculateTravelFee, isDistanceLookupConfigured } from '@/lib/travel';
import { NextResponse } from 'next/server';

/**
 * Live travel-fee preview while a customer is filling in the address —
 * without this they would only find out the fee after submitting. The
 * server-side calculation on actual submission is the authoritative one;
 * this is a preview only.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address || !address.trim()) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }

  const result = await calculateTravelFee(address);
  return NextResponse.json({ ...result, configured: isDistanceLookupConfigured() });
}
