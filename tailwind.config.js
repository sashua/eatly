/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true, padding: "2rem" },
    fontFamily: {
      sans: ["var(--font-golos-text)", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@headlessui/tailwindcss")],
};
