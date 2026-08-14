'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Signs out and hard-navigates to /login.
 *
 * A hard navigation (not router.push) matters here: it forces every server
 * component on the next page to re-run and see the now-signed-out session,
 * so nothing cached from the admin or dashboard layout lingers after logout.
 */
export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--cream)',
        fontSize: '0.875rem',
        textDecoration: 'none',
        cursor: loading ? 'default' : 'pointer',
        opacity: loading ? 0.6 : 1,
        padding: 0,
        font: 'inherit',
      }}
    >
      {loading ? 'Signing out…' : 'Log out'}
    </button>
  );
}
