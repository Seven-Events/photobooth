import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Photobooth FAQs | Seven Events',
  description:
    'Answers to common photobooth rental questions: rental length, backdrops, prints, digital sharing and booking lead time.',
};

// Keep these honest and specific to the real packages. Two of the three booths
// are self-serve drop-offs with no attendant, and only some packages include
// prints — blanket "every package includes…" answers are how this page ends up
// promising things we do not sell.
const faqs = [
  {
    q: 'How long do we get the booth for?',
    a: 'The Snap and Oak drop-off packages give you up to 14 hours of unlimited use. Attendant-staffed packages run 2, 3 or 4 hours, and Completely Captured covers 1.5 hours of cocktail hour plus 3 hours of the reception.',
  },
  {
    q: 'Is an attendant included?',
    a: 'On the Mod Booth, yes — an attendant runs it for the whole event. The Snap and Oak drop-off packages are self-serve: we deliver, set up and collect, and the booth is simple enough that guests run it themselves.',
  },
  {
    q: 'Do we get prints?',
    a: 'It depends on the package. The Oak print drop-off includes up to 300 prints, and attendant-staffed packages with prints are unlimited. The Snap digital drop-off is digital only — every photo goes straight to guests’ phones instead.',
  },
  {
    q: 'How many guests can use it?',
    a: 'As many as you like. There is never a cap on guests or on how many times someone jumps in — only print counts vary by package.',
  },
  {
    q: 'Can guests get their photos on their phones?',
    a: 'Yes. There is a live gallery guests can text or email to themselves before they have even left the booth, and you get a link to every photo afterwards.',
  },
  {
    q: 'Can I customise the backdrop and the print template?',
    a: 'Yes to both. Every package includes your choice of premium backdrop, and you can design your own photo template in Canva from your dashboard — or send us a design and we will match it exactly.',
  },
  {
    q: 'When do you arrive?',
    a: 'We arrive 45 minutes before your start time to set up, and pack down afterwards without interrupting the party. If you need us in earlier, that can be added on for an extra fee.',
  },
  {
    q: 'Do you charge for travel?',
    a: 'Not within 100 km of Omemee, which covers most of Kawartha Lakes, Prince Edward County, Belleville and Durham Region. Further afield, get in touch and we will quote it.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'Two to four weeks is usually enough, but summer Saturdays go early. We hold one booking per booth per day, so the sooner you check your date the better.',
  },
  {
    q: 'How does payment work?',
    a: 'A deposit holds your date, and the balance is invoiced before the event. All prices are plus HST, and there is nothing else added at the end.',
  },
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
