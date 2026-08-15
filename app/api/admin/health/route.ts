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
    googleMaps: Boolean(process.env.GOOGLE_MAPS_API_KEY),
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
  const { error: travelColumnError } = await gate.db.from('events').select('travel_fee_cents').limit(1);

  // A present RESEND_API_KEY only proves someone typed something in — it says
  // nothing about whether the key is valid or a sending domain is verified.
  // Both those are why "Connected" earlier still meant zero emails going out.
  let resendStatus: 'unconfigured' | 'invalid_key' | 'no_verified_domain' | 'ready' = 'unconfigured';
  let resendDomains: { name: string; status: string }[] = [];

  if (checks.resend) {
    try {
      const res = await fetch('https://api.resend.com/domains', {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      });

      if (res.status === 401 || res.status === 403) {
        resendStatus = 'invalid_key';
      } else if (res.ok) {
        const data = await res.json();
        resendDomains = (data?.data ?? []).map((d: { name: string; status: string }) => ({
          name: d.name,
          status: d.status,
        }));
        resendStatus = resendDomains.some((d) => d.status === 'verified') ? 'ready' : 'no_verified_domain';
      } else {
        resendStatus = 'invalid_key';
      }
    } catch (err) {
      console.error('Could not reach Resend:', err);
      resendStatus = 'invalid_key';
    }
  }

  // The setup page's "Email sending" row should reflect whether email can
  // actually go out, not just whether a key was pasted in somewhere.
  checks.resend = resendStatus === 'ready';

  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (checks.stripeSecretKey && !checks.stripeWebhookSecret) {
    // Not a blocker: the success page verifies the session with Stripe and
    // confirms the deposit. The webhook only adds cover for the case where the
    // customer pays and never returns to the site.
    suggestions.push(
      'Payments are confirmed when the customer returns to the site after paying. Adding STRIPE_WEBHOOK_SECRET would also catch the rarer case where they pay and close the tab before coming back.'
    );
  }
  if (!checks.resend) {
    warnings.push('RESEND_API_KEY is missing — no booking emails will be sent.');
  } else if (resendStatus === 'invalid_key') {
    warnings.push('RESEND_API_KEY is set but Resend rejected it — check the key is correct and has not been revoked. No booking emails are sending.');
  } else if (resendStatus === 'no_verified_domain') {
    warnings.push(
      resendDomains.length === 0
        ? 'Resend has no sending domain added at all — noreply@seveneventsphotobooth.com cannot send until one is added and verified in the Resend dashboard.'
        : `Resend has a domain added (${resendDomains.map((d) => `${d.name}: ${d.status}`).join(', ')}) but none are verified yet — emails will not send until DNS verification completes.`
    );
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
  if (travelColumnError) {
    warnings.push('Migration 003 does not look applied: the travel fee columns are missing.');
  }
  if (!checks.googleMaps) {
    // Not a blocker: bookings outside the free radius still save, just with
    // no fee charged and travel_fee_needs_review set, ready for a manual check.
    suggestions.push(
      'GOOGLE_MAPS_API_KEY is not set, so travel fees are not calculated automatically. Bookings past the free 100 km radius are still saved, flagged for a manual check instead of being charged nothing silently.'
    );
  }

  return NextResponse.json({
    checks,
    resendDomains,
    stripeMode,
    migrations: {
      bookingSystem: !availabilityFnError,
      adminBackend: !notesTableError,
      travelFee: !travelColumnError,
    },
    warnings,
    suggestions,
    // Taking bookings needs the database and Stripe. Email, the webhook and
    // the travel fee lookup make it better but are not what stops a booking.
    ready: warnings.length === 0,
    canTakePayments: checks.stripeSecretKey && checks.supabaseServiceRole && !availabilityFnError,
  });
}
