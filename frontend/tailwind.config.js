import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      libre: ['"Libre Baskerville"', ..._fontFamily.sans],
      "atkinson-hyperlegible": ["Atkinson Hyperlegible", "sans-serif"],
      caprasimo: ["Caprasimo", "sans-serif"],
    },
  },
};
export const plugins = [];
