import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      );
    }

    // Role decides where the login page sends them next — an admin who signs
    // in should land on /admin, not have to know to retype the URL.
    //
    // Looked up with the service-role client rather than the just-signed-in
    // session: this runs a moment after signInWithPassword(), and relying on
    // that fresh session to already be attached for an RLS-scoped query in
    // the same request is exactly the kind of timing assumption that fails
    // silently. The service role sidesteps RLS entirely for this one lookup,
    // and any failure is logged instead of quietly defaulting to 'client'.
    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Login role lookup failed for', data.user.id, profileError.message);
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: profile?.role ?? 'client',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
