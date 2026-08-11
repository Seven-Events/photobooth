'use client';

import Link from 'next/link';

export default function Home() {
  const testimonials = [
    {
      name: 'Sarah & John',
      event: 'Wedding',
      text: 'Our guests couldn\'t stop talking about the photobooth! It was the highlight of our reception.',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      event: 'Corporate Event',
      text: 'Professional, fun, and memorable. Our team loved it and we got incredible photos to remember the day.',
      rating: 5,
    },
    {
      name: 'The Martinez Family',
      event: 'Birthday Party',
      text: 'The kids had such a blast! The props and instant prints were perfect. Highly recommend!',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: '📸',
      title: 'Professional Quality Photos',
      description: 'High-resolution images captured with premium equipment and lighting.',
    },
    {
      icon: '🎨',
      title: 'Custom Backdrops & Themes',
      description: 'Personalized designs that match your event\'s aesthetic and brand.',
    },
    {
      icon: '🖨️',
      title: 'Instant Prints',
      description: 'Guests take home physical prints as keepsakes from your event.',
    },
    {
      icon: '📱',
      title: 'Digital Sharing',
      description: 'Share photos directly to social media or email with one click.',
    },
    {
      icon: '🎭',
      title: 'Fun Props & Accessories',
      description: 'Curated collection of props that add personality to every photo.',
    },
    {
      icon: '👨‍💼',
      title: 'Professional Attendant',
      description: 'Friendly staff ensures smooth operation throughout your event.',
    },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600, color: 'var(--cream)', textDecoration: 'none' }}>
            Seven Events Photobooth
          </Link>
          <div className="space-x-8 hidden md:flex">
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/book" style={{ color: 'var(--clay)' }} className="font-semibold hover:opacity-80 transition-opacity">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        backgroundImage: 'linear-gradient(135deg, rgba(74, 107, 102, 0.9) 0%, rgba(232, 168, 155, 0.9) 100%)',
        color: 'var(--cream)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 700 }}>
            Make Your Event Unforgettable
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.6', opacity: 0.95 }}>
            Premium photobooth entertainment that creates lasting memories for you and your guests
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/book" className="button-primary" style={{ display: 'inline-block', backgroundColor: 'var(--clay)', color: 'var(--ink)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Book Your Event
            </Link>
            <Link href="/packages" style={{ display: 'inline-block', backgroundColor: 'transparent', border: '2px solid var(--cream)', color: 'var(--cream)', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', fontWeight: 600 }}>
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section style={{ backgroundColor: 'var(--paper)', padding: '3rem 2rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <p style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--clay)', fontWeight: 700 }}>500+</p>
            <p style={{ color: 'var(--ink)' }}>Events Captured</p>
          </div>
          <div>
            <p style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--clay)', fontWeight: 700 }}>2000+</p>
            <p style={{ color: 'var(--ink)' }}>Happy Guests</p>
          </div>
          <div>
            <p style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--clay)', fontWeight: 700 }}>10+</p>
            <p style={{ color: 'var(--ink)' }}>Years Experience</p>
          </div>
          <div>
            <p style={{ fontFamily: 'Fraunces', fontSize: '2rem', color: 'var(--clay)', fontWeight: 700 }}>4.9★</p>
            <p style={{ color: 'var(--ink)' }}>Average Rating</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem' }}>
            Why Choose Seven Events?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--ink)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section style={{ backgroundColor: 'var(--blush)', padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem' }}>
            Proudly Serving Southern Ontario
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/kawartha-lakes" className="card hover:shadow-lg transition-shadow cursor-pointer">
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Kawartha Lakes
              </h3>
              <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Lindsay, Port Perry, Bobcaygeon & surrounding areas
              </p>
              <span style={{ color: 'var(--clay)', fontWeight: 600 }}>Learn more →</span>
            </Link>

            <Link href="/prince-edward-county" className="card hover:shadow-lg transition-shadow cursor-pointer">
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Prince Edward County
              </h3>
              <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Picton, Bloomfield, Wellington & wine country
              </p>
              <span style={{ color: 'var(--clay)', fontWeight: 600 }}>Learn more →</span>
            </Link>

            <Link href="/belleville" className="card hover:shadow-lg transition-shadow cursor-pointer">
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Belleville
              </h3>
              <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Belleville, Quinte West & surrounding communities
              </p>
              <span style={{ color: 'var(--clay)', fontWeight: 600 }}>Learn more →</span>
            </Link>

            <Link href="/durham-region" className="card hover:shadow-lg transition-shadow cursor-pointer">
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                Durham Region
              </h3>
              <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
                Ajax, Pickering, Whitby, Oshawa, Bowmanville & more
              </p>
              <span style={{ color: 'var(--clay)', fontWeight: 600 }}>Learn more →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem' }}>
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card">
                <div style={{ marginBottom: '1rem' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: 'var(--clay)' }}>★</span>
                  ))}
                </div>
                <p style={{ color: 'var(--ink)', marginBottom: '1rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "{testimonial.text}"
                </p>
                <p style={{ color: 'var(--ink)', fontWeight: 600 }}>
                  {testimonial.name}
                </p>
                <p style={{ color: 'var(--clay)', fontSize: '0.875rem' }}>
                  {testimonial.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: 'var(--paper)', padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Ready to Create Unforgettable Memories?
          </h2>
          <p style={{ color: 'var(--ink)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Reserve your photobooth today and make your event truly special
          </p>
          <Link href="/book" className="button-primary" style={{ display: 'inline-block', backgroundColor: 'var(--clay)', color: 'var(--ink)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Book Your Event
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Navigation</h4>
            <div className="space-y-2">
              <Link href="/packages" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Packages</Link><br/>
              <Link href="/gallery" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Gallery</Link><br/>
              <Link href="/faq" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">FAQs</Link><br/>
              <Link href="/contact" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Service Areas</h4>
            <div className="space-y-2">
              <Link href="/kawartha-lakes" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Kawartha Lakes</Link><br/>
              <Link href="/prince-edward-county" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">PEC</Link><br/>
              <Link href="/belleville" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Belleville</Link><br/>
              <Link href="/durham-region" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Durham</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Fraunces', fontSize: '1.125rem', marginBottom: '1rem' }}>Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Privacy Policy</Link><br/>
              <Link href="/terms" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Terms of Service</Link>
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
