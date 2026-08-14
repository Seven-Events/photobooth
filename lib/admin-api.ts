import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Gate for admin API routes.
 *
 * Every admin endpoint needs the same two checks — signed in, and role is
 * admin — before it may touch the service-role client, which bypasses row
 * level security entirely. Repeating that by hand is how one endpoint
 * eventually ships without it.
 *
 * Returns either a ready-to-return error response, or the caller plus an
 * admin client.
 */
export async function requireAdminApi(): Promise<
  | { error: NextResponse; actor?: never; db?: never }
  | { error?: never; actor: { id: string; email: string | null }; db: SupabaseClient }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: 'Not signed in' }, { status: 401 }) };
  }

  // getUser() above already verified this caller's identity against Supabase
  // directly, so this role lookup is not itself a privilege check — reading
  // it through the service-role client rather than the session-scoped one
  // just means it does not depend on the "users read own profile" RLS policy
  // resolving on every request. That dependency is what silently turned a
  // real admin into "Not authorised" here.
  const admin = createAdminClient();
  const { data: profile, error: profileError } = await admin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) {
    console.error('Admin role lookup failed for', user.id, profileError.message);
  }

  if (profile?.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Not authorised' }, { status: 403 }) };
  }

  return {
    actor: { id: user.id, email: user.email ?? null },
    db: admin,
  };
}

/**
 * Append to a booking's audit trail. Best effort — a failure here must never
 * roll back the change the user actually asked for.
 */
export async function logActivity(
  db: SupabaseClient,
  opts: { eventId: string; actorId: string; action: string; detail?: string }
) {
  const { error } = await db.from('event_activity').insert({
    event_id: opts.eventId,
    actor_id: opts.actorId,
    action: opts.action,
    detail: opts.detail ?? null,
  });

  if (error) console.error('Could not write activity log:', error.message);
}
