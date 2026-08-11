import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Terms of Service | Seven Events Photobooth',
  description: 'Booking, cancellation and usage terms for Seven Events Photobooth services.',
};

const sections = [
  {
    title: 'Agreement to terms',
    body: 'By using the Seven Events Photobooth website and services, you agree to be bound by these Terms of Service.',
  },
  {
    title: 'Use license',
    body: 'Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only.',
  },
  {
    title: 'Disclaimer',
    body: 'The materials on this website are provided on an as-is basis. Seven Events Photobooth makes no warranties, expressed or implied, and disclaims all other warranties including implied warranties of merchantability or fitness for a particular purpose.',
  },
  {
    title: 'Booking policy',
    body: 'Bookings are subject to availability and confirmation. Cancellations must be made 48 hours in advance for a full refund.',
  },
  {
    title: 'Contact',
    body: 'If you have any questions about these Terms, please contact us at info@seveneventsphotobooth.com.',
  },
];

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem 5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(2.25rem, 6vw, 3.5rem)', marginBottom: '2.5rem' }}>
            Terms of service
          </h1>

          {sections.map((s) => (
            <div
              key={s.title}
              style={{
                backgroundColor: 'var(--paper)',
                borderRadius: '1.25rem',
                padding: '2rem',
                border: '1px solid var(--line)',
                marginBottom: '1.25rem',
              }}
            >
              <h4 style={{ color: 'var(--ink)' }}>{s.title}</h4>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
