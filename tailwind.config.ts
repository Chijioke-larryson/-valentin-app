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
        church: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c5d7ff',
          300: '#9dbafc',
          400: '#6f92f5',
          500: '#486de8',
          600: '#2f4ec6',
          700: '#263da3',
          800: '#243482', // Deep Navy for backgrounds
          900: '#212d67',
          950: '#141a3d',
        },
        valentine: {
          50: '#fff0f1',
          100: '#ffe3e6',
          200: '#ffcbd2',
          300: '#ffa1ad',
          400: '#fb6f84',
          500: '#f43f5e',
          600: '#e11d48', // Vibrant Red
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
};
export default config;
