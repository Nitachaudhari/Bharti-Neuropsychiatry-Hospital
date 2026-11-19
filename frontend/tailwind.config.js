/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Vibrant Palette for Bharti Neuropsychiatry Hospital
        teal: {
          DEFAULT: '#00BFA6',
          hover: '#00a892',
          dark: '#008e7b',
          50: '#E5F8F4',
          100: '#ccf2eb',
        },
        coral: {
          DEFAULT: '#FF684A',
          hover: '#e85538',
          dark: '#d6472b',
          50: '#fff1ee',
        },
        yellow: {
          DEFAULT: '#FFD43B',
          hover: '#eec42e',
          50: '#fffbf0',
        },
        green: {
          DEFAULT: '#75C94B',
          hover: '#66b43e',
          50: '#f2faed',
        },
        sky: {
          DEFAULT: '#42B9E8',
          hover: '#31a6d4',
          50: '#edf7fc',
        },
        fresh: '#F7FBF8',
        aqua: '#E5F8F4',
        navy: {
          DEFAULT: '#153C47',
          dark: '#0d2830',
        },
        secondary: '#52717A',
        // Direct brand alias map matching exact hexes
        brand: {
          teal: '#00BFA6',
          'teal-hover': '#00a892',
          'teal-dark': '#008e7b',
          'teal-light': '#E5F8F4',
          coral: '#FF684A',
          'coral-hover': '#e85538',
          'coral-dark': '#d6472b',
          yellow: '#FFD43B',
          green: '#75C94B',
          sky: '#42B9E8',
          fresh: '#F7FBF8',
          aqua: '#E5F8F4',
          navy: '#153C47',
          dark: '#153C47',
          secondary: '#52717A',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'fresh-sm': '0 2px 8px -2px rgba(21, 60, 71, 0.06)',
        'fresh': '0 8px 24px -6px rgba(21, 60, 71, 0.08), 0 4px 10px -2px rgba(21, 60, 71, 0.04)',
        'fresh-lg': '0 16px 36px -8px rgba(21, 60, 71, 0.12), 0 6px 16px -4px rgba(21, 60, 71, 0.06)',
        'teal-glow': '0 8px 25px -4px rgba(0, 191, 166, 0.35)',
        'coral-glow': '0 8px 25px -4px rgba(255, 104, 74, 0.35)',
        'card-hover': '0 20px 40px -10px rgba(21, 60, 71, 0.10), 0 8px 16px -4px rgba(21, 60, 71, 0.04)'
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
