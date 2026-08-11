import Link from 'next/link';

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      <nav style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} className="p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', fontWeight: 600, color: 'var(--cream)', textDecoration: 'none' }}>Seven Events</Link>
        </div>
      </nav>

      <section style={{ padding: '4rem 2rem' }}>
        <div className="max-w-3xl mx-auto">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '3rem' }}>
            Terms of Service
          </h1>

          <div style={{ color: 'var(--ink)', lineHeight: '1.8' }}>
            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Agreement to Terms
            </h2>
            <p>By using Seven Events Photobooth's website and services, you agree to be bound by these Terms of Service.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Use License
            </h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Seven Events Photobooth's website for personal, non-commercial transitory viewing only.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Disclaimer
            </h2>
            <p>The materials on Seven Events Photobooth's website are provided on an 'as is' basis. Seven Events Photobooth makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Booking Policy
            </h2>
            <p>Bookings are subject to availability and confirmation. Cancellations must be made 48 hours in advance for a full refund.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Contact
            </h2>
            <p>If you have any questions about these Terms, please contact us at info@seveneventsphotobooth.com</p>
          </div>

          <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--clay)', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to Home
          </Link>
        </div>
      </section>

      <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '3rem 2rem', marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem' }}>&copy; 2024 Seven Events Photobooth</p>
      </footer>
    </main>
  );
}
