import { useEffect, useState, type MouseEvent } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type DocWithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export default function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const doc = document as DocWithViewTransition;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!doc.startViewTransition || prefersReduced) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const isReverse = next === "dark";
    const root = document.documentElement;
    if (isReverse) root.classList.add("theme-transition-reverse");

    const transition = doc.startViewTransition(() => setTheme(next));
    transition.ready.then(() => {
      const small = `circle(0px at ${x}px ${y}px)`;
      const large = `circle(${endRadius}px at ${x}px ${y}px)`;
      root.animate(
        { clipPath: isReverse ? [large, small] : [small, large] },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
          pseudoElement: isReverse
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() => {
      root.classList.remove("theme-transition-reverse");
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      className={cn(
        "relative h-8 w-[64px] shrink-0 overflow-hidden rounded-full border transition-colors duration-500",
        isDark
          ? "border-indigo-900/70 bg-gradient-to-b from-[#0b1230] via-[#101a44] to-[#1a1240]"
          : "border-sky-200 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400",
        className,
      )}
    >
      {/* Stars — dark mode only */}
      <AnimatePresence>
        {isDark && (
          <>
            <motion.span
              key="star-a"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.4, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-3 top-1.5 h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.9)]"
            />
            <motion.span
              key="star-b"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.2, 1] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute left-6 top-3 h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.9)]"
            />
            <motion.span
              key="star-c"
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.3, 1, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
              className="absolute left-4 top-5 h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.9)]"
            />
            <motion.span
              key="cloud-night"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 0.45 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute right-2 top-4 h-1.5 w-3 rounded-full bg-slate-300/40 blur-[1px]"
            />
          </>
        )}
      </AnimatePresence>

      {/* Clouds — light mode only */}
      <AnimatePresence>
        {!isDark && (
          <>
            <motion.span
              key="cloud-a"
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute right-2 top-1.5 h-2 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            />
            <motion.span
              key="cloud-b"
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -16, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
              className="absolute right-5 top-4 h-1.5 w-2.5 rounded-full bg-white/90"
            />
            <motion.span
              key="cloud-c"
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 16, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="absolute left-2 bottom-1 h-1.5 w-3 rounded-full bg-white/85"
            />
          </>
        )}
      </AnimatePresence>

      {/* Sun / moon thumb */}
      <motion.div
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="absolute left-1 top-1 h-6 w-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -120, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 120, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-[inset_-4px_-3px_0_rgba(30,27,75,0.45),0_0_10px_rgba(199,210,254,0.5)]"
            >
              <span className="absolute left-[5px] top-[10px] h-[3px] w-[3px] rounded-full bg-slate-400/55" />
              <span className="absolute left-[12px] top-[5px] h-[2px] w-[2px] rounded-full bg-slate-400/45" />
              <span className="absolute left-[14px] top-[13px] h-[2px] w-[2px] rounded-full bg-slate-400/40" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 120, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -120, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-400 shadow-[0_0_10px_rgba(251,191,36,0.75),0_0_18px_rgba(251,146,60,0.45)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
