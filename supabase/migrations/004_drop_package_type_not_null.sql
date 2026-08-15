-- Every booking insert was failing with:
--   null value in column "package_type" of relation "events" violates not-null constraint
--
-- package_type is a leftover from the old bronze/silver/gold pricing, before
-- the booking system rewrite replaced it with rate_id. Migration 001 dropped
-- its CHECK constraint but left the column NOT NULL, and nothing in the app
-- writes to it anymore — so every real booking hit this constraint.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste → Run.
-- Safe to run more than once.

alter table public.events alter column package_type drop not null;
