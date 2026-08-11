import Link from 'next/link';

export default function PricingPage() {
  const packages = [
    {
      name: 'Bronze',
      price: '$299',
      features: ['2 Hours', 'Instant Prints', 'Custom Backdrop', 'Digital Gallery'],
      popular: false,
    },
    {
      name: 'Silver',
      price: '$499',
      features: ['4 Hours', 'Instant Prints', 'Custom Backdrop', 'Digital Gallery', 'GIF Creation'],
      popular: true,
    },
    {
      name: 'Gold',
      price: '$799',
      features: ['8 Hours', 'Instant Prints', 'Custom Backdrop', 'Digital Gallery', 'GIF Creation', 'Photo Templates'],
      popular: false,
    },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto py-16">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
          Our Packages
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="card"
              style={{
                borderColor: pkg.popular ? 'var(--clay)' : 'var(--line)',
                borderWidth: pkg.popular ? '2px' : '1px',
              }}
            >
              {pkg.popular && (
                <div style={{ backgroundColor: 'var(--clay)', color: 'var(--ink)' }} className="text-center py-1 mb-4 font-semibold">
                  Most Popular
                </div>
              )}
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>
                {pkg.name}
              </h3>
              <div style={{ fontSize: '2rem', color: 'var(--clay)', fontWeight: 'bold', marginBottom: '1rem' }}>
                {pkg.price}
              </div>
              <ul style={{ marginBottom: '2rem' }}>
                {pkg.features.map((feature) => (
                  <li key={feature} style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="button-primary" style={{ display: 'block', textAlign: 'center' }}>
                Book Now
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
            Ready to Book?
          </Link>
        </div>
      </div>
    </main>
  );
}
