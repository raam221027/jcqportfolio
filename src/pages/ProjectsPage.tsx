import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell, { PageHeader } from "@/components/PageShell";
import Pill from "@/components/Pill";
import TechStackSphere from "@/components/TechStackSphere";
import { projects } from "@/data/projects";

const VARIANT_FOR: Record<string, "success" | "indigo" | "cyan"> = {
  "Capstone Project": "success",
  "Internship Project": "indigo",
};

export default function ProjectsPage() {
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
    <PageShell id="projects" className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Projects" title="Selected work" />

      <section className="mb-12 grid items-center gap-8 sm:mb-16 sm:gap-10 lg:grid-cols-2">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Tech stack
          </div>
          <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            <span className="gradient-text">Tools</span> that ship these projects
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-fg-muted sm:text-base lg:mx-0">
           Technologies and development tools I use to build modern, scalable, and user-focused web applications, including frontend interfaces, backend systems, databases, and system integrations.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              "React",
              "TypeScript",
              "Vite",
              "Tailwind CSS",
              "shadcn/ui",
              "Laravel",
              "MySQL",
              "MS SQL Server",
              "Docker",
              "GitHub",
              "Git",
              "PHP",
              "Node.js",
            ].map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <TechStackSphere radius={180} speed={0.03} hoverSpeed={0.03} />
        </div>
      </section>

      <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
        Projects
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="group rounded-xl border border-surface-2 bg-bg-elevated p-5 shadow-md transition-all duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-brand-cyan/50"
          >
            {p.image ? (
              <button
                type="button"
                onClick={() =>
                  setLightbox({ src: p.image!, alt: `${p.title} screenshot` })
                }
                aria-label={`View ${p.title} screenshot in full size`}
                className="mb-4 flex h-52 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-surface-2 bg-gradient-to-br from-bg-deep to-brand-cyan400/10 transition-opacity hover:opacity-90"
              >
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  className="h-full w-full object-contain sm:object-cover"
                  loading="lazy"
                />
              </button>
            ) : (
              <div className="mb-4 flex h-52 items-center justify-center overflow-hidden rounded-lg border border-surface-2 bg-gradient-to-br from-bg-deep to-brand-cyan400/10 font-mono text-xs text-fg-dim">
                screenshot
              </div>
            )}
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <Pill variant={VARIANT_FOR[p.status]}>{p.status}</Pill>
            </div>
            <p className="mb-3.5 text-sm leading-relaxed text-fg-muted">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </article>
        ))}
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
