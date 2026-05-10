/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50: "#FFF0F7",
          100: "#FFD6EC",
          200: "#FF99CB",
          300: "#FF66AF",
          400: "#FF3394",
          500: "#E8007A",
          600: "#C40068",
          700: "#9A0052",
          800: "#70003C",
          900: "#460026",
        },
        surface: {
          0: "#0A0A0F",
          1: "#111118",
          2: "#18181F",
          3: "#1F1F28",
          4: "#26262F",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        shimmer: "shimmer 1.5s infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};
