//@type {import('tailwindcss').Config}
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E6D5E8',
          light: '#F5E6F7',
          dark: '#D4BFD6',
        },
        secondary: {
          DEFAULT: '#F5E6F7',
          light: '#FDF5FE',
          dark: '#EDD6F0',
        },
        accent: {
          DEFAULT: '#B088B5',
          light: '#C9A8CC',
          dark: '#8B6A8F',
        },
        dark: {
          DEFAULT: '#6B4C6E',
          light: '#8A6A8D',
          dark: '#4A3349',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(107, 76, 110, 0.1)',
        'medium': '0 8px 30px rgba(107, 76, 110, 0.15)',
        'hard': '0 12px 40px rgba(107, 76, 110, 0.2)',
      },
    },
  },
  plugins: [],
}
