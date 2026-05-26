import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionScrollIndicatorProps {
  targetId: string;
  label?: string;
  revealOnInView?: boolean;
}

export default function SectionScrollIndicator({
  targetId,
  label = "Scroll to next section",
  revealOnInView = false,
}: SectionScrollIndicatorProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(!revealOnInView);

  useEffect(() => {
    if (!revealOnInView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealOnInView]);

  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      aria-label={label}
      aria-hidden={revealOnInView && !visible}
      tabIndex={revealOnInView && !visible ? -1 : undefined}
      className={[
        "mx-auto mt-12 flex h-11 w-11 items-center justify-center rounded-full border border-border-hover bg-surface-1/40 text-fg-muted backdrop-blur-sm transition-opacity duration-300 hover:border-brand-cyan hover:text-fg motion-reduce:transition-none sm:mt-16 md:hidden",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
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
