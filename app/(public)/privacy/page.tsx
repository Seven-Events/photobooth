import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | Seven Events Photobooth',
  description: 'How Seven Events Photobooth collects, uses and protects your personal data.',
};

const sections = [
  {
    title: 'Introduction',
    body: 'Seven Events Photobooth operates the seveneventsphotobooth.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.',
  },
  {
    title: 'Information collection and use',
    body: 'We collect several different types of information for various purposes to provide and improve our service, including contact details you submit when booking an event.',
  },
  {
    title: 'Security of data',
    body: 'The security of your data is important to us, but no method of transmission over the Internet or method of electronic storage is 100% secure.',
  },
  {
    title: 'Contact us',
    body: 'If you have questions about this Privacy Policy, please contact us at info@seveneventsphotobooth.com.',
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <SiteNav />

      <section style={{ padding: '6rem 2rem 5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(2.25rem, 6vw, 3.5rem)', marginBottom: '2.5rem' }}>
            Privacy policy
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
