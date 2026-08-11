import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Belleville Photobooth | Premium Photo Booth Rental',
  description: 'Professional photobooth rental services for weddings, corporate events, and celebrations in Belleville and surrounding area.',
  keywords: 'photobooth Belleville, Belleville photobooth rental, event photobooth services',
};

export default function BellevillePage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600 }}>
            Seven Events Photobooth
          </Link>
          <div className="space-x-6 hidden md:flex">
            <Link href="/#packages" className="hover:text-white">Packages</Link>
            <Link href="/belleville#book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      <section className="px-4 py-16 text-center max-w-4xl mx-auto">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '3rem', color: 'var(--ink)' }} className="mb-6">
          Belleville Photobooth
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--clay)', marginBottom: '1rem' }}>
          Make Your Event Unforgettable
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '2rem', lineHeight: '1.8' }}>
          Looking to add excitement and lasting memories to your Belleville event? Our premium photobooth service is perfect for weddings, corporate functions, birthday celebrations, and more.
        </p>
        <Link href="#book" className="button-primary" style={{ display: 'inline-block' }}>
          Book Your Event
        </Link>
      </section>

      <section style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto">
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Why Belleville Events Choose Seven Events
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Crystal-Clear Photos
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Professional-grade equipment ensures every photo is sharp, vibrant, and picture-perfect.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Custom Designs
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Personalize your photobooth experience with custom backdrops and templates for your event.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Instant Gratification
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Guests walk away with printed photos and digital copies to share on social media.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Reliable & Professional
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our experienced team ensures smooth operation and exceptional service throughout your event.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Fun Props & Accessories
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                An exciting collection of props and accessories for every type of celebration.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Guest Engagement
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our photobooth keeps guests entertained and creates talking points throughout your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
          Easy & Enjoyable
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>Step In</h4>
            <p style={{ color: 'var(--ink)' }}>Choose your props and get ready to smile.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>Strike a Pose</h4>
            <p style={{ color: 'var(--ink)' }}>Capture the moment with professional photography.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>Keep the Memory</h4>
            <p style={{ color: 'var(--ink)' }}>Take home prints and digital copies instantly.</p>
          </div>
        </div>
      </section>

      <section id="book" style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Ready to Book Your Belleville Event?
          </h3>
          <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
            Contact us today to reserve your photobooth and make your event truly memorable.
          </p>
          <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
            Book Now
          </Link>
        </div>
      </section>

      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="py-8 mt-12 text-center">
        <p>&copy; 2024 Seven Events Photobooth. All rights reserved.</p>
      </footer>
    </main>
  );
}
