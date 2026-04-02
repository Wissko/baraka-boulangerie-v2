import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        dm: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        gold: "#C9A96E",
        "gold-light": "#E0C48A",
        "gold-dark": "#A8833C",
        caramel: "#8B5E3C",
        ink: "#1A1410",
        cream: "#FAF7F2",
        "dark-bg": "#0F0C09",
      },
    },
  },
  plugins: [],
};

export default config;
