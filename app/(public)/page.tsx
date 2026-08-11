'use client';

import Link from 'next/link';

export default function Home() {
  const testimonials = [
    {
      name: 'Sarah & John',
      event: 'WEDDING',
      text: 'Our guests couldn\'t stop talking about the photobooth! It was the highlight of our reception.',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      event: 'CORPORATE EVENT',
      text: 'Professional, fun, and memorable. Our team loved it and we got incredible photos to remember the day.',
      rating: 5,
    },
    {
      name: 'The Martinez Family',
      event: 'BIRTHDAY PARTY',
      text: 'The kids had such a blast! The props and instant prints were perfect. Highly recommend!',
      rating: 5,
    },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--cream)', textDecoration: 'none' }}>
            Seven Events
          </Link>
          <div className="space-x-6 hidden md:flex text-sm font-500">
            <Link href="/#services" className="hover:opacity-80 transition-opacity">Services</Link>
            <Link href="/packages" className="hover:opacity-80 transition-opacity">Packages</Link>
            <Link href="/gallery" className="hover:opacity-80 transition-opacity">Gallery</Link>
            <Link href="/faq" className="hover:opacity-80 transition-opacity">FAQs</Link>
            <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
          </div>
          <Link href="/book" style={{
            backgroundColor: 'var(--clay)',
            color: 'var(--ink)',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.875rem'
          }}>
            Book Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '5rem 2rem 0' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 style={{
            color: 'var(--ink)',
            fontSize: '4.5rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
            lineHeight: '1.1'
          }}>
            MAKE YOUR EVENT UNFORGETTABLE WITH INSTANT PHOTO & VIDEO EXPERIENCES
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--ink)',
            marginBottom: '3rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Seven Events is your go-to photobooth team. Check out some of what we get to do!
          </p>
          <div style={{
            width: '40px',
            height: '40px',
            margin: '0 auto 3rem',
            color: 'var(--clay)',
            fontSize: '2rem'
          }}>
            ↓
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section style={{ padding: '3rem 2rem' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{
            backgroundColor: 'var(--paper)',
            borderRadius: '2rem',
            padding: '3rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              backgroundColor: 'var(--clay)',
              opacity: 0.1,
              borderRadius: '50%'
            }} />
            <h2 style={{
              fontSize: '2.5rem',
              color: 'var(--ink)',
              marginBottom: '1rem',
              fontWeight: 700,
              position: 'relative',
              zIndex: 1
            }}>
              WHY CHOOSE US?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--ink)',
              opacity: 0.7,
              marginBottom: '2rem',
              position: 'relative',
              zIndex: 1
            }}>
              Professional quality photos, custom backdrops, instant prints, digital sharing, fun props, and a professional attendant for every event.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--clay)' }}>500+</p>
                <p style={{ color: 'var(--ink)', opacity: 0.7 }}>Events Captured</p>
              </div>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--clay)' }}>2000+</p>
                <p style={{ color: 'var(--ink)', opacity: 0.7 }}>Happy Guests</p>
              </div>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--clay)' }}>10+</p>
                <p style={{ color: 'var(--ink)', opacity: 0.7 }}>Years Experience</p>
              </div>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--clay)' }}>4.9★</p>
                <p style={{ color: 'var(--ink)', opacity: 0.7 }}>Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas as Featured Cards */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{
            fontSize: '3.5rem',
            color: 'var(--ink)',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: 700
          }}>
            PROUDLY SERVING SOUTHERN ONTARIO
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { name: 'Kawartha Lakes', desc: 'Lindsay, Port Perry, Bobcaygeon & surrounding areas', href: '/kawartha-lakes' },
              { name: 'Prince Edward County', desc: 'Picton, Bloomfield, Wellington & wine country', href: '/prince-edward-county' },
              { name: 'Belleville', desc: 'Belleville, Quinte West & surrounding communities', href: '/belleville' },
              { name: 'Durham Region', desc: 'Ajax, Pickering, Whitby, Oshawa, Bowmanville & more', href: '/durham-region' }
            ].map((area) => (
              <Link
                key={area.name}
                href={area.href}
                style={{
                  backgroundColor: 'var(--cream)',
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: '2px solid var(--line)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'block'
                }}
                className="hover:shadow-lg"
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--clay)',
                  marginBottom: '0.75rem'
                }}>
                  {area.name}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--ink)',
                  opacity: 0.7
                }}>
                  {area.desc}
                </p>
                <p style={{
                  marginTop: '1rem',
                  color: 'var(--clay)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{
            fontSize: '3.5rem',
            color: 'var(--ink)',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: 700
          }}>
            PEOPLE LOVE US!
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  backgroundColor: 'var(--paper)',
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  border: '2px solid var(--sage)',
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#FDB022', fontSize: '1.25rem' }}>★</span>
                  ))}
                </div>
                <p style={{
                  color: 'var(--ink)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  flex: 1
                }}>
                  "{t.text}"
                </p>
                <div>
                  <p style={{
                    color: 'var(--ink)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    color: 'var(--sage)',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {t.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: 'var(--paper)',
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-50px',
          width: '150px',
          height: '150px',
          backgroundColor: 'var(--clay)',
          opacity: 0.08,
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-50px',
          width: '200px',
          height: '200px',
          backgroundColor: 'var(--sage)',
          opacity: 0.08,
          borderRadius: '50%'
        }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 style={{
            fontSize: '3.5rem',
            color: 'var(--ink)',
            marginBottom: '1.5rem',
            fontWeight: 700
          }}>
            MAKE YOUR NEXT EVENT UNFORGETTABLE
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--ink)',
            marginBottom: '2rem',
            opacity: 0.7
          }}>
            Ready to book? Schedule a call or browse our packages and get started today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/book" style={{
              backgroundColor: 'var(--clay)',
              color: 'var(--ink)',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-block'
            }}>
              Book Your Event →
            </Link>
            <Link href="/packages" style={{
              backgroundColor: 'transparent',
              color: 'var(--ink)',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              fontWeight: 700,
              border: '2px solid var(--ink)',
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-block'
            }}>
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '4rem 2rem' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigation</h4>
            <div className="space-y-2">
              <Link href="/packages" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Packages</Link>
              <Link href="/gallery" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Gallery</Link>
              <Link href="/faq" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">FAQs</Link>
              <Link href="/contact" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Areas</h4>
            <div className="space-y-2">
              <Link href="/kawartha-lakes" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Kawartha Lakes</Link>
              <Link href="/prince-edward-county" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Prince Edward County</Link>
              <Link href="/belleville" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Belleville</Link>
              <Link href="/durham-region" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Durham Region</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Privacy Policy</Link>
              <Link href="/terms" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.875rem' }} className="block hover:opacity-80">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</h4>
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
