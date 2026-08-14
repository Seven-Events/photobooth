import { createAdminClient } from '@/lib/supabase/admin';
import { sendBookingConfirmationEmail } from '@/lib/email';

/**
 * Mark a booking's deposit paid, once.
 *
 * Two things call this: Stripe's webhook, and the success page the customer
 * lands on. Either alone is imperfect — a webhook needs configuring, and the
 * success page only runs if the customer actually comes back — so both are
 * wired up and whichever arrives first wins.
 *
 * The `.eq('deposit_status', 'unpaid')` filter is what makes that safe: the
 * second caller updates nothing and no duplicate email goes out.
 */
export async function confirmDeposit(eventId: string): Promise<'confirmed' | 'already' | 'failed'> {
  const db = createAdminClient();

  const { data: booking, error } = await db
    .from('events')
    .update({ deposit_status: 'paid', status: 'pending' })
    .eq('id', eventId)
    .eq('deposit_status', 'unpaid')
    .select('*, users(email, full_name)')
    .maybeSingle();

  if (error) {
    console.error('Could not mark deposit paid:', error);
    return 'failed';
  }

  // No row came back, so someone else already confirmed it.
  if (!booking) return 'already';

  const customer = booking.users as { email?: string; full_name?: string } | null;

  if (customer?.email) {
    await sendBookingConfirmationEmail({
      email: customer.email,
      name: customer.full_name || 'there',
      eventDate: booking.event_date,
      eventTime: booking.event_time,
      packageLabel: booking.rate_id,
      depositCents: booking.deposit_cents,
      balanceCents: booking.total_cents - booking.deposit_cents,
    });
  }

  return 'confirmed';
}
