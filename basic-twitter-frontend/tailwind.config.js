/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255, 255, 255, 0.18)",
        "light-dark": "#242424",
        'harvest-gold': {
        '50': '#fcf9f0',
        '100': '#f7f0dd',
        '200': '#eedfba',
        '300': '#e3c78e',
        '400': '#dcb474',
        '500': '#ce9241',
        '600': '#c07c36',
        '700': '#a0622e',
        '800': '#804f2c',
        '900': '#684226',
        '950': '#382012',
    },
    
  
    
      }
    },
  },
  plugins: [],
}