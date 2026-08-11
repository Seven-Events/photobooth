import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Durham Region Photobooth | Ajax, Pickering, Whitby, Oshawa',
  description: 'Premium photobooth rental services throughout Durham Region including Ajax, Pickering, Whitby, Oshawa, and Bowmanville.',
  keywords: 'Durham photobooth, Ajax photobooth, Pickering photobooth, Whitby photobooth, Oshawa photobooth',
};

export default function DurhamPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600 }}>
            Seven Events Photobooth
          </Link>
          <div className="space-x-6 hidden md:flex">
            <Link href="/#packages" className="hover:text-white">Packages</Link>
            <Link href="/durham-region#book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      <section className="px-4 py-16 text-center max-w-4xl mx-auto">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '3rem', color: 'var(--ink)' }} className="mb-6">
          Durham Region Photobooth
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--clay)', marginBottom: '1rem' }}>
          Serving Ajax, Pickering, Whitby, Oshawa & Beyond
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '2rem', lineHeight: '1.8' }}>
          Bring premium photobooth entertainment to your Durham Region event. Whether you're planning a wedding in Ajax, corporate event in Pickering, celebration in Whitby, or party in Oshawa, we've got you covered.
        </p>
        <Link href="#book" className="button-primary" style={{ display: 'inline-block' }}>
          Book Your Event
        </Link>
      </section>

      <section style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto">
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
            Why Durham Events Choose Seven Events
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Professional Photography
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                State-of-the-art camera equipment captures stunning, high-quality photos your guests will love.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Personalized Experiences
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Customize backdrops, props, and templates to perfectly match your event's theme and vibe.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Instant Prints & Digital
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Guests receive immediate physical prints plus digital copies for sharing online.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Professional Service
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Our trained attendants ensure smooth operation and excellent guest experience all event long.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Extensive Prop Selection
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                From funny accessories to elegant props—something for every personality and style.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                Guest Engagement
              </h4>
              <p style={{ color: 'var(--ink)' }}>
                Your photobooth becomes the highlight of your event, keeping guests entertained and engaged.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '2rem' }}>
          How Our Photobooth Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>Enter & Choose</h4>
            <p style={{ color: 'var(--ink)' }}>Pick your favorite props from our fun collection.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>Capture the Moment</h4>
            <p style={{ color: 'var(--ink)' }}>Professional photos that capture genuine smiles and joy.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
            <h4 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>Take Home Memories</h4>
            <p style={{ color: 'var(--ink)' }}>Instant prints and digital copies you'll treasure forever.</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--blush)', padding: '2rem', borderRadius: '0.5rem', marginY: '2rem' }} className="max-w-4xl mx-auto my-8">
        <p style={{ color: 'var(--ink)', fontWeight: 600, textAlign: 'center' }}>
          Serving all of Durham Region including: Ajax • Pickering • Whitby • Oshawa • Bowmanville • Courtice • Port Perry • Uxbridge • Stouffville • Lindsay and surrounding areas
        </p>
      </section>

      <section id="book" style={{ backgroundColor: 'var(--paper)', padding: '3rem' }} className="my-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Ready to Book for Your Durham Event?
          </h3>
          <p style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
            Reserve your photobooth today and create unforgettable memories with your guests.
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
