import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photobooth Packages & Pricing | Seven Events',
  description: 'Browse our photobooth packages. From Bronze to Gold, find the perfect package for your event.',
};

export default function PackagesPage() {
  const packages = [
    {
      name: 'Bronze',
      price: '$299',
      duration: '2 Hours',
      features: [
        'Instant Prints',
        'Custom Backdrop',
        'Digital Gallery Link',
        'Professional Attendant',
        '5 Prop Packages',
        'Unlimited Guests',
      ],
      popular: false,
    },
    {
      name: 'Silver',
      price: '$499',
      duration: '4 Hours',
      features: [
        'Everything in Bronze',
        'GIF Creation',
        'Social Media Integration',
        'Premium Props Package',
        'Custom Photo Templates',
        'Email Gallery Delivery',
      ],
      popular: true,
    },
    {
      name: 'Gold',
      price: '$799',
      duration: '8 Hours',
      features: [
        'Everything in Silver',
        'Extended Duration',
        'Premium Backdrop Options',
        'Video Boomerang Features',
        'Custom Branded Prints',
        'Priority Scheduling',
      ],
      popular: false,
    },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      {/* Navigation */}
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600, color: 'var(--cream)', textDecoration: 'none' }}>
            Seven Events Photobooth
          </Link>
          <div className="space-x-8 hidden md:flex">
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/packages" className="hover:text-white transition-colors font-semibold">Packages</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/book" style={{ color: 'var(--clay)' }} className="font-semibold hover:opacity-80 transition-opacity">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section style={{ backgroundColor: 'var(--paper)', padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '3rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Photobooth Packages
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink)' }}>
            Choose the perfect package for your event
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="card"
                style={{
                  borderTop: pkg.popular ? `4px solid var(--clay)` : 'none',
                  position: 'relative',
                  transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s',
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--clay)',
                    color: 'var(--ink)',
                    padding: '0.25rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.75rem', color: 'var(--ink)', marginBottom: '0.5rem', marginTop: pkg.popular ? '1rem' : '0' }}>
                  {pkg.name}
                </h3>

                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--clay)', fontWeight: 700 }}>
                    {pkg.price}
                  </p>
                  <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>
                    {pkg.duration}
                  </p>
                </div>

                <ul style={{ marginBottom: '2rem', color: 'var(--ink)' }}>
                  {pkg.features.map((feature) => (
                    <li key={feature} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--clay)' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  style={{
                    display: 'block',
                    backgroundColor: pkg.popular ? 'var(--clay)' : 'transparent',
                    color: pkg.popular ? 'var(--ink)' : 'var(--clay)',
                    border: pkg.popular ? 'none' : '2px solid var(--clay)',
                    padding: '0.75rem',
                    textAlign: 'center',
                    borderRadius: '0.25rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
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
                >
                  Book This Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ backgroundColor: 'var(--blush)', padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Optional Add-Ons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '0.5rem' }}>Extended Hours</h3>
              <p style={{ color: 'var(--clay)', fontWeight: 600, marginBottom: '0.5rem' }}>+$100/hour</p>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>Perfect for longer events or additional coverage</p>
            </div>
            <div className="card">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '0.5rem' }}>Premium Backdrop</h3>
              <p style={{ color: 'var(--clay)', fontWeight: 600, marginBottom: '0.5rem' }}>+$150</p>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>Custom design tailored to your event theme</p>
            </div>
            <div className="card">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '0.5rem' }}>Luxury Props Bundle</h3>
              <p style={{ color: 'var(--clay)', fontWeight: 600, marginBottom: '0.5rem' }}>+$75</p>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>Exclusive props curated for your event</p>
            </div>
            <div className="card">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '0.5rem' }}>Premium Print Upgrade</h3>
              <p style={{ color: 'var(--clay)', fontWeight: 600, marginBottom: '0.5rem' }}>+$0.50/print</p>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>Higher quality prints on premium paper</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
            Book your photobooth and create unforgettable memories at your event
          </p>
          <Link href="/book" style={{
            display: 'inline-block',
            backgroundColor: 'var(--clay)',
            color: 'var(--ink)',
            padding: '1rem 2rem',
            borderRadius: '0.25rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'opacity 0.3s',
          }}>
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem', marginTop: '3rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Navigation</h4>
            <div className="space-y-2">
              <Link href="/" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Home</Link><br/>
              <Link href="/gallery" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Gallery</Link><br/>
              <Link href="/faq" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">FAQs</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Service Areas</h4>
            <div className="space-y-2">
              <Link href="/kawartha-lakes" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Kawartha Lakes</Link><br/>
              <Link href="/prince-edward-county" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">PEC</Link><br/>
              <Link href="/durham-region" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Durham</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Privacy</Link><br/>
              <Link href="/terms" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Terms</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Contact</h4>
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
