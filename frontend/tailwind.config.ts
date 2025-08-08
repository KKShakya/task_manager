import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 Enable class-based dark mode
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")], // For shadcn animations
};

export default config;
