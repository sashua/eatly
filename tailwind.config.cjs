/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.neutral.200', 'currentColor'),
    }),
    colors: {
      white: '#fff',
      black: '#000',
      curren: 'currentColor',
      brand: {
        DEFAULT: '#6c5fbc',
        50: '#f2f3fb',
        100: '#e7eaf8',
        200: '#d4d8f1',
        300: '#b9bde8',
        400: '#9c9ddd',
        500: '#8783d1',
        600: '#6c5fbc',
        700: '#6659a9',
        800: '#534a89',
        900: '#47416e',
        950: '#2a2640',
      },
      neutral: {
        DEFAULT: '#515151',
        50: '#f7f7f7',
        100: '#e3e3e3',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#818181',
        500: '#676767',
        600: '#515151',
        700: '#434343',
        800: '#383838',
        900: '#313131',
        950: '#1a1a1a',
      },
    },
    container: { center: true, padding: '2rem' },
    fontFamily: {
      sans: ['var(--font-golos-text)', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@headlessui/tailwindcss')],
};
