'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    eventTitle: '',
    packageType: 'bronze',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.eventTime) newErrors.eventTime = 'Event time is required';
    if (!formData.eventTitle) newErrors.eventTitle = 'Event title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Submit booking
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'Failed to create booking' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '2rem', textAlign: 'center' }}>
          Book Your Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Info */}
          <div>
            <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
              Create Your Account
            </h3>
            <div className="space-y-4">
              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {errors.email && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {errors.password && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {errors.confirmPassword && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
              Your Information
            </h3>
            <div className="space-y-4">
              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {errors.fullName && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {errors.phone && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
              Event Details
            </h3>
            <div className="space-y-4">
              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  name="eventTitle"
                  placeholder="e.g., Sarah & John's Wedding"
                  value={formData.eventTitle}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {errors.eventTitle && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.eventTitle}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    style={{ borderColor: 'var(--line)' }}
                  />
                  {errors.eventDate && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.eventDate}</p>}
                </div>

                <div>
                  <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    style={{ borderColor: 'var(--line)' }}
                  />
                  {errors.eventTime && <p style={{ color: 'var(--danger)' }} className="text-sm mt-1">{errors.eventTime}</p>}
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Package
                </label>
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <option value="bronze">Bronze - $299</option>
                  <option value="silver">Silver - $499</option>
                  <option value="gold">Gold - $799</option>
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--ink)' }} className="block font-semibold mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border"
                  style={{ borderColor: 'var(--line)' }}
                />
              </div>
            </div>
          </div>

          {errors.submit && <p style={{ color: 'var(--danger)' }} className="text-sm">{errors.submit}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="button-primary w-full"
            style={{ opacity: isSubmitting ? 0.6 : 1 }}
          >
            {isSubmitting ? 'Booking...' : 'Complete Booking'}
          </button>

          <p style={{ color: 'var(--ink)', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--clay)', fontWeight: 600 }}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
