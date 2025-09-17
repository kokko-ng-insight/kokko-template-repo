/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/templates/**/*.html',
    './app/static/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd1d4',
          300: '#f8acb1',
          400: '#f47983',
          500: '#AF0E2E',
          600: '#9e0d29',
          700: '#850b23',
          800: '#6c091e',
          900: '#530718'
        },
        secondary: {
          50: '#f8f4f6',
          100: '#f1e9ed',
          200: '#e4d4db',
          300: '#d0b5c1',
          400: '#b68fa2',
          500: '#721357',
          600: '#671150',
          700: '#560e43',
          800: '#460c37',
          900: '#36092c'
        },
        accent: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#3E332D',
          600: '#382e29',
          700: '#2f2724',
          800: '#261f1d',
          900: '#1e1816'
        }
      }
    }
  },
  plugins: []
}
