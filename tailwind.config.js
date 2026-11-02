/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FBFBF9',
          50: '#FFFFFF',
          100: '#FBFBF9',
          200: '#F5F5F0',
          300: '#EBEAE5',
        },
        charcoal: {
          DEFAULT: '#1E2229',
          50: '#F2F3F5',
          100: '#D5D8DC',
          200: '#A4ABB5',
          300: '#677180',
          400: '#3D4450',
          500: '#1E2229',
          600: '#181C22',
          700: '#13161B',
          800: '#0E1115',
          900: '#090A0D',
        },
        terracotta: {
          DEFAULT: '#E07A5F',
          light: '#F49780',
          dark: '#C86146',
        },
        sage: {
          DEFAULT: '#3D5A50',
          light: '#537A6D',
          soft: '#EAF0EE',
          dark: '#2A3F38',
        },
        beige: {
          DEFAULT: '#F1EEE7',
          light: '#FAF8F5',
          dark: '#E4DFD5',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Editorial New', 'Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(30, 34, 41, 0.05)',
        'soft': '0 8px 30px -4px rgba(30, 34, 41, 0.07)',
        'soft-lg': '0 16px 48px -6px rgba(30, 34, 41, 0.1)',
        'soft-xl': '0 24px 64px -8px rgba(30, 34, 41, 0.14)',
        'glow-terracotta': '0 0 25px rgba(224, 122, 95, 0.35)',
        'glow-sage': '0 0 25px rgba(61, 90, 80, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        fadeIn: 'fadeIn 0.45s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
