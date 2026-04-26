import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[calc(100vh-60px)] items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
          Hi, I'm <span className="gradient-text">Joemar Questadio</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
          A passionate Web Developer focused on clean, user-friendly interfaces and seamless system
          integrations.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <Link
            to="/projects"
            className="rounded-lg bg-brand-cyan px-5 py-2.5 text-sm font-semibold text-[#031218] transition-shadow hover:shadow-glow-cyan"
          >
            View projects
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-border-hover bg-transparent px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-brand-cyan"
          >
            Get in touch
          </Link>
        </div>

        <div className="relative mx-auto mt-14 h-px w-3/5">
          <div className="absolute inset-0 glow-beam" />
        </div>
      </div>
    </motion.section>
  );
}
