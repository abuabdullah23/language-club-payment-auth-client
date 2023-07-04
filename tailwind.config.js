/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // for toggle light and dark theme
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

