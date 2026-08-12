-- Booking system schema.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste this → Run.
-- It is safe to run more than once; every statement is guarded.
--
-- What it does:
--   1. Adds the booking fields the website form needs to the events table
--   2. Widens the status values to cover the deposit flow
--   3. Adds row level security so a client can only ever see their own events

-- ---------------------------------------------------------------------------
-- 1. Event booking fields
-- ---------------------------------------------------------------------------

alter table public.events add column if not exists booth_id text;
alter table public.events add column if not exists rate_id text;
alter table public.events add column if not exists addon_ids text[] default '{}';
alter table public.events add column if not exists venue text;
alter table public.events add column if not exists guest_count integer;

-- Money is stored in cents to avoid floating point rounding.
alter table public.events add column if not exists subtotal_cents integer default 0;
alter table public.events add column if not exists hst_cents integer default 0;
alter table public.events add column if not exists total_cents integer default 0;
alter table public.events add column if not exists deposit_cents integer default 0;

alter table public.events add column if not exists deposit_status text default 'unpaid';
alter table public.events add column if not exists stripe_session_id text;

-- Prices are captured at booking time, so a later price change never rewrites
-- what an existing customer agreed to pay.
comment on column public.events.subtotal_cents is 'Price agreed at booking time, in cents, excluding HST';

-- ---------------------------------------------------------------------------
-- 2. Status values
-- ---------------------------------------------------------------------------

alter table public.events drop constraint if exists events_status_check;
alter table public.events add constraint events_status_check
  check (status in ('awaiting_deposit', 'pending', 'confirmed', 'completed', 'cancelled'));

alter table public.events drop constraint if exists events_deposit_status_check;
alter table public.events add constraint events_deposit_status_check
  check (deposit_status in ('unpaid', 'paid', 'refunded'));

-- The old package_type column held 'bronze' / 'silver' / 'gold', which no
-- longer exist. Left in place rather than dropped so no existing row is lost;
-- drop it once you have confirmed nothing depends on it.
alter table public.events drop constraint if exists events_package_type_check;

-- ---------------------------------------------------------------------------
-- 3. Lookups the admin list and the client dashboard rely on
-- ---------------------------------------------------------------------------

create index if not exists events_event_date_idx on public.events (event_date desc);
create index if not exists events_user_id_idx on public.events (user_id);
create index if not exists events_status_idx on public.events (status);
create index if not exists events_stripe_session_idx on public.events (stripe_session_id);

-- ---------------------------------------------------------------------------
-- 4. Row level security
--
-- Without this, any signed-in customer could read every other customer's
-- booking, including their phone number and venue.
-- ---------------------------------------------------------------------------

alter table public.events enable row level security;

drop policy if exists "clients read own events" on public.events;
create policy "clients read own events"
  on public.events for select
  using (auth.uid() = user_id);

drop policy if exists "admins read all events" on public.events;
create policy "admins read all events"
  on public.events for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

drop policy if exists "admins update events" on public.events;
create policy "admins update events"
  on public.events for update
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

-- Bookings are created by the server using the service role key, which bypasses
-- RLS. There is deliberately no public insert policy: a booking must go through
-- the API so the price is calculated server-side.

alter table public.users enable row level security;

drop policy if exists "users read own profile" on public.users;
create policy "users read own profile"
  on public.users for select
  using (auth.uid() = id);

drop policy if exists "admins read all users" on public.users;
create policy "admins read all users"
  on public.users for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );
