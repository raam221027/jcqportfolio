import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionScrollIndicatorProps {
  targetId: string;
  label?: string;
}

export default function SectionScrollIndicator({
  targetId,
  label = "Scroll to next section",
}: SectionScrollIndicatorProps) {
  const reduce = useReducedMotion();

  return (
    <a
      href={`#${targetId}`}
      aria-label={label}
      className="mx-auto mt-12 flex h-11 w-11 items-center justify-center rounded-full border border-border-hover bg-surface-1/40 text-fg-muted backdrop-blur-sm transition-colors hover:border-brand-cyan hover:text-fg sm:mt-16 md:hidden"
    >
      <motion.span
        className="inline-flex"
        {...(reduce
          ? {}
          : {
              animate: { y: [0, 6, 0] },
              transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            })}
      >
        <ChevronDown className="h-5 w-5" aria-hidden />
      </motion.span>
    </a>
  );
}
