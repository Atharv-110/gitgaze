import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        aurora: {
          "0%": {
            backgroundPosition: "0% 50%",
            transform: "rotate(-5deg) scale(0.9)",
          },
          "25%": {
            backgroundPosition: "50% 100%",
            transform: "rotate(5deg) scale(1.1)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            transform: "rotate(-3deg) scale(0.95)",
          },
          "75%": {
            backgroundPosition: "50% 0%",
            transform: "rotate(3deg) scale(1.05)",
          },
          "100%": {
            backgroundPosition: "0% 50%",
            transform: "rotate(-5deg) scale(0.9)",
          },
        },
        upDown: {
          "0%, 100%": { transform: "translateY(-20px)" },
          "50%": { transform: "translateY(100dvh)" },
        },
        downUp: {
          "0%, 100%": { transform: "translateY(20px)" },
          "50%": { transform: "translateY(-100dvh)" },
        },
      },
      animation: {
        aurora: "aurora 8s ease-in-out infinite alternate",
        upDown: "upDown 30s ease-in-out infinite",
        downUp: "downUp 30s ease-in-out infinite",
      },
      backgroundSize: {
        aurora: "400% 400%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
