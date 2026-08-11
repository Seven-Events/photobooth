'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '2rem', textAlign: 'center' }}>
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border"
              style={{ borderColor: 'var(--line)' }}
              required
            />
          </div>

          <div>
            <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border"
              style={{ borderColor: 'var(--line)' }}
              required
            />
          </div>

          {error && <p style={{ color: 'var(--danger)' }} className="text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="button-primary w-full"
            style={{ opacity: isLoading ? 0.6 : 1 }}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p style={{ color: 'var(--ink)', textAlign: 'center', marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <Link href="/book" style={{ color: 'var(--clay)', fontWeight: 600 }}>
            Book an event
          </Link>
        </p>
      </div>
    </main>
  );
}
