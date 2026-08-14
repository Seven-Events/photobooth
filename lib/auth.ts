import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

/**
 * Reads the caller's role.
 *
 * Uses the service-role client rather than the session-scoped one. By this
 * point requireAuth() has already verified the caller's identity against
 * Supabase directly via getUser(), so this lookup is not a privilege check —
 * it is just reading that already-trusted user's own row. Doing it through
 * RLS added a dependency on that policy resolving correctly on every request,
 * which is exactly what was silently sending a real admin to /not-authorised:
 * requireAuth() succeeded, but this lookup then failed to see the role and
 * defaulted to "not this role". Bypassing RLS here removes that failure mode
 * entirely rather than continuing to chase why the policy misbehaved.
 *
 * Still returns null (never a role) if the row is genuinely missing or the
 * query itself errors — the guards below must treat that as "not this role"
 * rather than assuming the other one, or the two of them bounce the browser
 * between /admin and /dashboard forever.
 */
async function getRole(userId: string): Promise<string | null> {
  const admin = createAdminClient();
  const { data, error } = await admin.from('users').select('role').eq('id', userId).maybeSingle();

  if (error) {
    console.error('Could not read user role:', error.message);
    return null;
  }

  return data?.role ?? null;
}

export async function requireAdmin() {
  const user = await requireAuth();
  const role = await getRole(user.id);

  if (role !== 'admin') {
    // Deliberately not /dashboard: if the role could not be read at all, that
    // page would send us straight back here.
    redirect('/not-authorised');
  }

  return user;
}

export async function requireClient() {
  const user = await requireAuth();
  const role = await getRole(user.id);

  if (role === 'admin') {
    redirect('/admin');
  }

  if (role !== 'client') {
    redirect('/not-authorised');
  }

  return user;
}
