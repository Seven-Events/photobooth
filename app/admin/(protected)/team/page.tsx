'use client';

import { useCallback, useEffect, useState } from 'react';

type Member = { id: string; full_name: string; email: string; created_at: string };

export default function TeamPage() {
  const [team, setTeam] = useState<Member[]>([]);
  const [you, setYou] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/team');
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Could not load the team.');
      else {
        setTeam(data.team);
        setYou(data.you);
      }
    } catch {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not add them.');
      } else {
        setNotice(
          data.promoted
            ? `${email} already had an account — they now have admin access.`
            : `Invite sent to ${email}. They set their own password from the email.`
        );
        setFullName('');
        setEmail('');
        load();
      }
    } finally {
      setBusy(false);
    }
  }

  async function revoke(id: string, name: string) {
    if (!confirm(`Remove admin access for ${name}? Their account stays, but they lose the admin panel.`)) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Could not revoke access.');
      else load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: 'var(--ink)', marginBottom: '0.5rem' }}>
          Team
        </h1>
        <p style={{ color: 'rgba(37,70,65,0.7)', marginBottom: '2rem' }}>
          Everyone here can see and change every booking. Give people their own login rather than
          sharing one — that way the history on a booking shows who actually did what.
        </p>

        {error && (
          <div className="card" style={{ borderColor: 'var(--danger)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>
          </div>
        )}

        {notice && (
          <div className="card" style={{ borderColor: 'var(--ok)', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--ok)', margin: 0 }}>{notice}</p>
          </div>
        )}

        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Add someone</h2>
          <form onSubmit={invite}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="field-label" htmlFor="fullName">Name</label>
                <input id="fullName" className="field" required value={fullName}
                  onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" className="field" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <button className="button-primary" disabled={busy}>
              {busy ? 'Working…' : 'Send invite'}
            </button>
            <p style={{ fontSize: '0.8rem', color: 'rgba(37,70,65,0.55)', margin: '0.75rem 0 0' }}>
              They get an email to set their own password. Requires email to be configured —
              if invites do not arrive, check RESEND_API_KEY and your Supabase SMTP settings.
            </p>
          </form>
        </section>

        <section className="card">
          <h2 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>
            Who has access
          </h2>

          {loading ? (
            <p style={{ color: 'rgba(37,70,65,0.6)' }}>Loading…</p>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {team.map((mm) => (
                <div
                  key={mm.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    backgroundColor: 'var(--blush)',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--ink)' }}>{mm.full_name}</strong>
                    {mm.id === you && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--clay)' }}>
                        YOU
                      </span>
                    )}
                    <br />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(37,70,65,0.65)' }}>{mm.email}</span>
                  </div>
                  {mm.id !== you && (
                    <button
                      className="button-secondary"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
                      disabled={busy}
                      onClick={() => revoke(mm.id, mm.full_name)}
                    >
                      Remove access
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
