import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // JQ brand tokens — sourced from colors_and_type.css
        bg: {
          DEFAULT: "hsl(222 47% 11%)",
          elevated: "hsl(222 47% 13%)",
          deep: "hsl(224 60% 6%)",
        },
        surface: {
          1: "hsl(215 27% 16%)",
          2: "hsl(215 27% 18%)",
        },
        fg: {
          DEFAULT: "hsl(210 40% 98%)",
          muted: "hsl(217 19% 65%)",
          dim: "hsl(217 15% 50%)",
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
          DEFAULT: "hsl(215 27% 18%)",
          hover: "hsl(215 27% 28%)",
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
