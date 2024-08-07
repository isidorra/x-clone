/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "#000000",
        "secondary" : "#E7E9EA",
        "accent" : "#359CF1"
      }
    },
  },
  plugins: [],
}