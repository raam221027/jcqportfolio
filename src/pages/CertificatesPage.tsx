import PageShell, { PageHeader } from "@/components/PageShell";
import { award, certificates } from "@/data/certificates";

export default function CertificatesPage() {
  return (
    <PageShell className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Certificates" title="Awards & training" />
      <div className="relative pl-7">
        <div className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-transparent via-brand-cyan to-transparent" />
        <div className="relative mb-6 rounded-xl border border-brand-cyan400/40 bg-bg-elevated px-5 py-4 shadow-[0_0_24px_rgb(0_195_255/0.15)]">
          <div className="absolute -left-[27px] top-6 h-3.5 w-3.5 rounded-full bg-brand-cyan shadow-[0_0_12px_hsl(190_95%_39%)]" />
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-cyan400">
            {award.eyebrow}
          </div>
          <h3 className="text-lg font-semibold">{award.name}</h3>
        </div>
        {certificates.map((c) => (
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
        ))}
      </div>
    </PageShell>
  );
}
