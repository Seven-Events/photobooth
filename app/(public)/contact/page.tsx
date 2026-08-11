import Link from 'next/link';

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600, color: 'var(--cream)', textDecoration: 'none' }}>Seven Events</Link>
          <div className="space-x-8 hidden md:flex">
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/packages" className="hover:text-white">Packages</Link>
            <Link href="/gallery" className="hover:text-white">Gallery</Link>
            <Link href="/faq" className="hover:text-white">FAQs</Link>
            <Link href="/contact" className="hover:text-white font-semibold">Contact</Link>
            <Link href="/book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-3xl mx-auto">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem' }}>
            Get in Touch
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem' }}>
                Contact Information
              </h3>
              <div style={{ color: 'var(--ink)' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Email:</strong><br/>
                  info@seveneventsphotobooth.com
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Service Areas:</strong><br/>
                  Kawartha Lakes, Prince Edward County, Belleville, Durham Region
                </p>
                <p>
                  <strong>Response Time:</strong><br/>
                  We typically reply within 24 hours
                </p>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem' }}>
                Quick Booking
              </h3>
              <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Ready to book? Head over to our booking page to get started right away.
              </p>
              <Link href="/book" style={{ display: 'inline-block', backgroundColor: 'var(--clay)', color: 'var(--ink)', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', fontWeight: 600, textDecoration: 'none' }}>
                Book Now
              </Link>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--blush)', padding: '2rem', borderRadius: '0.5rem', marginTop: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Questions Before Booking?
            </h2>
            <p style={{ color: 'var(--ink)' }}>
              Email us at info@seveneventsphotobooth.com and we'll be happy to help!
            </p>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem', marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem' }}>&copy; 2024 Seven Events Photobooth</p>
      </footer>
    </main>
  );
}
