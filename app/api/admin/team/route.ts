import { requireAdminApi } from '@/lib/admin-api';
import { NextResponse } from 'next/server';

/** Everyone with admin access. */
export async function GET() {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { data, error } = await gate.db
    .from('users')
    .select('id, full_name, email, created_at')
    .eq('role', 'admin')
    .order('created_at');

  if (error) {
    console.error('Could not load team:', error);
    return NextResponse.json({ error: 'Could not load the team' }, { status: 500 });
  }

  return NextResponse.json({ team: data ?? [], you: gate.actor.id });
}

/**
 * Add a teammate.
 *
 * Deliberately does not accept a password: an invite email lets them set their
 * own, so nobody is emailing passwords around or sharing one login.
 */
export async function POST(request: Request) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { email, fullName } = await request.json();

  if (!email || !fullName) {
    return NextResponse.json({ error: 'Name and email are both required.' }, { status: 400 });
  }

  const normalised = String(email).trim().toLowerCase();

  const { data: existing } = await gate.db
    .from('users')
    .select('id, role')
    .eq('email', normalised)
    .maybeSingle();

  // Already known — promote rather than erroring or creating a duplicate.
  if (existing) {
    if (existing.role === 'admin') {
      return NextResponse.json({ error: 'That person is already on the team.' }, { status: 409 });
    }
    const { error } = await gate.db.from('users').update({ role: 'admin' }).eq('id', existing.id);
    if (error) {
      return NextResponse.json({ error: 'Could not grant access.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, promoted: true }, { status: 200 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  const { data: invited, error: inviteError } = await gate.db.auth.admin.inviteUserByEmail(normalised, {
    redirectTo: `${siteUrl}/login`,
  });

  if (inviteError || !invited.user) {
    console.error('Could not invite teammate:', inviteError);
    return NextResponse.json(
      { error: inviteError?.message || 'Could not send the invite. Check that email is set up.' },
      { status: 400 }
    );
  }

  const { error: profileError } = await gate.db.from('users').insert({
    id: invited.user.id,
    email: normalised,
    full_name: fullName,
    role: 'admin',
  });

  if (profileError) {
    console.error('Could not save teammate profile:', profileError);
    return NextResponse.json({ error: 'Invite sent, but their profile could not be saved.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, invited: true }, { status: 201 });
}

/** Revoke admin access. Demotes to client rather than deleting the account. */
export async function DELETE(request: Request) {
  const gate = await requireAdminApi();
  if (gate.error) return gate.error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  // Locking yourself out is never the intent.
  if (id === gate.actor.id) {
    return NextResponse.json({ error: 'You cannot remove your own access.' }, { status: 400 });
  }

  const { count } = await gate.db
    .from('users')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'admin');

  if ((count ?? 0) <= 1) {
    return NextResponse.json({ error: 'There must be at least one admin.' }, { status: 400 });
  }

  const { error } = await gate.db.from('users').update({ role: 'client' }).eq('id', id);

  if (error) {
    console.error('Could not revoke access:', error);
    return NextResponse.json({ error: 'Could not revoke access' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
