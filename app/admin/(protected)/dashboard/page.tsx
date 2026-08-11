'use client';

import { useEffect, useState } from 'react';

interface Analytics {
  totalBookings: number;
  totalCustomers: number;
  upcomingEvents: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalBookings: 0,
    totalCustomers: 0,
    upcomingEvents: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const statCards = [
    {
      label: 'Total Bookings',
      value: analytics.totalBookings,
      icon: '📅',
      color: 'var(--clay)',
    },
    {
      label: 'Total Customers',
      value: analytics.totalCustomers,
      icon: '👥',
      color: 'var(--ink)',
    },
    {
      label: 'Upcoming Events',
      value: analytics.upcomingEvents,
      icon: '⏰',
      color: 'var(--ok)',
    },
    {
      label: 'Revenue',
      value: `$${analytics.revenue.toLocaleString()}`,
      icon: '💰',
      color: 'var(--clay)',
    },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--ink)' }}>Manage your photobooth business</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--ink)', fontSize: '0.875rem', fontWeight: 600 }}>
                  {card.label}
                </h3>
                <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
              </div>
              <p style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: card.color, fontWeight: 600 }}>
                {loading ? '...' : card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <a href="/admin/bookings/new" className="button-primary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem' }}>
                ➕ Create New Booking
              </a>
              <a href="/admin/clients" className="button-secondary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem' }}>
                👥 Manage Clients
              </a>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Business Stats
            </h3>
            <div style={{ color: 'var(--ink)' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>This Month:</strong> {analytics.totalBookings} bookings
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Conversion:</strong> {analytics.totalCustomers > 0 ? ((analytics.totalBookings / analytics.totalCustomers) * 100).toFixed(1) : 0}%
              </p>
              <p>
                <strong>Avg Value:</strong> ${analytics.revenue > 0 && analytics.totalBookings > 0 ? (analytics.revenue / analytics.totalBookings).toFixed(2) : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)' }}>
              Recent Bookings
            </h3>
            <a href="/admin/bookings" style={{ color: 'var(--clay)', textDecoration: 'none', fontWeight: 600 }}>
              View All →
            </a>
          </div>
          <div style={{ color: 'var(--ink)', textAlign: 'center', padding: '2rem' }}>
            <p style={{ marginBottom: '1rem' }}>No recent bookings to display</p>
            <a href="/admin/bookings/new" className="button-secondary" style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>
              Create First Booking
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
