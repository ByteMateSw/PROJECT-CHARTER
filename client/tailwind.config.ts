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
    },
  },
  plugins: [],
};
export default config;
