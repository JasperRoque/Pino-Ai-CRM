/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E8555',
          dark: '#25c2a0',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
}
