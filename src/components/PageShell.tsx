import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PageShellProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function PageShell({ id, children, className = "" }: PageShellProps) {
  const reduce = useReducedMotion();
  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24, filter: "blur(8px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: false, margin: "-15% 0px" },
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          filter: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        },
      };

  return (
    <motion.section
      id={id}
      {...motionProps}
      className={[
        "scroll-mt-20 px-4 pb-16 pt-2 sm:scroll-mt-14 sm:px-6 sm:pb-20 sm:pt-10",
        className,
      ].join(" ")}
    >
      {children}
    </motion.section>
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
