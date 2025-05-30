/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['GmarketSansMedium', 'sans-serif'],
    },
    colors:{
      'main-green': '#4BEA70',
      'sub-green': '#C8F28F',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}