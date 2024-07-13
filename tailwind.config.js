/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/templates/*.html',
    './src/scripts/templates/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      colors: {
        'primary': '#ffffff',
        'primary-font': '#393e46',
        'primary-nav': '#ffffff',
        'primary-desc': '#636a76',
        'primary-com': '#0e2737',
        'secondary': '#010409',
        'secondary-font': '#e6edf3',
        'secondary-nav': '#161b22',
        'secondary-desc': '#ccd0d5',
        'secondary-com': '#0d1117',
        'main-950': '#052e2d',
        'main-900': '#154c48',
        'main-800': '#145b58',
        'main-700': '#13726c',
        'main-600': '#128f85',
        'main-500': '#1cc3b2',
        'main-400': '#33cebc',
        'main-300': '#63e5d2',
        'main-200': '#9cf3e3',
        'main-100': '#cef9f0',
        'main-50': '#f0fdfa',
        'main-gray': '#aeaeae',
        'main-trans': 'rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
