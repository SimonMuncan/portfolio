/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        void: '#05050E',
        nebula: '#7C3AED',
        cosmic: '#22D3EE',
        gold: '#C9A227',
        bone: '#EDEDF2',
        ash: '#8A8A98',
      },
      keyframes: {
        'blob-drift-1': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, 25px) scale(0.94)' },
        },
        'blob-drift-2': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-50px, 35px) scale(1.06)' },
          '66%': { transform: 'translate(35px, -45px) scale(0.96)' },
        },
        'blob-drift-3': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.04)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'aurora': {
          '0%, 100%': { opacity: '0.5', transform: 'scaleX(1)' },
          '50%': { opacity: '0.8', transform: 'scaleX(1.08)' },
        },
      },
      animation: {
        'blob-1': 'blob-drift-1 22s ease-in-out infinite',
        'blob-2': 'blob-drift-2 28s ease-in-out infinite',
        'blob-3': 'blob-drift-3 18s ease-in-out infinite',
        'blob-4': 'blob-drift-1 32s ease-in-out infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
