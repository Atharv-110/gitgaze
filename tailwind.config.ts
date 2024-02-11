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
        "white-dull": "#F5F7FF",
        "theme-blue": "#0077FF",
        "theme-gray": "#697C9B",
        "gray-blue": "#4B699B",
        "white-blue": "#61ABFF",
      },
      fontFamily: {
        "spacemono": ['Space Mono', 'monospace']
      }
    },
  },
  plugins: [],
};
export default config;
