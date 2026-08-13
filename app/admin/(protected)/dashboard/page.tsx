'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/packages';

interface Analytics {
  totalBookings: number;
  totalCustomers: number;
  upcomingEvents: number;
  awaitingDeposit: number;
  pendingConfirmation: number;
  depositsCollectedCents: number;
  completedCents: number;
  bookedValueCents: number;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalBookings: 0,
    totalCustomers: 0,
    upcomingEvents: 0,
    awaitingDeposit: 0,
    pendingConfirmation: 0,
    depositsCollectedCents: 0,
    completedCents: 0,
    bookedValueCents: 0,
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
      label: 'Upcoming Events',
      value: analytics.upcomingEvents,
      icon: '⏰',
      color: 'var(--ok)',
    },
    {
      label: 'Needs Attention',
      value: analytics.awaitingDeposit + analytics.pendingConfirmation,
      icon: '⚠️',
      color: 'var(--ink)',
    },
    {
      // Money actually taken, not the value of everything booked — those are
      // very different numbers and conflating them flatters the figures.
      label: 'Deposits Collected',
      value: formatPrice(analytics.depositsCollectedCents),
      icon: '💰',
      color: 'var(--clay)',
    },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
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
              <p style={{ fontSize: '2rem', color: card.color, fontWeight: 600 }}>
                {loading ? '...' : card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <a href="/admin/bookings" className="button-primary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', textDecoration: 'none' }}>
                📅 View All Bookings
              </a>
              <a href="/admin/clients" className="button-secondary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', textDecoration: 'none' }}>
                👥 Manage Clients
              </a>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Money
            </h3>
            <div style={{ color: 'var(--ink)' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Booked value:</strong> {formatPrice(analytics.bookedValueCents)}{' '}
                <span style={{ color: 'rgba(37,70,65,0.55)', fontSize: '0.85rem' }}>
                  — everything on the books, incl. HST
                </span>
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Deposits collected:</strong> {formatPrice(analytics.depositsCollectedCents)}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Completed events:</strong> {formatPrice(analytics.completedCents)}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Average booking:</strong>{' '}
                {analytics.totalBookings > 0
                  ? formatPrice(Math.round(analytics.bookedValueCents / analytics.totalBookings))
                  : formatPrice(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)' }}>
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
