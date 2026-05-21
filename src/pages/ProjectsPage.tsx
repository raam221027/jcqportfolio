import PageShell, { PageHeader } from "@/components/PageShell";
import Pill from "@/components/Pill";
import TechStackSphere from "@/components/TechStackSphere";
import { projects, type ProjectStatus } from "@/data/projects";

const VARIANT_FOR: Record<string, "success" | "indigo" | "cyan"> = {
  "Capstone Project": "success",
  "Internship Project": "indigo",
};

export default function ProjectsPage() {
  return (
    <PageShell className="mx-auto max-w-5xl">
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
            A 3D orbit of the libraries, languages, and platforms behind every project below. Drag
            or hover to spin — the sphere accelerates as your cursor approaches the edge.
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
            <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-lg border border-surface-2 bg-gradient-to-br from-bg-deep to-brand-cyan400/10 font-mono text-xs text-fg-dim">
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                "screenshot"
              )}
            </div>
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
    </PageShell>
  );
}
