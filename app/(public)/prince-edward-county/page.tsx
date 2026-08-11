import Link from 'next/link';
import { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Prince Edward County Photobooth | Premium Photo Booth Rental',
  description: 'Photobooth rental for weddings, events, and celebrations throughout Prince Edward County. Create lasting memories with our premium service.',
  keywords: 'photobooth Prince Edward County, PEC photobooth, Picton photobooth, photobooth rental',
  openGraph: {
    title: 'Prince Edward County Photobooth',
    description: 'Premium photobooth rental services for Prince Edward County events',
  },
};

export default function PECPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <SiteNav />

      <section className="px-4 py-16 text-center max-w-4xl mx-auto">
        <h1 style={{ fontSize: '3rem', color: 'var(--ink)' }} className="mb-6">
          Prince Edward County Photobooth
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--clay)', marginBottom: '1rem' }}>
          Capture the Magic of Your Event
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '2rem', lineHeight: '1.8' }}>
          Bring the fun and excitement to your Prince Edward County celebration with our premium photobooth services. Perfect for vineyard weddings, farm events, celebrations in Picton, Bloomfield, and throughout the county.
        </p>
        <Link href="#book" className="button-primary" style={{ display: 'inline-block' }}>
          Book Your Event
        </Link>
      </section>

      <section style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto">
          <h3 style={{ fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Why Choose Seven Events for Your PEC Event?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Professional Quality
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                High-resolution photos that capture the beauty and elegance of your Prince Edward County venue.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Rustic & Elegant Themes
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Custom backdrops designed to complement PEC's natural beauty and vineyard aesthetic.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Instant Prints & Digital
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Give guests the perfect keepsake with immediate prints, plus digital sharing options.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Outdoor-Ready
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our equipment is designed for outdoor venues, vineyards, gardens, and farm settings.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Fun Props & Accessories
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Curated selection of props that enhance the experience and capture genuine smiles.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Professional Attendant
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our friendly staff guides guests and ensures your photobooth runs smoothly all event long.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 style={{ fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
          Simple & Fun Process
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
            <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
              Strike a Pose
            </h4>
            <p style={{ color: 'var(--ink)' }}>
              Choose your favorite props and get ready for an unforgettable moment.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
              Smile & Snap
            </h4>
            <p style={{ color: 'var(--ink)' }}>
              Professional camera captures the perfect moment with you looking fabulous.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
            <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
              Take & Share
            </h4>
            <p style={{ color: 'var(--ink)' }}>
              Instant prints or digital copies—memories you'll treasure forever.
            </p>
          </div>
        </div>
      </section>

      <section id="book" style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 style={{ fontSize: '2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Ready to Add Photobooth Magic to Your Prince Edward County Event?
          </h3>
          <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
            Let us help you create unforgettable memories for you and your guests.
          </p>
          <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
            Book Now
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
