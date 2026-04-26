# JQ Portfolio — React + TypeScript

A production-ready Vite + React 18 + TypeScript port of the JQ Portfolio design system. Strict TypeScript, TailwindCSS, React Router v6, Framer Motion page transitions, dark mode via `next-themes`, ESLint + Prettier.

## Stack

- **Vite 5** — dev server + bundler
- **React 18** + **TypeScript (strict)**
- **TailwindCSS 3** — brand tokens wired in `tailwind.config.ts`
- **React Router v6** — `/`, `/about`, `/projects`, `/certificates`, `/contact`
- **Framer Motion** — page transitions
- **next-themes** — dark/light toggle (defaults to dark)
- **lucide-react** — icons
- **ESLint + Prettier** — `prettier-plugin-tailwindcss` keeps class lists sorted

## Getting started

```bash
npm install        # or pnpm install / yarn
npm run dev        # http://localhost:5173
npm run build
npm run preview
npm run lint
npm run format
```

## Project layout

```
src/
  main.tsx               # mounts BrowserRouter + ThemeProvider
  App.tsx                # routes + DotPattern background + Header
  globals.css            # Tailwind layers + Geist/JetBrains fonts
  components/
    DotPattern.tsx       # cursor-reactive canvas dot grid
    Header.tsx           # fixed header with NavLink + theme toggle
    Hero.tsx             # homepage (NO sparkles — clean per request)
    GlowCard.tsx         # rainbow conic-bordered card
    CompareSlider.tsx    # original-style profile/skills slider
    InfoCard.tsx         # accent-titled info block (about page)
    Pill.tsx             # tag chip with variants
    Field.tsx            # form input/textarea with focus glow
    PageShell.tsx        # animated page wrapper + PageHeader
  pages/
    AboutPage.tsx        # CompareSlider + 5 InfoCards
    ProjectsPage.tsx     # project grid
    CertificatesPage.tsx # award + timeline
    ContactPage.tsx      # contact form
  data/
    profile.ts           # bio, currently, location, facts, skills
    projects.ts          # project list
    certificates.ts      # cert + award list
  assets/                # profile.png, skills.png
```

## Brand tokens

All colors, fonts, radii, and shadows live in `tailwind.config.ts`:

| Token | Value |
|-------|-------|
| `bg`, `bg-elevated`, `bg-deep` | Deep navy surfaces |
| `surface-1` / `surface-2` | Card / border greys |
| `fg`, `fg-muted`, `fg-dim` | Text hierarchy |
| `brand-cyan`, `brand-cyan400` | Primary accent |
| `brand-indigo`, `brand-indigo400` | Secondary accent |
| `font-display` (Geist) | Headlines |
| `font-mono` (JetBrains Mono) | Code |

Use the `gradient-text` utility for the cyan→indigo headline gradient.

## Dark mode

Tailwind is configured with `darkMode: "class"`. `ThemeProvider` from `next-themes` toggles `<html class="dark">`. The current build is dark-first; light tokens can be added in `tailwind.config.ts` under a sibling theme if you want true light mode.

## Editing content

Update bio / projects / certs in `src/data/*.ts` — pages re-render automatically.

## Notes / what to swap

- **Hero** intentionally has no Sparkles particle effect. Add it back via Aceternity UI if desired.
- **Project cards** use a placeholder "screenshot" div — replace with real images in `src/data/projects.ts`.
- **Profile / skills images** are imported from `src/assets/`. Drop in your own and update the `import` paths in `AboutPage.tsx`.
- **Geist font** loads from Google Fonts. For self-hosting, drop `.woff2` files into `src/assets/fonts/` and add `@font-face` rules to `globals.css`.
