/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#050507",
        "dark-card": "#0a0a0a",
        "dark-border": "rgba(255,255,255,0.05)",
        "gold-primary": "#FFD700",
        "gold-secondary": "#FFA500",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
