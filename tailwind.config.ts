import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
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
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(250px)" },
        },
        downUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-250px)" },
        },
        "turn-to-large": {
          "50%": {
            height: "calc(var(--large-height) * 1.02)",
            width: "calc(var(--large-width) * 1.02)",
            borderRadius: "var(--large-radius)",
            boxShadow:
              "inset 0 0 0 1.5px rgb(255 255 255 / 0.1), 0 8px 30px rgb(0 0 0 / 0.6)",
          },
          "100%": {
            height: "var(--large-height)",
            width: "var(--large-width)",
            borderRadius: "var(--large-radius)",
            boxShadow:
              "inset 0 0 0 1.5px rgb(255 255 255 / 0.1), 0 8px 30px rgb(0 0 0 / 0.6)",
          },
        },
        "turn-to-small": {
          "0%": {
            height: "var(--large-height)",
            width: "var(--large-width)",
            borderRadius: "var(--large-radius)",
            boxShadow:
              "inset 0 0 0 1.5px rgb(255 255 255 / 0.1), 0 8px 30px rgb(0 0 0 / 0.6)",
          },
          "50%": {
            height: "calc(var(--small-height) * 0.94)",
            width: "calc(var(--small-width) * 0.94)",
          },
        },
        "avatar-pop": {
          "0%": {
            transform: "scale(0.6)",
          },
          "50%": {
            transform: "scale(1.35)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        aurora: "aurora 8s ease-in-out infinite alternate",
        upDown: "upDown 40s ease-in-out infinite",
        downUp: "downUp 40s ease-in-out infinite",
        "turn-to-large": "turn-to-large 0.6s ease-in-out forwards",
        "turn-to-small": "turn-to-small 0.6s ease-in-out forwards",
        "avatar-pop": "avatar-pop 0.6s ease forwards",
      },
      backgroundSize: {
        aurora: "400% 400%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
