export default function BookPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto py-8">
        <h1 style={{ fontFamily: 'Fraunces', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '2rem', textAlign: 'center' }}>
          Book Your Photobooth
        </h1>
        <p style={{ color: 'var(--ink)', textAlign: 'center', marginBottom: '3rem', fontSize: '1.125rem' }}>
          Choose your photobooth package and select your event date
        </p>

        {/* Booqable Products */}
        <div className="space-y-8">
          <div className="booqable-product" data-id="snap-booth"></div>
          <div className="booqable-product" data-id="mod-booth"></div>
          <div className="booqable-product" data-id="oak-booth"></div>
        </div>
      </div>
    </main>
  );
}
