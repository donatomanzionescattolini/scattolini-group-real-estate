import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  if (!images.length) return null;

  const visible = images.slice(0, 5);
  const remaining = images.length - visible.length;

  return (
    <>
      {/* Compass-style mosaic grid: 1 large + 4 small */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1.5 overflow-hidden rounded-lg" style={{ height: 420 }}>
        <button
          type="button"
          className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden"
          onClick={() => setLightboxIndex(0)}
        >
          <img src={visible[0]} alt={`${alt} 1`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
        </button>
        {visible.slice(1).map((src, i) => (
          <button
            key={i}
            type="button"
            className="group relative cursor-pointer overflow-hidden"
            onClick={() => setLightboxIndex(i + 1)}
          >
            <img src={src} alt={`${alt} ${i + 2}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
            {i === 3 && remaining > 0 && (
              <span className="absolute inset-0 flex items-center justify-center bg-[rgba(15,27,45,0.55)] text-lg font-medium text-white">
                +{remaining}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.92)]" onClick={close}>
          <div className="absolute right-4 top-4 z-10">
            <button type="button" onClick={close} className="rounded-full bg-[rgba(255,255,255,0.12)] p-2 text-white transition hover:bg-[rgba(255,255,255,0.24)]">
              <X size={22} />
            </button>
          </div>

          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.12)] p-2.5 text-white transition hover:bg-[rgba(255,255,255,0.24)]"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={images[lightboxIndex]}
            alt={`${alt} ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.12)] p-2.5 text-white transition hover:bg-[rgba(255,255,255,0.24)]"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={24} />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-[rgba(255,255,255,0.6)]">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
