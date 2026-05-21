import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "indigo" | "success";
}

const VARIANTS: Record<NonNullable<PillProps["variant"]>, string> = {
  default: "bg-surface-1 border-surface-2 text-fg-muted",
  cyan: "bg-brand-cyan400/10 border-brand-cyan400/40 text-brand-cyan400",
  indigo: "bg-brand-indigo400/10 border-brand-indigo400/40 text-brand-indigo400",
  success: "bg-success/10 border-success/40 text-success",
};

export default function Pill({ children, variant = "default" }: PillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium",
        VARIANTS[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
