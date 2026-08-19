/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './partials/**/*.html',
    './assets/js/**/*.js',
  ],
  safelist: [
    'gateway-panel--projects',
    'gateway-panel--products',
    'gateway-panel--certifications',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#00609C',
        'brand-red': '#DD0330',
        'deep-blue': '#07324B',
        ink: '#142B38',
        paper: '#FFFFFF',
        mist: '#F4F7F8',
      },
      fontFamily: {
        heading: ['Archivo', 'Arial', 'sans-serif'],
        body: ['IBM Plex Sans', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        brand: '10px',
      },
      boxShadow: {
        soft: '0 18px 48px rgb(20 43 56 / 0.08)',
      },
      maxWidth: {
        site: '80rem',
      },
    },
  },
  plugins: [],
};
