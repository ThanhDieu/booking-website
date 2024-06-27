/** @type {import('tailwindcss').Config} */
const { default: loadCustomRoutes } = require('next/dist/lib/load-custom-routes');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      Inter: 'Inter',
    },
    colors: {
      TransParent: '#00000000',
      PrimaryBlack: '#0E1013',
      SecondaryBlack: '#393B3D',
      SecondaryGrey: '#D0D2D1',
      NeutralSecondaryBlack: '#35393B',
      MidGrey: '#838383',
      Deactive: '#61666B',
      PlaceHolderGrey: '#A5A7A7',
      PlaceHolderDarkGrey: '#646667',
      PrimaryWhite: '#ffffff',
      PrimaryGrey: '#FAFAFA',
      Surface: '#F8F9FA',
      LightGrey: '#D9D9D9',
      DarkGrey: '#1D1F20',
      PrimaryRed: '#DB3B21',
      SecondaryBlue: '#799CC2',
      PrimaryBlue: '#3A6EA5',
      DarkBlue: ' #2d5185',
      HoverBlue: '#274B70',
      PrimaryYellow: '#FFD166',
      SecondaryYellow: '#FFE097',
      DateHigh: '#FD6040',
      DateNormal: '#FEB148',
      DateLow: '#2CA3A8',
      TonalGrey: '#eff0f0',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
        lg: '3.75rem',
        xl: '2.5rem',
        '2xl': '10.5rem',
      },
    },
    screens: {
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },

  plugins: [
    plugin(function({ addBase, theme }) {
      addBase([
        {
          '@media (max-width: 639px)': {
            h1: {
              fontSize: '32px',
              fontWeight: '400',
              lineHeight: '38px',
            },
            h2: {
              fontSize: '28px',
              fontWeight: '400',
              lineHeight: '34px',
            },
            h3: {
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '28px',
            },
            h4: {
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '24px',
            },
            h5: {
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '22px',
            },
          },
        },
        {
          '@media (min-width: 640px)': {
            h1: {
              fontSize: '46px',
              fontWeight: '400',
              lineHeight: '57px',
            },
            h2: {
              fontSize: '38px',
              fontWeight: '400',
              lineHeight: '47px',
            },
            h3: {
              fontSize: '30px',
              fontWeight: '400',
              lineHeight: '38px',
            },
            h4: {
              fontSize: '22px',
              fontWeight: '400',
              lineHeight: '28px',
            },
            h5: {
              fontSize: '19px',
              fontWeight: '500',
              lineHeight: '24px',
            },
          },
        },
        {
          '@media (min-width: 1280px)': {
            h1: {
              fontSize: '60px',
              fontWeight: '400',
              lineHeight: '76px',
            },
            h2: {
              fontSize: '48px',
              fontWeight: '400',
              lineHeight: '60px',
            },
            h3: {
              fontSize: '36px',
              fontWeight: '400',
              lineHeight: '48px',
            },
            h4: {
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '32px',
            },
            h5: {
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '26px',
            },
          },
        },
      ]);
    }),
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
};
