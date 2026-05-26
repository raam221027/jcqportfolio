export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-60px)] items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I'm <span className="gradient-text">Joemar Questadio</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:mt-6 sm:text-lg">
          A passionate Full Stack Developer focused on clean, user-friendly interfaces and seamless system
          integrations.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
          <a
            href="#projects"
            className="rounded-lg bg-brand-cyan px-5 py-2.5 text-sm font-semibold text-[#031218] transition-shadow hover:shadow-glow-cyan"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-border-hover bg-transparent px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-brand-cyan"
          >
            Get in touch
          </a>
        </div>

        <div className="relative mx-auto mt-14 h-px w-3/5">
          <div className="absolute inset-0 glow-beam" />
        </div>
      </div>
    </section>
  );
}
