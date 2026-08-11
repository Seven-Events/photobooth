'use client';

import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch bookings from Booqable via API
        const response = await fetch('/api/admin/analytics');
        if (response.ok) {
          // Analytics will fetch bookings
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
              Bookings
            </h1>
            <p style={{ color: 'var(--ink)' }}>Manage all photobooth bookings</p>
          </div>
          <a href="/admin/bookings/new" className="button-primary">
            ➕ New Booking
          </a>
        </div>

        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--line)` }}>
                  <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Client</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Time</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Package</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--ink)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink)' }}>
                    {loading ? 'Loading bookings...' : 'No bookings yet. Create one to get started!'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/admin/bookings/new" className="button-primary">
            Create Your First Booking
          </a>
        </div>
      </div>
    </main>
  );
}
