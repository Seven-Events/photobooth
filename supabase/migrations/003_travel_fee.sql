-- Travel fee columns.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste → Run.
-- Safe to run more than once.

alter table public.events add column if not exists travel_fee_cents integer default 0;
alter table public.events add column if not exists travel_distance_km numeric;

-- True when the distance could not be calculated automatically (no address on
-- file for the routing API, or the lookup was not configured) — the team
-- needs to check the venue address and invoice any travel fee manually.
alter table public.events add column if not exists travel_fee_needs_review boolean default false;

create index if not exists events_travel_review_idx
  on public.events (travel_fee_needs_review)
  where travel_fee_needs_review = true;
