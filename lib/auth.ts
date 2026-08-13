import { createClient } from '@/lib/supabase/server';
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
 * Returns null when the profile row is missing or unreadable — the guards below
 * must treat that as "not this role" rather than assuming the other one, or the
 * two of them bounce the browser between /admin and /dashboard forever.
 */
async function getRole(userId: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').select('role').eq('id', userId).maybeSingle();

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
