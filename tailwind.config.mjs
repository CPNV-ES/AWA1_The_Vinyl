/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['"Pacifico"'],
      },
    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms")
  ],
}