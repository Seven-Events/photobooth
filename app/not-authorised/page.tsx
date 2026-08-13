import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No access | Seven Events',
  robots: { index: false },
};

/**
 * Where the auth guards land you when your role does not match the area you
 * asked for — or could not be read at all. Deliberately a dead end rather than
 * another redirect, so a misconfigured account cannot cause a loop.
 */
export default function NotAuthorisedPage() {
  return (
    <main
      style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}
      className="flex items-center justify-center p-4"
    >
      <div className="card" style={{ maxWidth: '520px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--ink)', marginBottom: '1rem' }}>
          You do not have access to that
        </h1>

        <p style={{ marginBottom: '0.75rem' }}>
          Your account is signed in, but it is not set up for the area you tried to open.
        </p>

        <p style={{ fontSize: '0.9rem', color: 'rgba(37,70,65,0.6)', marginBottom: '2rem' }}>
          If you are the site owner, check that your row in the <code>users</code> table exists and
          has the right <code>role</code>.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              backgroundColor: 'var(--ink)',
              color: 'var(--cream)',
              padding: '0.9rem 2rem',
              borderRadius: '999px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Back to the site
          </Link>
          <Link
            href="/login"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--ink)',
              padding: '0.9rem 2rem',
              borderRadius: '999px',
              fontWeight: 700,
              border: '2px solid var(--ink)',
              textDecoration: 'none',
            }}
          >
            Sign in as someone else
          </Link>
        </div>
      </div>
    </main>
  );
}
