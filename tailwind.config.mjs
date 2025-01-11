/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3.5s linear infinite',
      },
      backgroundImage: {
        'grainy-texture': `linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        'vinyl-texture': `linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0.73)), url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      },
      fontFamily: {
        pacifico: ['"Pacifico"'],
      },
    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms")
  ],
}