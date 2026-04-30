import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { to: "/", label: "All", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
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
        "fixed left-0 right-0 top-2 z-50 px-4 py-3 transition-all duration-300 sm:px-6",
        headerBgClass,
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link
          to="/"
          className="rounded-md bg-gray-800 px-2 py-1 font-display text-2xl font-bold leading-none text-fg hover:bg-gray-700"
        >
          JQ
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {NAV.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="hidden items-center gap-2 rounded-md border border-surface-2 bg-surface-1/50 px-3 py-1.5 lg:flex"
          >
            <Search className="h-4 w-4 text-fg-dim" />
            <input
              type="text"
              placeholder="Search..."
              className="w-32 bg-transparent text-sm text-fg outline-none placeholder:text-fg-dim"
            />
          </form>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md border border-surface-2 bg-surface-1/50 p-2 text-fg-muted transition-colors hover:text-fg"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
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
                  end={it.end}
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
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-2 flex items-center gap-2 rounded-md border border-surface-2 bg-surface-1/50 px-3 py-2 lg:hidden"
              >
                <Search className="h-4 w-4 text-fg-dim" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-dim"
                />
              </form>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
