# Turning on the booking system

Three things must happen before the form can take a deposit. Until then the
form still works — it saves the booking and emails you, it just skips payment.

## 1. Run the database migration

Supabase dashboard → **SQL Editor** → New query → paste the contents of
`supabase/migrations/001_booking_system.sql` → **Run**.

It is safe to run more than once. It adds the booking columns, widens the
status values, and turns on row level security so one customer can never read
another customer's booking.

**Until this runs, every booking attempt will fail** — the form posts columns
that do not exist yet.

## 2. Add the Stripe keys

1. Stripe dashboard → **Developers → API keys** → copy the **Secret key**
   - Use the **test** key (`sk_test_…`) first
2. Vercel → project → **Settings → Environment Variables**, add:
   - `STRIPE_SECRET_KEY`
3. Stripe dashboard → **Developers → Webhooks** → **Add endpoint**
   - URL: `https://seveneventsphotobooth.com/api/stripe/webhook`
   - Event to send: `checkout.session.completed`
   - Copy the **Signing secret** and add it to Vercel as `STRIPE_WEBHOOK_SECRET`
4. Redeploy

The webhook matters. The browser redirect after payment is *not* what marks a
booking paid — a customer can close that tab, and the URL can be faked. Stripe
calling the webhook is the only thing that sets `deposit_status = 'paid'`.

## 3. Test it end to end

With test keys in place, book through the form using Stripe's test card:

```
4242 4242 4242 4242   any future expiry   any CVC   any postcode
```

Then check:

- The booking appears in **/admin/bookings**
- Its status reads **Pending** and the deposit reads **paid**
- The confirmation email arrives

When that works, swap the test keys for live ones and repeat once with a real
card you can refund.

---

## Things worth deciding

**The deposit is 25%.** Set in `DEPOSIT_PERCENT` in `lib/packages.ts`. On a
$1,200 booking that is $339 including HST. Change the number if you would
rather take a flat amount or a different percentage.

**HST is charged on the deposit.** The deposit is 25% of the HST-inclusive
total, so tax is collected proportionally up front rather than all at the end.
Worth confirming with your bookkeeper.

**Add-ons are placeholders.** `addons` in `lib/packages.ts` currently lists an
extra hour, a premium backdrop and a guest book, at prices I chose. Replace
them with what you actually sell.

## Where things live

| What | File |
| --- | --- |
| Prices, packages, add-ons, deposit % | `lib/packages.ts` |
| The booking form | `components/booking/BookingForm.tsx` |
| Booking API and price calculation | `app/api/bookings/route.ts` |
| Stripe checkout | `lib/stripe.ts` |
| Payment confirmation webhook | `app/api/stripe/webhook/route.ts` |
| Emails | `lib/email.ts` |
| Admin bookings list | `app/admin/(protected)/bookings/page.tsx` |

`lib/packages.ts` is the single source of truth. The packages page, the booking
form and the server-side price check all read from it, so changing a price
there changes it everywhere. Do not hardcode a price anywhere else.
