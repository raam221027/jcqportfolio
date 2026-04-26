import PageShell, { PageHeader } from "@/components/PageShell";
import Pill from "@/components/Pill";
import { projects, type ProjectStatus } from "@/data/projects";

const VARIANT_FOR: Record<ProjectStatus, "success" | "indigo" | "cyan"> = {
  Shipped: "success",
  Featured: "indigo",
  Available: "cyan",
};

export default function ProjectsPage() {
  return (
    <PageShell className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Projects" title="Selected work" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.title}
            className="group rounded-xl border border-surface-2 bg-bg-elevated p-5 shadow-md transition-all duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-brand-cyan/50"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg border border-surface-2 bg-gradient-to-br from-bg-deep to-brand-cyan400/10 font-mono text-xs text-fg-dim">
              screenshot
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
