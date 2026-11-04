/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './privacy.html', './terms.html', './src/**/*.js'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        brand: {
          50: '#EEF7F1',
          100: '#D6EDDF',
          200: '#AEDBBF',
          300: '#7CC29A',
          400: '#47A172',
          500: '#2A7F52',
          600: '#1B5E3A', // primary
          700: '#164D30',
          800: '#123D27',
          900: '#0D2C1C',
        },
        gold: {
          50: '#FBF6E6',
          100: '#F5EAC4',
          300: '#E2C766',
          500: '#C9A227', // accent: decorative use only (fails 4.5:1 as text on white)
          700: '#7A6012', // gold for text on light backgrounds (≥ 4.5:1)
        },
        cream: '#FBFAF5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 16px -4px rgba(16, 24, 40, 0.06)',
        lift: '0 2px 4px rgba(16, 24, 40, 0.04), 0 16px 32px -8px rgba(27, 94, 58, 0.14)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
