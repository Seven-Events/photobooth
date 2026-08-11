'use client';

import Link from 'next/link';
import { useState } from 'react';

// Sample Canva template IDs (you'll populate these with your actual Canva templates)
const canvaTemplates = [
  { id: 1, name: 'Wedding Frame', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 2, name: 'Birthday Party', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 3, name: 'Corporate Event', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 4, name: 'Engagement', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 5, name: 'Anniversary', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 6, name: 'Holiday Celebration', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 7, name: 'Graduation', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 8, name: 'Baby Shower', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 9, name: 'Retro Fun', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 10, name: 'Boho Elegant', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 11, name: 'Modern Minimal', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 12, name: 'Glamorous Gold', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 13, name: 'Sports Theme', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 14, name: 'Tropical Vibes', canvaDesignId: 'DAEpsYEk9Z4' },
  { id: 15, name: 'Vintage Charm', canvaDesignId: 'DAEpsYEk9Z4' },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleDesignTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
    // The Canva embed script will handle opening the editor
    // URL: https://www.canva.com/design/[DESIGN_ID]/edit
  };

  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Design Your Photo Templates
          </h1>
          <p style={{ color: 'var(--ink)' }}>Create custom templates for your event photos</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b" style={{ borderColor: 'var(--line)' }}>
          <Link href="/dashboard/events" className="pb-4" style={{ color: 'var(--ink)' }}>
            My Bookings
          </Link>
          <Link href="/dashboard/backdrops" className="pb-4" style={{ color: 'var(--ink)' }}>
            Backdrops
          </Link>
          <Link href="/dashboard/templates" className="pb-4 font-semibold" style={{ color: 'var(--clay)', borderBottom: '2px solid var(--clay)' }}>
            Templates
          </Link>
        </div>

        {/* Info Section */}
        <div style={{ backgroundColor: 'var(--paper)', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--clay)' }}>
          <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            💡 Customization Tips
          </h3>
          <ul style={{ color: 'var(--ink)', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Choose a pre-made template below as your starting point</li>
            <li>Click "Design This Template" to open Canva's editor</li>
            <li>Customize colors, text, add your logo, and personalize your template</li>
            <li>Save your design and download for printing</li>
          </ul>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canvaTemplates.map((template) => (
            <div key={template.id} className="card hover:shadow-lg transition-shadow">
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: 'var(--blush)',
                borderRadius: '0.25rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎨</div>
                  <p style={{ fontSize: '0.875rem' }}>Template Design</p>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Fraunces', color: 'var(--ink)', marginBottom: '1rem' }}>
                {template.name}
              </h3>
              <a
                href={`https://www.canva.com/design/${template.canvaDesignId}/edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
                style={{ width: '100%', textAlign: 'center', display: 'block', padding: '0.75rem' }}
              >
                Design This Template
              </a>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--paper)', borderRadius: '0.5rem' }}>
          <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>
            Need Help?
          </h3>
          <p style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
            Each template opens in Canva where you can customize every detail. No design experience needed!
          </p>
          <p style={{ color: 'var(--ink)', fontSize: '0.875rem' }}>
            For questions about templates, contact us at info@seveneventsphotobooth.com
          </p>
        </div>
      </div>
    </main>
  );
}
