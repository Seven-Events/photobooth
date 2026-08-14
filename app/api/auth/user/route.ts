import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Read through the service role rather than the session client — see
    // lib/admin-api.ts for why relying on RLS here silently misfires.
    const admin = createAdminClient();
    const { data: userProfile } = await admin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          ...userProfile,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
