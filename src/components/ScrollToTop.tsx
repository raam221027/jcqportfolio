import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";

export default function ScrollToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const compute = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const onClick = () => {
    smoothScrollTo(0);
    history.pushState(null, "", "#home");
  };

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 12 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={onClick}
          aria-label="Scroll to top"
          {...motionProps}
          className="fixed bottom-6 right-4 z-50 hidden h-11 w-11 items-center justify-center rounded-full border border-border-hover bg-surface-1/80 text-fg-muted shadow-lg backdrop-blur-sm transition-colors hover:border-brand-cyan hover:text-fg sm:bottom-8 sm:right-6"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
