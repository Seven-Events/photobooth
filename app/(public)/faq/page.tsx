import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    { q: 'How long does the photobooth rental last?', a: 'Our packages range from 2 to 8 hours. We also offer hourly add-ons for extended events.' },
    { q: 'Can I customize the backdrop?', a: 'Absolutely! We offer custom backdrop designs tailored to your event theme and branding.' },
    { q: 'How many guests can use the photobooth?', a: 'All our packages support unlimited guests. The more people, the more fun!' },
    { q: 'Do you provide instant prints?', a: 'Yes! Guests receive instant printed photos from every session.' },
    { q: 'Can guests share photos digitally?', a: 'Yes, they can share directly to social media or receive digital copies via email.' },
    { q: 'What if I need the photobooth outside our service area?', a: 'Contact us to discuss custom arrangements. We may be able to accommodate requests.' },
    { q: 'How far in advance should I book?', a: 'We recommend booking at least 2-4 weeks in advance for best availability.' },
    { q: 'Is a professional attendant included?', a: 'Yes, all packages include a professional attendant to manage the photobooth.' },
  ];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600, color: 'var(--cream)', textDecoration: 'none' }}>Seven Events</Link>
          <div className="space-x-8 hidden md:flex">
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/packages" className="hover:text-white">Packages</Link>
            <Link href="/gallery" className="hover:text-white">Gallery</Link>
            <Link href="/faq" className="hover:text-white font-semibold">FAQs</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/book" style={{ color: 'var(--clay)' }} className="font-semibold">Book Now</Link>
          </div>
        </div>
      </nav>

      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-3xl mx-auto">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem' }}>
            Frequently Asked Questions
          </h1>

          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="card">
                <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>
                  {item.q}
                </h3>
                <p style={{ color: 'var(--ink)', lineHeight: '1.6' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'var(--blush)', padding: '2rem', borderRadius: '0.5rem', marginTop: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>
              Still have questions?
            </h2>
            <Link href="/contact" style={{ display: 'inline-block', backgroundColor: 'var(--clay)', color: 'var(--ink)', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', fontWeight: 600, textDecoration: 'none' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '6rem', margin: '0 auto', textAlign: 'center', fontSize: '0.875rem' }}>
          &copy; 2024 Seven Events Photobooth
        </div>
      </footer>
    </main>
  );
}
