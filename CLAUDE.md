# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server at http://localhost:5173
npm run build      # tsc -b && vite build — type-check is part of the build
npm run preview    # serve the production build locally
npm run lint       # ESLint over the repo
npm run format     # Prettier write over src/**/*.{ts,tsx,css,md}
```

There is no test runner configured. `npm run build` is the closest thing to a CI gate — it runs `tsc -b` before bundling, so type errors break the build.

## Architecture

Single-page Vite + React 18 + TypeScript app (strict mode, `noUnusedLocals`/`noUnusedParameters` on). It is a personal portfolio, content-driven from `src/data/*.ts`.

**Routing + page transitions.** `src/main.tsx` wraps `<App />` in `BrowserRouter` and `next-themes` `ThemeProvider` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}` — dark-first, no system preference). `src/App.tsx` defines all routes (`/`, `/about`, `/projects`, `/certificates`, `/contact`) inside `<AnimatePresence mode="wait">`, keyed on `location.pathname`. For exit animations to fire, every page must be wrapped in `PageShell` (a `motion.main` with `initial`/`animate`/`exit`) — see `src/components/PageShell.tsx`. Adding a route without `PageShell` will skip the transition.

**Design system lives in `tailwind.config.ts`.** Brand colors (`bg`, `surface`, `fg`, `brand-cyan`, `brand-indigo`, …), fonts (`font-display` Geist, `font-mono` JetBrains), radii, shadows (`shadow-glow-cyan`, `shadow-glow-indigo`), and easings (`ease-out-quart`, `ease-spring`) are tokens — do not hardcode hex/HSL in components. The `gradient-text` utility (cyan→indigo headline gradient) is defined in `src/globals.css`. Dark mode is class-based; only dark tokens are currently defined.

**Path alias.** `@/*` → `src/*` is configured in **both** `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`). Keep them in sync — changing one without the other will break either the type-checker or the runtime resolver.

**Content is data, not markup.** Bio, projects, and certificates live in `src/data/{profile,projects,certificates}.ts`. Pages (`src/pages/*Page.tsx`) consume those modules — edit data files rather than JSX when changing copy/listings.

**Tooling.** ESLint extends `prettier` (no formatting conflicts) and `react-hooks`/`react-refresh`. `prettier-plugin-tailwindcss` sorts class lists automatically — don't manually re-order Tailwind classes; let the formatter own it.
