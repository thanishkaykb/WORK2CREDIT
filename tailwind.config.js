/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Teal Primary
        teal: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Mint Green Accent
        mint: {
          50:  '#f0fdf9',
          100: '#d1fae9',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Warm Beige Surfaces
        beige: {
          50:  '#fdfaf6',
          100: '#faf5ec',
          200: '#f5ead6',
          300: '#eed9bb',
          400: '#e4c89a',
          500: '#d4a967',
          600: '#b8894a',
          700: '#8f6a35',
          800: '#6b4f27',
          900: '#4d371b',
        },
        // Off-white backgrounds
        cream: {
          50:  '#fffef9',
          100: '#fffdf2',
          200: '#fffbe6',
          300: '#fff8d9',
          400: '#fff4c6',
        },
        brand: {
          primary:   '#0d9488', // teal-600
          secondary: '#10b981', // mint-500
          accent:    '#f0fdfa', // teal-50
          surface:   '#faf5ec', // beige-100
          text:      '#134e4a', // teal-900
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(13, 148, 136, 0.08), 0 1px 2px 0 rgba(13, 148, 136, 0.04)',
        'card-hover': '0 4px 6px -1px rgba(13, 148, 136, 0.12), 0 2px 4px -1px rgba(13, 148, 136, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(13, 148, 136, 0.10), 0 4px 6px -2px rgba(13, 148, 136, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      },
    },
  },
  plugins: [],
}
