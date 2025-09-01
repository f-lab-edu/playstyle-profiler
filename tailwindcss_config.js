/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0d12',
        'card-bg': '#121722',
        'border-color': '#242a36',
        'border-light': '#2a3140',
      }
    },
  },
  plugins: [],
}
