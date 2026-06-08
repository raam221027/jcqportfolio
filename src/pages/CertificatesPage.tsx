import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell, { PageHeader } from "@/components/PageShell";
import { recognition, certificates } from "@/data/certificates";
import programmerOfTheYearImg from "@/assets/Programmer of the Year 2024.jpg";

export default function CertificatesPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("[data-lightbox-image]")) return;
      setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    const attachId = window.setTimeout(() => {
      document.addEventListener("click", onDocClick);
    }, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(attachId);
      document.removeEventListener("click", onDocClick);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  return (
    <PageShell id="certificates" className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Certificates" title="Achivements & Certifications" />
      <div className="relative pl-7">
        <div className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-transparent via-brand-cyan to-transparent" />
        <button
          type="button"
          onClick={() =>
            setLightbox({ src: programmerOfTheYearImg, alt: `${recognition.name} certificate` })
          }
          aria-label={`View ${recognition.name} certificate in full size`}
          className="relative mb-6 block w-full cursor-pointer rounded-xl border border-brand-cyan400/40 bg-bg-elevated px-5 py-4 text-left shadow-[0_0_24px_rgb(0_195_255/0.15)] transition-all duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-[0_0_32px_rgb(0_195_255/0.25)]"
        >
          <div className="absolute -left-[27px] top-6 h-3.5 w-3.5 rounded-full bg-brand-cyan shadow-[0_0_12px_hsl(190_95%_39%)]" />
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-cyan400">
            {recognition.eyebrow}
          </div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{recognition.name}</h3>
            <div className="font-mono text-md text-fg-dim">{recognition.year}</div>
          </div>
        </button>
        {certificates.map((c) =>
          c.image ? (
            <button
              key={c.name}
              type="button"
              onClick={() => setLightbox({ src: c.image!, alt: `${c.name} certificate` })}
              aria-label={`View ${c.name} certificate in full size`}
              className="relative mb-3.5 block w-full cursor-pointer rounded-lg border border-surface-2 bg-bg-elevated px-4 py-3 text-left transition-all duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-[0_0_24px_rgb(0_195_255/0.2)]"
            >
              <div className="absolute -left-[25px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-brand-cyan bg-brand-cyan" />
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-fg">{c.name}</div>
                <div className="font-mono text-xs text-fg-dim">{c.year}</div>
              </div>
            </button>
          ) : (
            <div
              key={c.name}
              className="relative mb-3.5 rounded-lg border border-surface-2 bg-bg-elevated px-4 py-3"
            >
              <div className="absolute -left-[25px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-brand-cyan bg-gray-800" />
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-fg">{c.name}</div>
                <div className="font-mono text-xs text-fg-dim">{c.year}</div>
              </div>
            </div>
          ),
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.alt}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm sm:p-8"
            >
              <div className="relative">
                <motion.img
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                  src={lightbox.src}
                  alt={lightbox.alt}
                  data-lightbox-image="true"
                  className="block max-h-[92vh] max-w-[95vw] cursor-default rounded-lg object-contain shadow-2xl md:max-h-[85vh] md:max-w-[80vw]"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Close image"
                  className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-xl leading-none text-white transition-colors hover:border-white/40 hover:bg-black md:-right-12 md:top-0"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </PageShell>
  );
}
