import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#030509",
        cyan: {
          glow: "#22d3ee",
          soft: "#67e8f9",
        },
        blue: {
          glow: "#3b82f6",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 211, 238, 0.35)",
        "glow-sm": "0 0 20px -5px rgba(34, 211, 238, 0.25)",
      },
      animation: {
        blink: "blink 1.2s step-end infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.92)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
