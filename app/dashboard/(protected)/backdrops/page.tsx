'use client';

import Link from 'next/link';

const backdrops = [
  { id: 1, name: 'Classic Elegance', description: 'Timeless elegant backdrop perfect for weddings' },
  { id: 2, name: 'Modern Vibes', description: 'Contemporary design for corporate events' },
  { id: 3, name: 'Rustic Charm', description: 'Warm, rustic aesthetic for outdoor celebrations' },
  { id: 4, name: 'Party Fun', description: 'Colorful and playful backdrop for birthday parties' },
  { id: 5, name: 'Tropical Paradise', description: 'Vibrant tropical theme for summer events' },
  { id: 6, name: 'Gold Glitter', description: 'Luxurious gold accent backdrop' },
];

export default function BackdropsPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Backdrop Options
          </h1>
          <p style={{ color: 'var(--ink)' }}>Choose your favorite backdrop for your event</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b" style={{ borderColor: 'var(--line)' }}>
          <Link href="/dashboard/events" className="pb-4" style={{ color: 'var(--ink)' }}>
            My Bookings
          </Link>
          <Link href="/dashboard/backdrops" className="pb-4 font-semibold" style={{ color: 'var(--clay)', borderBottom: '2px solid var(--clay)' }}>
            Backdrops
          </Link>
          <Link href="/dashboard/templates" className="pb-4" style={{ color: 'var(--ink)' }}>
            Templates
          </Link>
        </div>

        {/* Backdrops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {backdrops.map((backdrop) => (
            <div key={backdrop.id} className="card hover:shadow-lg transition-shadow">
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: 'var(--blush)',
                borderRadius: '0.25rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📸</div>
                  <p style={{ fontSize: '0.875rem' }}>Backdrop Preview</p>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                {backdrop.name}
              </h3>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {backdrop.description}
              </p>
              <button className="button-primary" style={{ width: '100%', textAlign: 'center', padding: '0.75rem' }}>
                Select Backdrop
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
            Need help choosing? Check out our gallery for inspiration.
          </p>
          <Link href="/" className="button-secondary" style={{ display: 'inline-block' }}>
            View Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
