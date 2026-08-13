-- Promote an existing account to admin.
--
-- BEFORE RUNNING: create the login first, in the Supabase dashboard under
-- Authentication → Users → Add user. Tick "Auto Confirm User" so you can sign
-- in straight away without waiting on a confirmation email.
--
-- Then change the email on the line marked below and run the whole thing in
-- the SQL Editor.

insert into public.users (id, email, full_name, role)
select
  au.id,
  au.email,
  coalesce(au.raw_user_meta_data ->> 'full_name', 'Admin'),
  'admin'
from auth.users au
where au.email = 'you@example.com'   -- 👈 CHANGE THIS
on conflict (id) do update
  set role = 'admin';

-- Should list your account with role = admin.
select id, email, role, created_at
from public.users
where role = 'admin';
