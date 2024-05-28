import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "13/12": "13 / 12",
        "5/2": "5/2",
        "20/3": "20/3",
      },
      colors: {
        primary: {
          blue: "#2757E6",
          green: "#6BBE55",
        },
        secondary: {
          black: "#171717",
          white: "#FBFCFF",
          gray: "#97989B",
        },
      },
      backgroundImage: {
        "gradient-texture": "url('/img/bg-image.jpg')",
      },
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      fadeOut: {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
    },
    animation: {
      fadeIn: "fadeIn 0.5s ease-in-out",
      fadeOut: "fadeOut 0.5s ease-in-out",
    },
  },
  plugins: [require("rippleui")],
  rippleui: {
    removeThemes: ["dark"],
  },
};
export default config;
