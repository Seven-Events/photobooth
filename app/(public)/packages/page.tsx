'use client';

import Link from 'next/link';

export default function PackagesPage() {
  const packages = [
    {
      name: 'Bronze',
      price: '$299',
      duration: '2 Hours',
      features: ['Instant Prints', 'Custom Backdrop', 'Digital Gallery Link', 'Professional Attendant', '5 Prop Packages', 'Unlimited Guests'],
      popular: false,
    },
    {
      name: 'Silver',
      price: '$499',
      duration: '4 Hours',
      features: ['Everything in Bronze', 'GIF Creation', 'Social Media Integration', 'Premium Props Package', 'Custom Photo Templates', 'Email Gallery Delivery'],
      popular: true,
    },
    {
      name: 'Gold',
      price: '$799',
      duration: '8 Hours',
      features: ['Everything in Silver', 'Extended Duration', 'Premium Backdrop Options', 'Video Boomerang Features', 'Custom Branded Prints', 'Priority Scheduling'],
      popular: false,
    },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--cream)', textDecoration: 'none' }}>
            Seven Events
          </Link>
          <div className="space-x-6 hidden md:flex text-sm font-500">
            <Link href="/#services" className="hover:opacity-80 transition-opacity">Services</Link>
            <Link href="/packages" className="hover:opacity-80 transition-opacity font-bold">Packages</Link>
            <Link href="/gallery" className="hover:opacity-80 transition-opacity">Gallery</Link>
            <Link href="/faq" className="hover:opacity-80 transition-opacity">FAQs</Link>
            <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
          </div>
          <Link href="/book" style={{
            backgroundColor: 'var(--clay)',
            color: 'var(--ink)',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.875rem'
          }}>
            Book Now
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section style={{ backgroundColor: 'var(--paper)', padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontSize: '3.5rem', color: 'var(--ink)', marginBottom: '1rem', fontWeight: 700 }}>
            PHOTOBOOTH PACKAGES
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink)', opacity: 0.7 }}>
            Choose the perfect package for your event. All packages include professional setup, breakdown, and a friendly attendant.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}>
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  border: pkg.popular ? '3px solid var(--clay)' : '2px solid var(--line)',
                  position: 'relative',
                  transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s'
                }}
                className="hover:shadow-xl"
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--clay)',
                    color: 'var(--ink)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '2rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{
                  fontSize: '2rem',
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  marginTop: pkg.popular ? '1rem' : '0'
                }}>
                  {pkg.name}
                </h3>

                <div style={{ marginBottom: '2rem' }}>
                  <p style={{
                    fontSize: '3rem',
                    color: 'var(--clay)',
                    fontWeight: 700,
                    marginBottom: '0.25rem'
                  }}>
                    {pkg.price}
                  </p>
                  <p style={{ color: 'var(--ink)', fontSize: '0.95rem', opacity: 0.7 }}>
                    {pkg.duration}
                  </p>
                </div>

                <ul style={{ marginBottom: '2rem', color: 'var(--ink)' }}>
                  {pkg.features.map((feature) => (
                    <li key={feature} style={{
                      marginBottom: '1rem',
                      paddingLeft: '1.75rem',
                      position: 'relative',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--clay)',
                        fontWeight: 'bold'
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: 'block',
                    backgroundColor: pkg.popular ? 'var(--clay)' : 'transparent',
                    color: pkg.popular ? 'var(--ink)' : 'var(--clay)',
                    border: pkg.popular ? 'none' : '2px solid var(--clay)',
                    padding: '1rem',
                    textAlign: 'center',
                    borderRadius: '0.5rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.backgroundColor = 'var(--clay)';
                      e.currentTarget.style.color = 'var(--ink)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--clay)';
                    }
                  }}
                  onClick={() => window.location.href = '/book'}
                >
                  <Link href="/book" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Book This Package →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ backgroundColor: 'var(--paper)', padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--ink)',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: 700
          }}>
            OPTIONAL ADD-ONS
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Extended Hours', price: '+$100/hour', desc: 'Perfect for longer events or additional coverage' },
              { title: 'Premium Backdrop', price: '+$150', desc: 'Custom design tailored to your event theme' },
              { title: 'Luxury Props Bundle', price: '+$75', desc: 'Exclusive props curated for your event' },
              { title: 'Premium Print Upgrade', price: '+$0.50/print', desc: 'Higher quality prints on premium paper' }
            ].map((addon) => (
              <div
                key={addon.title}
                style={{
                  backgroundColor: 'var(--cream)',
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: '2px solid var(--line)'
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                  fontWeight: 700
                }}>
                  {addon.title}
                </h3>
                <p style={{
                  color: 'var(--clay)',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  fontSize: '1rem'
                }}>
                  {addon.price}
                </p>
                <p style={{
                  color: 'var(--ink)',
                  fontSize: '0.9rem',
                  opacity: 0.7
                }}>
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--ink)',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            READY TO GET STARTED?
          </h2>
          <p style={{
            color: 'var(--ink)',
            marginBottom: '2rem',
            opacity: 0.7,
            fontSize: '1.125rem'
          }}>
            Book your photobooth and create unforgettable memories at your event
          </p>
          <Link href="/book" style={{
            display: 'inline-block',
            backgroundColor: 'var(--clay)',
            color: 'var(--ink)',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'opacity 0.3s',
            fontSize: '1rem'
          }}>
            Book Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '4rem 2rem', marginTop: '3rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigation</h4>
            <div className="space-y-2">
              <Link href="/" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Home</Link>
              <Link href="/gallery" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Gallery</Link>
              <Link href="/faq" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">FAQs</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Areas</h4>
            <div className="space-y-2">
              <Link href="/kawartha-lakes" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Kawartha Lakes</Link>
              <Link href="/prince-edward-county" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">PEC</Link>
              <Link href="/durham-region" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Durham</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Privacy</Link>
              <Link href="/terms" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Terms</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</h4>
            <p style={{ fontSize: '0.875rem' }}>info@seveneventsphotobooth.com</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem' }}>&copy; 2024 Seven Events Photobooth. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
