/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // prefix: 'tw-',
  important: true,
  theme: {
    extend: {
      extend: {
        height: {
          'screen-75': '75vh',
          'calc-50': 'calc(50% - 4rem)', // Example: calc(50% - 4rem)
        },
        width: {
          'calc-full': 'calc(100% - 2rem)', // Example: calc(100% - 2rem)
        },
      },
      colors: {
        primary: 'var(---primary-color)',
        secondary: 'var(---secondary-color)',
        accent: 'var(---accent-color)',
        deep: 'var(---deep-color)',

        /* Shades  */
        info: 'var(--info-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--error-color)',

        /* Black and White  */
        black1: 'var(---black1)',
        black2: 'var(---black2)',
        black3: 'var(---black3)',
        white: 'var(---white)',

        // Gray Shades 
        gray1: 'var(---gray1)',
        grayBg: 'var(---gray-bg)',
      },
      utilities: {
        '.tick': {
          display: 'inline-block',
          width: '1.55rem',
          height: '0.5rem',
          border: '2px solid currentColor',
          borderTop: 'none',
          borderRight: 'none',
          transform: 'rotate(-45deg)',
          marginRight: '0.25rem'
        }
      }
    }
  },
  plugins: []
}
