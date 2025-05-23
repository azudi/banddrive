

/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: '375px',
        xs: '425px',
      },
      colors: {
        banddrive: {
          300: 'rgb(var(--color-accent-primary) / <alpha-value>)',
          500: 'rgb(var(--app-dark-500) / <alpha-value>)',
          400: "rgb(var(--app-primary-400) / <alpha-value>)",
          primary: {
            green: 'rgb(var(--color-neutral-200) / <alpha-value>)',
          }
        },
        banddrivegray: {
          100: '#E5E5E5',
          200: 'rgba(33, 63, 125)'
        },
      },
      fontSize: {
        xxs: '.625rem',
        app_base: '0.95rem'
      },
    },
  },
  variants: {
    extend: {},
  },
}
