import { requireAdminApi } from '@/lib/admin-api';
import { NextResponse } from 'next/server';

/**
 * Which integrations are actually configured.
 *
 * Booleans only — never echo a key, or a fragment of one. Admin-gated because
 * even knowing which services are wired up is not public information.
 */
export async function GET() {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const checks = {
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    resend: Boolean(process.env.RESEND_API_KEY),
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  };

  // Test vs live is worth surfacing: taking real money on test keys silently
  // fails, and taking test money on live keys is worse.
  const stripeMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
    ? 'live'
    : process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')
      ? 'test'
      : null;

  // Does the database have the migrations applied?
  const { error: availabilityFnError } = await gate.db.rpc('is_booth_available', {
    check_date: '2000-01-01',
    check_booth: 'mod',
  });

  const { error: notesTableError } = await gate.db.from('booking_notes').select('id').limit(1);

  const warnings: string[] = [];
  if (checks.stripeSecretKey && !checks.stripeWebhookSecret) {
    warnings.push(
      'Stripe can take payments but nothing confirms them: STRIPE_WEBHOOK_SECRET is missing, so bookings will stay stuck on "awaiting deposit" even after a customer pays.'
    );
  }
  if (!checks.resend) {
    warnings.push('RESEND_API_KEY is missing — no booking emails will be sent.');
  }
  if (!checks.siteUrl) {
    warnings.push('NEXT_PUBLIC_SITE_URL is missing — Stripe return links and email links may point at the wrong place.');
  }
  if (availabilityFnError) {
    warnings.push('Migration 002 does not look applied: is_booth_available() is missing, so double-booking is not prevented.');
  }
  if (notesTableError) {
    warnings.push('Migration 002 does not look applied: the booking_notes table is missing.');
  }

  return NextResponse.json({
    checks,
    stripeMode,
    migrations: {
      bookingSystem: !availabilityFnError,
      adminBackend: !notesTableError,
    },
    warnings,
    ready: warnings.length === 0,
  });
}
