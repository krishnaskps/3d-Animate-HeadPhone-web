/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0d0d0f',
        'surface-elevated': '#16161a',
        'surface-border': '#26262b',
        silver: {
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#98989d',
          500: '#636366',
        },
        accent: {
          DEFAULT: '#e6e6e6',
          glow: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
