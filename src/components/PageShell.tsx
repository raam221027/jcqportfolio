import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={["min-h-[calc(100vh-60px)] px-4 pb-20 pt-24 sm:px-6 sm:pb-24", className].join(" ")}
    >
      {children}
    </motion.main>
  );
}

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}
