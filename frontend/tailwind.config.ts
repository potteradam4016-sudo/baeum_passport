import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        passport: {
          navy: "#102a5f",
          blue: "#1f4f9a",
          ink: "#13213c",
          paper: "#f8f1df",
          gold: "#d6a83b",
          stamp: "#b43b4a",
          teal: "#1c8d8a",
        },
      },
      boxShadow: {
        passport: "0 24px 60px rgba(16, 42, 95, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
