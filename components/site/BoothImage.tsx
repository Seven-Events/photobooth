'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  label: string;
};

/**
 * Booth product shot. Falls back to a labelled placeholder frame when the
 * image file has not been added to /public yet, so the page never shows a
 * broken image.
 */
export default function BoothImage({ src, alt, label }: Props) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can finish loading (or fail) before React hydrates and attaches
  // onError, so re-check the element once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '240px',
          aspectRatio: '3 / 4',
          borderRadius: '1rem',
          border: '2px dashed rgba(37,70,65,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(37,70,65,0.45)',
            fontWeight: 700,
          }}
        >
          {label}
          <br />
          photo
        </span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{
        width: '100%',
        maxWidth: '260px',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}
