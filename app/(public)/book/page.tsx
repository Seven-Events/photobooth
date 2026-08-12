import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import BookingForm from '@/components/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Book Your Photobooth | Seven Events',
  description: 'Check availability and reserve your photobooth for weddings, corporate events and parties in Southern Ontario.',
};

export default function BookPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '5rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span className="pill" style={{ backgroundColor: 'var(--sage)', color: 'var(--ink)' }}>
            Check availability
          </span>
          <h1
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              margin: '1.75rem 0 1.25rem',
            }}
          >
            Book your photobooth
          </h1>
          <p style={{ fontSize: '1.15rem' }}>
            Pick your booth and date below, then pay a deposit to hold it. We confirm every booking
            by email within 24 hours.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 2rem 5rem' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <BookingForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
