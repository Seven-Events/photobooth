import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Photobooth FAQs | Seven Events',
  description:
    'Answers to common photobooth rental questions: rental length, backdrops, prints, digital sharing and booking lead time.',
};

const faqs = [
  { q: 'How long does the photobooth rental last?', a: 'Our packages range from 2 to 8 hours. We also offer hourly add-ons for extended events.' },
  { q: 'Can I customize the backdrop?', a: 'Absolutely. We offer custom backdrop designs tailored to your event theme and branding.' },
  { q: 'How many guests can use the photobooth?', a: 'All our packages support unlimited guests and unlimited sessions.' },
  { q: 'Do you provide instant prints?', a: 'Yes. Guests receive instant printed photos from every session.' },
  { q: 'Can guests share photos digitally?', a: 'Yes, they can share directly to social media or receive digital copies by email.' },
  { q: 'What if my event is outside your service area?', a: 'Get in touch to discuss custom arrangements. We can often accommodate travel requests.' },
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 2 to 4 weeks in advance for the best availability.' },
  { q: 'Is a professional attendant included?', a: 'Yes, every package includes an attendant who runs the booth for the full rental.' },
];

export default function FAQPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Good to know
          </span>
          <h1
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              margin: '1.75rem 0 1.25rem',
            }}
          >
            Frequently asked questions
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Everything couples and planners ask us before booking. Still stuck? We reply within a day.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 2rem 5rem' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {faqs.map((item) => (
            <div
              key={item.q}
              style={{
                backgroundColor: 'var(--paper)',
                borderRadius: '1.25rem',
                padding: '2rem',
                border: '1px solid var(--line)',
              }}
            >
              <h4 style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>{item.q}</h4>
              <p style={{ fontSize: '0.95rem', margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: '900px',
            margin: '3rem auto 0',
            backgroundColor: 'var(--ink)',
            borderRadius: '1.75rem',
            padding: '3rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: 'var(--cream)', fontSize: '1.75rem', marginBottom: '1rem' }}>
            Still have questions?
          </h3>
          <p style={{ color: 'rgba(250,247,239,0.75)', marginBottom: '2rem' }}>
            Send us a note and we will get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--clay)',
              color: 'var(--ink)',
              padding: '1rem 2.25rem',
              borderRadius: '999px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Contact Us →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
