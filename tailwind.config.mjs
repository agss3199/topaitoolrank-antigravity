/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          900: '#134e4a',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: { color: theme('colors.gray.900') },
            h2: { color: theme('colors.gray.900') },
            a: { color: theme('colors.brand.600'), '&:hover': { color: theme('colors.brand.500') } },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
