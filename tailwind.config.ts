import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // JQ brand tokens — values live as CSS variables in globals.css
        // (so .dark / .light on <html> can swap palettes).
        bg: {
          DEFAULT: "hsl(var(--bg) / <alpha-value>)",
          elevated: "hsl(var(--bg-elevated) / <alpha-value>)",
          deep: "hsl(var(--bg-deep) / <alpha-value>)",
        },
        surface: {
          1: "hsl(var(--surface-1) / <alpha-value>)",
          2: "hsl(var(--surface-2) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "hsl(var(--fg) / <alpha-value>)",
          muted: "hsl(var(--fg-muted) / <alpha-value>)",
          dim: "hsl(var(--fg-dim) / <alpha-value>)",
        },
        brand: {
          cyan: "hsl(190 95% 39%)",
          cyan400: "#22d3ee",
          indigo: "hsl(224 76% 48%)",
          indigo400: "#818cf8",
          sky: "#38bdf8",
        },
        success: "#10b981",
        warning: "#eab308",
        danger: "hsl(0 72% 51%)",
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          hover: "hsl(var(--border-hover) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Geist Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.625rem",
        sm: "calc(0.625rem - 4px)",
        md: "calc(0.625rem - 2px)",
        lg: "0.625rem",
        xl: "calc(0.625rem + 4px)",
        "2xl": "calc(0.625rem + 8px)",
        "3xl": "calc(0.625rem + 12px)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.40)",
        md: "0 4px 12px -2px rgb(0 0 0 / 0.45)",
        lg: "0 10px 30px -10px rgb(0 0 0 / 0.55)",
        xl: "0 25px 50px -12px rgb(0 0 0 / 0.60)",
        "glow-cyan": "0 0 24px rgb(0 195 255 / 0.45)",
        "glow-indigo": "0 0 24px rgb(129 140 248 / 0.40)",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
