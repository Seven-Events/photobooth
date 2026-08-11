import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | Seven Events Photobooth',
  description: 'Browse our collection of professional photobooth events',
};

export default function GalleryPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600, color: 'var(--cream)', textDecoration: 'none' }}>Seven Events</Link>
          <div className="space-x-8 hidden md:flex">
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/packages" className="hover:text-white">Packages</Link>
            <Link href="/gallery" className="hover:text-white font-semibold">Gallery</Link>
            <Link href="/faq" className="hover:text-white">FAQs</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem' }}>
            Event Gallery
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--paper)',
                borderRadius: '0.5rem',
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink)',
                textAlign: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📸</div>
                  <p>Gallery Coming Soon</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'var(--blush)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Ready to Create Memories?
            </h2>
            <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
              Book your photobooth and see your event featured in our gallery
            </p>
            <Link href="/book" style={{ display: 'inline-block', backgroundColor: 'var(--clay)', color: 'var(--ink)', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', fontWeight: 600, textDecoration: 'none' }}>
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem', marginTop: '3rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div><h4 style={{ fontFamily: 'Fraunces', marginBottom: '1rem' }}>Navigation</h4><Link href="/" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }}>Home</Link></div>
          <div><h4 style={{ fontFamily: 'Fraunces', marginBottom: '1rem' }}>Service Areas</h4><Link href="/kawartha-lakes" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }}>Kawartha Lakes</Link></div>
          <div><h4 style={{ fontFamily: 'Fraunces', marginBottom: '1rem' }}>Legal</h4><Link href="/privacy" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy</Link></div>
          <div><h4 style={{ fontFamily: 'Fraunces', marginBottom: '1rem' }}>Contact</h4><p style={{ fontSize: '0.875rem' }}>info@seveneventsphotobooth.com</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', textAlign: 'center' }}><p style={{ fontSize: '0.875rem' }}>&copy; 2024 Seven Events Photobooth</p></div>
      </footer>
    </main>
  );
}
