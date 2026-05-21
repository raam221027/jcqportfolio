import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeSwitch from "./ThemeSwitch";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when navigating, and on Escape.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const headerBgClass =
    scrolled || menuOpen
      ? "border-b border-white/10 bg-black/30 backdrop-blur-md"
      : "border-b border-transparent";

  return (
    <header
      className={[
        "fixed left-0 right-0 z-50 px-4 py-3 transition-all duration-300 sm:px-6",
        scrolled || menuOpen ? "top-0" : "top-0",
        headerBgClass,
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link
          to="/"
          className="rounded-md bg-gray-800 px-2 py-1 font-display text-2xl font-bold leading-none text-white hover:bg-gray-700"
        >
          Portfolio.
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {NAV.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                [
                  "text-sm transition-colors",
                  isActive
                    ? "font-semibold text-fg"
                    : "font-normal text-fg-muted hover:text-fg",
                ].join(" ")
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "rounded-md px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-surface-1 font-semibold text-fg"
                        : "font-normal text-fg-muted hover:bg-surface-1/60 hover:text-fg",
                    ].join(" ")
                  }
                >
                  {it.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
