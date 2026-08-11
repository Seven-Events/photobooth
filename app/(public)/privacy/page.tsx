import Link from 'next/link';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div style={{ color: 'var(--ink)', lineHeight: '1.8' }}>
            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Introduction
            </h2>
            <p>Seven Events Photobooth ("we" or "us" or "our") operates the seveneventsphotobooth.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Information Collection and Use
            </h2>
            <p>We collect several different types of information for various purposes to provide and improve our service.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Security of Data
            </h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

            <h2 style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Contact Us
            </h2>
            <p>If you have questions about this Privacy Policy, please contact us at info@seveneventsphotobooth.com</p>
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
