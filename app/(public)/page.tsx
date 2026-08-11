import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600 }}>
            Seven Events Photobooth
          </h1>
          <div className="space-x-6 hidden md:flex">
            <Link href="/#packages" className="hover:text-white">Packages</Link>
            <Link href="/book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 text-center max-w-4xl mx-auto">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '3rem', color: 'var(--ink)' }} className="mb-6">
          Make your event <span style={{ fontStyle: 'italic', color: 'var(--clay)' }}>unforgettable</span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '2rem' }} className="leading-relaxed">
          Elevate your event with our premium photobooth. Instant prints, endless fun, and memories that linger.
        </p>
        <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
          See Packages
        </Link>
      </section>

      {/* Service Areas Section */}
      <section id="packages" style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Serving Your Region
          </h2>
          <p style={{ color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            We proudly serve events throughout Southern Ontario, including:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/kawartha-lakes" className="card hover:shadow-lg transition-shadow">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Kawartha Lakes
              </h3>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>
                Lindsay, Port Perry & surrounding areas
              </p>
            </Link>

            <Link href="/prince-edward-county" className="card hover:shadow-lg transition-shadow">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Prince Edward County
              </h3>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>
                Picton, Bloomfield & wine country
              </p>
            </Link>

            <Link href="/belleville" className="card hover:shadow-lg transition-shadow">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Belleville
              </h3>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>
                Belleville & surrounding communities
              </p>
            </Link>

            <Link href="/durham-region" className="card hover:shadow-lg transition-shadow">
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Durham Region
              </h3>
              <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>
                Ajax, Pickering, Whitby, Oshawa & more
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ backgroundColor: 'var(--blush)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Why Choose Seven Events?
          </h2>
          <p style={{ color: 'var(--ink)', lineHeight: '1.8', textAlign: 'center' }}>
            Our photobooth is not just a photo-taking station; it's a vibrant and interactive space that adds an extra layer of fun and excitement to any event. Whether you're hosting a wedding, corporate event, birthday party, or any special occasion, our premium photobooth service is the perfect addition to make your event unforgettable.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <h2 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
          Ready to Book?
        </h2>
        <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
          Check out our packages and reserve your date today.
        </p>
        <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
          Book Your Event
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="py-8 mt-12 text-center">
        <p style={{ marginBottom: '1rem' }}>Proudly serving Southern Ontario</p>
        <p>&copy; 2024 Seven Events Photobooth. All rights reserved.</p>
      </footer>
    </main>
  );
}
