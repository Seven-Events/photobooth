-- Admin backend: notes, audit trail, blocked dates, manual bookings.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste → Run.
-- Safe to run more than once. Run 001 first if you have not already.

-- ---------------------------------------------------------------------------
-- 1. Where a booking came from, and who last touched it
-- ---------------------------------------------------------------------------

alter table public.events add column if not exists source text default 'website';
alter table public.events add column if not exists updated_by uuid references auth.users(id);

alter table public.events drop constraint if exists events_source_check;
alter table public.events add constraint events_source_check
  check (source in ('website', 'manual'));

-- Phone and DM bookings get negotiated, so the team needs to be able to set a
-- price that does not match the published rate.
alter table public.events add column if not exists price_override boolean default false;

-- ---------------------------------------------------------------------------
-- 2. Notes
--
-- A table rather than a text column on events, so notes keep their author and
-- timestamp and nobody overwrites a colleague's note.
-- ---------------------------------------------------------------------------

create table if not exists public.booking_notes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  author_id uuid references auth.users(id),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists booking_notes_event_idx on public.booking_notes (event_id, created_at desc);

-- ---------------------------------------------------------------------------
-- 3. Activity log
--
-- So "who did what" is answerable. Written by the server, never edited.
-- ---------------------------------------------------------------------------

create table if not exists public.event_activity (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  actor_id uuid references auth.users(id),
  action text not null,
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists event_activity_event_idx on public.event_activity (event_id, created_at desc);

-- ---------------------------------------------------------------------------
-- 4. Blocked dates
--
-- Holidays, maintenance, already-committed days. The public booking form
-- checks these before letting a date through.
-- ---------------------------------------------------------------------------

create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  blocked_on date not null,
  -- null means every booth is unavailable that day
  booth_id text,
  reason text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- One row per date per booth. The coalesce lets a single all-booths row and
-- per-booth rows coexist without duplicating either.
create unique index if not exists blocked_dates_unique_idx
  on public.blocked_dates (blocked_on, coalesce(booth_id, 'all'));

-- ---------------------------------------------------------------------------
-- 5. Row level security
--
-- is_admin() comes from migration 001. It is SECURITY DEFINER so these policies
-- do not recurse.
-- ---------------------------------------------------------------------------

alter table public.booking_notes enable row level security;

drop policy if exists "admins manage notes" on public.booking_notes;
create policy "admins manage notes"
  on public.booking_notes for all
  using (public.is_admin())
  with check (public.is_admin());

alter table public.event_activity enable row level security;

drop policy if exists "admins read activity" on public.event_activity;
create policy "admins read activity"
  on public.event_activity for select
  using (public.is_admin());

alter table public.blocked_dates enable row level security;

drop policy if exists "admins manage blocked dates" on public.blocked_dates;
create policy "admins manage blocked dates"
  on public.blocked_dates for all
  using (public.is_admin())
  with check (public.is_admin());

-- Notes and activity are deliberately admin-only: notes are internal and a
-- customer should never see them.

-- ---------------------------------------------------------------------------
-- 6. Availability
--
-- One physical booth of each type, so a date is taken if a live booking
-- already has that booth, or the date is blocked.
-- ---------------------------------------------------------------------------

create or replace function public.is_booth_available(
  check_date date,
  check_booth text
)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    not exists (
      select 1 from public.events e
      where e.event_date = check_date
        and e.booth_id = check_booth
        and e.status in ('awaiting_deposit', 'pending', 'confirmed')
    )
    and not exists (
      select 1 from public.blocked_dates b
      where b.blocked_on = check_date
        and (b.booth_id is null or b.booth_id = check_booth)
    );
$$;

grant execute on function public.is_booth_available(date, text) to authenticated, anon;
