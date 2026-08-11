'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  starts_at: string;
  stops_at: string;
  status: string;
  customer: {
    name: string;
    email: string;
  };
  lines?: Array<{
    product: {
      name: string;
    };
  }>;
}

export default function EventsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/user');
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/login';
            return;
          }
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            My Events
          </h1>
          <p style={{ color: 'var(--ink)' }}>Manage your photobooth bookings and design custom templates</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b" style={{ borderColor: 'var(--line)' }}>
          <Link href="/dashboard/events" className="pb-4 font-semibold" style={{ color: 'var(--clay)', borderBottom: '2px solid var(--clay)' }}>
            My Bookings
          </Link>
          <Link href="/dashboard/backdrops" className="pb-4" style={{ color: 'var(--ink)' }}>
            Backdrops
          </Link>
          <Link href="/dashboard/templates" className="pb-4" style={{ color: 'var(--ink)' }}>
            Templates
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink)' }}>
            Loading your bookings...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {/* Bookings List */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link key={booking.id} href={`/dashboard/events/${booking.id}`}>
                <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                        {booking.lines?.[0]?.product?.name || 'Photobooth Booking'}
                      </h3>
                      <p style={{ color: 'var(--clay)', fontWeight: 600 }}>
                        {new Date(booking.starts_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: booking.status === 'confirmed' ? 'var(--ok)' : 'var(--blush)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}>
                      {booking.status?.toUpperCase()}
                    </div>
                  </div>

                  <p style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>
                    <strong>Time:</strong> {new Date(booking.starts_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(booking.stops_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <p style={{ color: 'var(--ink)' }}>
                    <strong>Booking ID:</strong> {booking.id.substring(0, 8)}...
                  </p>

                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
                    <button className="button-secondary" style={{ padding: '0.5rem 1rem' }}>
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--paper)', borderRadius: '0.5rem' }}>
            <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
              You don't have any bookings yet.
            </p>
            <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
              Book Your Event
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
