import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "white-dull": "#F5F7FF",
        "theme-blue": "#0077FF",
        "theme-gray": "#697C9B",
        "theme-gray-light": "#91A5D4",
        "gray-blue": "#4B699B",
        "white-blue": "#61ABFF",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
export default config;
