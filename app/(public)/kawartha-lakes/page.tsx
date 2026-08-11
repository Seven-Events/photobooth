import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kawartha Lakes Photobooth Rental | Seven Events',
  description: 'Premium photobooth rental services for weddings, corporate events, and celebrations in Kawartha Lakes, Lindsay, Port Perry, and surrounding areas.',
  keywords: 'photobooth rental Kawartha Lakes, Lindsay photobooth, Port Perry photobooth, event photobooth',
  openGraph: {
    title: 'Kawartha Lakes Photobooth Rental',
    description: 'Elevate your Kawartha Lakes event with our premium photobooth services',
    type: 'website',
  },
};

export default function KawarthaLakesPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      {/* Navigation */}
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600 }}>
            Seven Events Photobooth
          </Link>
          <div className="space-x-6 hidden md:flex">
            <Link href="/#packages" className="hover:text-white">Packages</Link>
            <Link href="/kawartha-lakes#book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-16 text-center max-w-4xl mx-auto">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '3rem', color: 'var(--ink)' }} className="mb-6">
          Kawartha Lakes Photobooth
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--clay)', marginBottom: '1rem' }}>
          Create Memorable Experiences
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '2rem', lineHeight: '1.8' }}>
          Elevate your Kawartha Lakes event to a whole new level with our premium event photobooth services. Whether it's a wedding, birthday bash, corporate gathering, or any special occasion, our photobooth brings fun and excitement, creating treasured memories.
        </p>
        <Link href="#book" className="button-primary" style={{ display: 'inline-block' }}>
          Book Your Event
        </Link>
      </section>

      {/* Why Choose Section */}
      <section style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto">
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Why Choose Seven Events in Kawartha Lakes?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                High-Quality Photos
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our advanced photobooth captures professional-grade, high-resolution photos that will showcase the elegance and joy of your event.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Customizable Themes
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                From elegant backdrops to personalized photo templates, we tailor the photobooth experience to match your event's unique style.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Instant Photo Prints
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Guests can take home instant photo prints as cherished keepsakes, ensuring they remember the wonderful moments from your event.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Digital Sharing
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Share the joy online! Guests can instantly share their photos on social media platforms directly from our photobooth.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Diverse Prop Collection
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our photobooth offers a wide range of fun props that add a playful and creative element to every snapshot.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Expert Attendant
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                A friendly attendant will be present throughout the event to assist guests, ensuring a seamless and enjoyable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
          How It Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
              Capture the Moments
            </h4>
            <p style={{ color: 'var(--ink)' }}>
              Step into our photobooth and strike a pose using the variety of props available.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
              Create Memories
            </h4>
            <p style={{ color: 'var(--ink)' }}>
              Our photobooth captures your moments with high-quality photos, ensuring everyone looks their best.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
              Print or Share
            </h4>
            <p style={{ color: 'var(--ink)' }}>
              Choose to print your photos instantly or share them digitally on social media.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Ready to Enhance Your Kawartha Lakes Event?
          </h3>
          <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
            Book our premium photobooth service today and create unforgettable memories with your guests.
          </p>
          <Link href="/book" className="button-primary" style={{ display: 'inline-block' }}>
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="py-8 mt-12 text-center">
        <p>&copy; 2024 Seven Events Photobooth. All rights reserved.</p>
      </footer>
    </main>
  );
}
