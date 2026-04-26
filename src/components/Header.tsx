import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const NAV = [
  { to: "/", label: "All", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-2 z-50 px-6 py-3 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/20 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="rounded-md bg-gray-800 px-2 py-1 font-display text-2xl font-bold leading-none text-fg hover:bg-gray-700"
        >
          JQ
        </Link>

        <nav className="flex items-center gap-6">
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
            className="flex items-center gap-2 rounded-md border border-surface-2 bg-surface-1/50 px-3 py-1.5"
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
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
