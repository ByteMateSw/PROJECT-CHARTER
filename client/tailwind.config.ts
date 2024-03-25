import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        'gradient-texture': "url('/img/bg-image.jpg')",

      }
    },
  },
  plugins: [],
};
export default config;
