# Turning on the booking system

Two things must happen before the form can take a deposit and calculate real
travel fees. Until then it still works in a reduced way — see each section.

## 1. Run the database migrations

Supabase dashboard → **SQL Editor** → New query → paste the contents of each
file below, in order → **Run**. Safe to run more than once.

1. `supabase/migrations/001_booking_system.sql` — booking fields, deposit
   status, row level security
2. `supabase/migrations/002_admin_backend.sql` — notes, activity log, blocked
   dates, availability check
3. `supabase/migrations/003_travel_fee.sql` — travel fee columns

**Until 001 runs, every booking attempt fails outright** — the form posts
columns that do not exist yet. 002 and 003 add features that degrade
gracefully if skipped (no double-booking protection, no travel fee) rather
than breaking bookings entirely, but should still be run.

## 2. Add the Stripe keys

1. Stripe dashboard → **Developers → API keys** → copy the **Secret key**
   - Use the **test** key (`sk_test_…`) first
2. Vercel → project → **Settings → Environment Variables**, add:
   - `STRIPE_SECRET_KEY`
3. Redeploy

Without this, the form still saves bookings and emails you — it just skips
the payment step and asks the customer to wait for you to confirm and
arrange the deposit manually.

**The webhook is optional, not required.** The success page verifies payment
directly with Stripe when the customer returns to the site, which is enough
to confirm a deposit on its own. Adding a webhook (Stripe → **Developers →
Webhooks** → endpoint `/api/stripe/webhook`, event
`checkout.session.completed`, secret as `STRIPE_WEBHOOK_SECRET`) adds cover
for the rarer case where someone pays and closes the tab before returning.

## 3. Add a Google Maps API key, for the travel fee

Free within 100 km of the shop; $2/km beyond that, calculated from real
driving distance via Google's Routes API. (Not the older Distance Matrix
API — Google treats that as legacy and does not enable it for new Cloud
projects, so it fails with "legacy API... not enabled" even with a valid
key. Routes API is the current replacement.)

1. **console.cloud.google.com** → create a project (or use an existing one)
2. **APIs & Services → Library** → search **Routes API** → Enable
3. **APIs & Services → Credentials** → **Create credentials → API key**
4. Restrict the key to the Routes API only (Credentials → the key →
   **API restrictions**) — good practice, not required. Do not add an HTTP
   referrer restriction — this call happens server-side with no referrer, so
   a referrer restriction blocks every request.
5. Vercel → **Settings → Environment Variables** → add `GOOGLE_MAPS_API_KEY`
6. Redeploy

Google's low-volume usage is normally covered by their free monthly credit.

**Without this key, no fee is charged and the booking is flagged
`travel_fee_needs_review`** in the database — visible on the booking's admin
detail page — rather than blocking the booking or silently undercharging. A
human can then check the address and invoice any difference by hand.

## 4. Test it end to end

With test Stripe keys in place, book through the form using:

```
4242 4242 4242 4242   any future expiry   any CVC   any postcode
```

Try an address well outside 100 km of Omemee too, to see the travel fee
appear in the running total.

Then check:

- The booking appears in **/admin/bookings**
- Its status reads **Pending** and the deposit reads **paid**
- The confirmation email arrives, mentioning the deposit percentage and the
  balance-due date
- The booking detail page shows the travel fee and distance, if any

When that works, swap the test Stripe keys for live ones and repeat once with
a real card you can refund.

---

## Things worth knowing

**The deposit is 35%, balance due 7 days before the event.** Set in
`DEPOSIT_PERCENT` in `lib/packages.ts`. That wording is generated from the
constant everywhere it appears — change the number there and every page,
email and admin screen updates together.

**HST is charged on the deposit.** The deposit is 35% of the HST-inclusive
total (rate + add-ons + travel fee), so tax is collected proportionally up
front rather than all at the end. Worth confirming with your bookkeeper.

**Rates can belong to more than one booth.** Completely Captured and the
hourly attendant packages are available on both the Oak and Mod booths —
`Rate.boothIds` is an array for exactly this. Add-ons can be restricted the
same way with `Addon.boothIds`; omit it for an add-on available everywhere
(like Early setup).

## Where things live

| What | File |
| --- | --- |
| Prices, packages, add-ons, deposit % | `lib/packages.ts` |
| The booking form | `components/booking/BookingForm.tsx` |
| Live-availability calendar | `components/booking/AvailabilityCalendar.tsx` |
| Booking API and price calculation | `app/api/bookings/route.ts` |
| Travel fee calculation | `lib/travel.ts` |
| Stripe checkout | `lib/stripe.ts` |
| Payment confirmation | `lib/confirm-deposit.ts` (called from the success page and the webhook) |
| Emails | `lib/email.ts` |
| Admin bookings list | `app/admin/(protected)/bookings/page.tsx` |
| Setup status at a glance | `/admin/setup` |

`lib/packages.ts` is the single source of truth for prices. The packages
page, the booking form and the server-side price check all read from it, so
changing a price there changes it everywhere. Do not hardcode a price
anywhere else.
