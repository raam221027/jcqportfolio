import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeSwitch from "./ThemeSwitch";

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = ["home", "about", "projects", "certificates", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const headerBgClass =
    scrolled || menuOpen
      ? "border-b border-white/10 bg-black/30 backdrop-blur-md"
      : "border-b border-transparent";

  const linkClass = (id: string, base = "") =>
    [
      base,
      "text-sm transition-colors",
      activeId === id ? "font-semibold text-fg" : "font-normal text-fg-muted hover:text-fg",
    ].join(" ");

  const mobileLinkClass = (id: string) =>
    [
      "rounded-md px-3 py-2.5 text-center text-sm transition-colors",
      activeId === id
        ? "bg-surface-1 font-semibold text-fg"
        : "font-normal text-fg-muted hover:bg-surface-1/60 hover:text-fg",
    ].join(" ");

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-50 px-4 py-3 transition-all duration-300 sm:px-6",
        headerBgClass,
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#home"
          className="justify-self-start rounded-md bg-gray-800 px-2 py-1 font-display text-2xl font-bold leading-none text-white hover:bg-gray-700"
        >
          Portfolio.
        </a>

        <nav className="hidden items-center justify-center gap-5 md:flex lg:gap-6">
          {NAV.map((it) => (
            <a key={it.id} href={`#${it.id}`} className={linkClass(it.id)}>
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <ThemeSwitch />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md border border-surface-2 bg-surface-1/50 p-2 text-fg-muted transition-colors hover:text-fg md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-bg-elevated/95 shadow-lg backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col p-2">
              {NAV.map((it) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass(it.id)}
                >
                  {it.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
