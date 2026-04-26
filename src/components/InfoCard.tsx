import type { ReactNode } from "react";

type Accent = "cyan" | "indigo" | "success";

const ACCENT_TEXT: Record<Accent, string> = {
  cyan: "text-brand-cyan400",
  indigo: "text-brand-indigo400",
  success: "text-success",
};

const ACCENT_HOVER: Record<Accent, string> = {
  cyan: "hover:border-brand-cyan400/40",
  indigo: "hover:border-brand-indigo400/40",
  success: "hover:border-success/40",
};

interface InfoCardProps {
  title: string;
  accent?: Accent;
  children: ReactNode;
  className?: string;
}

export default function InfoCard({
  title,
  accent = "cyan",
  children,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-surface-2 bg-bg-elevated p-5 transition-colors duration-200",
        ACCENT_HOVER[accent],
        className,
      ].join(" ")}
    >
      <div
        className={[
          "mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
          ACCENT_TEXT[accent],
        ].join(" ")}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
