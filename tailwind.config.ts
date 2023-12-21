import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "0",
      sm: "650",
      md: "1000",
      lg: "1200",
      xl: "1440",
    },
    fontSize: {
      base: "1.6rem",
    },
  },
  plugins: [],
};
export default config;
