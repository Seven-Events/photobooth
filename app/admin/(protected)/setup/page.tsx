'use client';

import { useEffect, useState } from 'react';

type Health = {
  checks: Record<string, boolean>;
  resendDomains: { name: string; status: string }[];
  stripeMode: 'live' | 'test' | null;
  migrations: Record<string, boolean>;
  warnings: string[];
  suggestions: string[];
  ready: boolean;
  canTakePayments: boolean;
};

const LABELS: Record<string, string> = {
  supabase: 'Database connection',
  supabaseServiceRole: 'Database admin access',
  stripeSecretKey: 'Stripe — taking payments',
  stripeWebhookSecret: 'Stripe — confirming payments',
  resend: 'Email sending',
  siteUrl: 'Site address',
  googleMaps: 'Travel fee lookup (Google Maps)',
};

const MIGRATION_LABELS: Record<string, string> = {
  bookingSystem: 'Booking system tables (migration 001)',
  adminBackend: 'Admin backend tables (migration 002)',
  travelFee: 'Travel fee columns (migration 003)',
};

export default function SetupPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/health');
        const data = await res.json();
        if (!res.ok) setError(data.error || 'Could not run the check.');
        else setHealth(data);
      } catch {
        setError('Could not reach the server.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: 'var(--ink)', marginBottom: '0.5rem' }}>
          Setup check
        </h1>
        <p style={{ color: 'rgba(37,70,65,0.7)', marginBottom: '2rem' }}>
          What is connected and what still needs doing. Nothing here shows an actual key.
        </p>

        {loading && <div className="card">Checking…</div>}

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        {health && (
          <>
            <div
              className="card"
              style={{
                marginBottom: '1.5rem',
                borderColor: health.ready ? 'var(--ok)' : 'var(--clay)',
                borderWidth: '2px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 700, color: health.ready ? 'var(--ok)' : 'var(--ink)' }}>
                {health.ready
                  ? '✓ Everything is connected — you are ready to take bookings.'
                  : `${health.warnings.length} thing${health.warnings.length === 1 ? '' : 's'} still to sort out.`}
              </p>
              {health.canTakePayments && (
                <p style={{ margin: '0.6rem 0 0', fontSize: '0.9rem', color: 'rgba(37,70,65,0.7)' }}>
                  Customers can book and pay a deposit online right now.
                </p>
              )}
            </div>

            {health.warnings.length > 0 && (
              <section className="card" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1rem' }}>Needs attention</h2>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.75rem' }}>
                  {health.warnings.map((w) => (
                    <li key={w} style={{ color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>{w}</li>
                  ))}
                </ul>
              </section>
            )}

            {health.suggestions.length > 0 && (
              <section className="card" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                  Optional improvements
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'rgba(37,70,65,0.6)', marginTop: 0 }}>
                  Nothing here is stopping you taking bookings.
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.75rem' }}>
                  {health.suggestions.map((s) => (
                    <li key={s} style={{ color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="card" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Connections</h2>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {Object.entries(health.checks).map(([k, ok]) => (
                  <Row key={k} label={LABELS[k] ?? k} ok={ok} />
                ))}
              </div>

              {health.resendDomains.length > 0 && (
                <div style={{ marginTop: '1.25rem', display: 'grid', gap: '0.4rem' }}>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(37,70,65,0.5)', fontWeight: 700, margin: 0 }}>
                    Resend sending domains
                  </p>
                  {health.resendDomains.map((d) => (
                    <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--ink)' }}>
                      <span>{d.name}</span>
                      <span style={{ fontWeight: 700, color: d.status === 'verified' ? '#3c5a2b' : '#8a3b32' }}>{d.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {health.stripeMode && (
                <p
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.6rem',
                    backgroundColor: health.stripeMode === 'live' ? '#e3ecd8' : '#fdf0e6',
                    color: health.stripeMode === 'live' ? '#3c5a2b' : '#8a5a2b',
                    fontSize: '0.9rem',
                  }}
                >
                  Stripe is in <strong>{health.stripeMode}</strong> mode.
                  {health.stripeMode === 'test'
                    ? ' Test cards only — no real money moves. Swap to live keys when you are ready.'
                    : ' Real cards will be charged.'}
                </p>
              )}
            </section>

            <section className="card">
              <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Database</h2>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {Object.entries(health.migrations).map(([k, ok]) => (
                  <Row key={k} label={MIGRATION_LABELS[k] ?? k} ok={ok} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Row({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <span style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>{label}</span>
      <span
        style={{
          fontWeight: 700,
          fontSize: '0.8rem',
          padding: '0.25rem 0.7rem',
          borderRadius: '999px',
          whiteSpace: 'nowrap',
          backgroundColor: ok ? '#e3ecd8' : '#f7e3e0',
          color: ok ? '#3c5a2b' : '#8a3b32',
        }}
      >
        {ok ? '✓ Connected' : '✗ Missing'}
      </span>
    </div>
  );
}
