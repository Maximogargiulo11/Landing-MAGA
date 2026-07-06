/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0014',
        ink: '#F0EEFF',
        accent: '#7C3AED',
        'accent-light': '#a78bfa',
      },
      fontFamily: {
        sans: ['DMSans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
