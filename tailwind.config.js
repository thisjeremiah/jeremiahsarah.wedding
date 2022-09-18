const defaultTheme = require('tailwindcss/defaultTheme')

// cobalt
// slate ~~
// terracotta
// lemon --
// fuschia
// blossom

const colors = {
  fuschia: {
    50: '#fcf4f7',
    100: '#fae8ee',
    200: '#f2c6d5',
    300: '#eba4bb',
    400: '#db6088',
    500: '#cc1c55',
    600: '#b8194d',
    700: '#991540',
    800: '#7a1133',
    900: '#640e2a',
  },
  blossom: {
    50: '#fefcfd',
    100: '#fdfafa',
    200: '#fbf2f4',
    300: '#f9e9ed',
    400: '#f4d9df',
    500: '#efc9d1',
    600: '#d7b5bc',
    700: '#b3979d',
    800: '#8f797d',
    900: '#756266',
  },
  rose: {
    DEFAULT: '#E7CABD',
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFFFF',
    300: '#FDFAF9',
    400: '#F2E2DB',
    500: '#E7CABD',
    600: '#D8A994',
    700: '#C9886B',
    800: '#B96743',
    900: '#8F5034',
  },
  terracotta: {
    50: '#fcf8f6',
    100: '#f9f1ed',
    200: '#f0dcd2',
    300: '#e7c7b6',
    400: '#d69e80',
    500: '#c47449',
    600: '#b06842',
    700: '#935737',
    800: '#76462c',
    900: '#603924',
  },
  berry: {
    DEFAULT: '#D48369',
    50: '#FDF9F8',
    100: '#F8ECE8',
    200: '#EFD2C8',
    300: '#E6B7A8',
    400: '#DD9D89',
    500: '#D48369',
    600: '#C85F3D',
    700: '#9F492E',
    800: '#743521',
    900: '#482115',
  },
  lemon: {
    DEFAULT: '#F1D895',
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFFFF',
    300: '#FBF3DD',
    400: '#F6E5B9',
    500: '#F1D895',
    600: '#EAC663',
    700: '#E4B432',
    800: '#C4961A',
    900: '#927013',
  },
  sky: {
    DEFAULT: '#92C0F1',
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FEFFFF',
    300: '#DAEAFA',
    400: '#B6D5F6',
    500: '#92C0F1',
    600: '#60A3EB',
    700: '#2F87E4',
    800: '#196BC2',
    900: '#134F90',
  },
  cobalt: {
    DEFAULT: '#2C3C81',
    50: '#8D9BD8',
    100: '#7D8DD3',
    200: '#5F73C8',
    300: '#4158BE',
    400: '#364A9F',
    500: '#2C3C81',
    600: '#1E2957',
    700: '#0F152D',
    800: '#010204',
    900: '#000000',
  },
  fog: {
    DEFAULT: '#D4D1CC',
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFFFF',
    300: '#F9F9F8',
    400: '#E7E5E2',
    500: '#D4D1CC',
    600: '#BAB6AE',
    700: '#A19A8F',
    800: '#867E71',
    900: '#686258',
  },
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    cursor: {
      default: createCursor(colors.cobalt['600'], 'white'),
      pointer: createPointer('white', colors.cobalt['600']),
    },
    extend: {
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Cooper', ...defaultTheme.fontFamily.serif],
        fairplex: ['fairplex-narrow', ...defaultTheme.fontFamily.serif],
        ['fairplex-wide']: ['fairplex-wide', ...defaultTheme.fontFamily.serif],
      },
      colors: colors,
      cursor: {
        rose: createCursor(colors.rose['800'], colors.rose['200']),
        berry: createCursor(colors.berry['800'], colors.berry['200']),
        lemon: createCursor(colors.lemon['800'], colors.lemon['200']),
        sky: createCursor(colors.sky['800'], colors.sky['200']),
        fog: createCursor(colors.fog['800'], colors.fog['200']),
        terracotta: createCursor(colors.terracotta['700'], '#ffffff'),
        fuschia: createCursor(colors.fuschia['700'], colors.fuschia['100']),
        ['rose-pointer']: createPointer(colors.rose['800'], '#ffffff'),
        ['berry-pointer']: createPointer(
          colors.berry['800'],
          colors.berry['200'],
        ),
        ['lemon-pointer']: createPointer(
          colors.lemon['800'],
          colors.lemon['200'],
        ),
        ['sky-pointer']: createPointer(colors.sky['800'], colors.sky['200']),
        ['fog-pointer']: createPointer(colors.fog['800'], colors.fog['200']),
      },
      keyframes: {
        heart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.333)' },
        },
      },
      animation: {
        heart: 'heart 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('initial', 'html :where(&)')
    },
  ],
}

function createCursor(bgColor, borderColor) {
  borderColor = sanitizeColor(borderColor)
  bgColor = sanitizeColor(bgColor)

  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' x='0px' y='0px' viewBox='0 0 28 28'%3E%3Cpolygon fill='${borderColor}' points='8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 '%3E%3C/polygon%3E%3Cpolygon fill='${borderColor}' points='17.3,21.6 13.7,23.1 9,12 12.7,10.5 '%3E%3C/polygon%3E%3Crect x='12.5' y='13.6' fill='${bgColor}' transform='matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)' width='2' height='8'%3E%3C/rect%3E%3Cpolygon points='9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 ' fill='${bgColor}'%3E%3C/polygon%3E%3C/svg%3E%0A") 9 8, default`
}

function createPointer(bgColor, borderColor) {
  borderColor = sanitizeColor(borderColor)
  bgColor = sanitizeColor(bgColor)

  return `url("data:image/svg+xml,%3Csvg width='32' height='32' enable-background='new 0 0 32 32' version='1.1' viewBox='0 0 32 32' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Crect id='b' width='32' height='32'/%3E%3C/defs%3E%3CclipPath id='a'%3E%3Cuse overflow='visible' xlink:href='%23b'/%3E%3C/clipPath%3E%3Cpath d='m11.3 20.4c-0.3-0.4-0.6-1.1-1.2-2-0.3-0.5-1.2-1.5-1.5-1.9-0.2-0.4-0.2-0.6-0.1-1 0.1-0.6 0.7-1.1 1.4-1.1 0.5 0 1 0.4 1.4 0.7 0.2 0.2 0.5 0.6 0.7 0.8s0.2 0.3 0.4 0.5c0.2 0.3 0.3 0.5 0.2 0.1-0.1-0.5-0.2-1.3-0.4-2.1-0.1-0.6-0.2-0.7-0.3-1.1-0.1-0.5-0.2-0.8-0.3-1.3-0.1-0.3-0.2-1.1-0.3-1.5-0.1-0.5-0.1-1.4 0.3-1.8 0.3-0.3 0.9-0.4 1.3-0.2 0.5 0.3 0.8 1 0.9 1.3 0.2 0.5 0.4 1.2 0.5 2 0.2 1 0.5 2.5 0.5 2.8 0-0.4-0.1-1.1 0-1.5 0.1-0.3 0.3-0.7 0.7-0.8 0.3-0.1 0.6-0.1 0.9-0.1 0.3 0.1 0.6 0.3 0.8 0.5 0.4 0.6 0.4 1.9 0.4 1.8 0.1-0.4 0.1-1.2 0.3-1.6 0.1-0.2 0.5-0.4 0.7-0.5 0.3-0.1 0.7-0.1 1 0 0.2 0 0.6 0.3 0.7 0.5 0.2 0.3 0.3 1.3 0.4 1.7 0 0.1 0.1-0.4 0.3-0.7 0.4-0.6 1.8-0.8 1.9 0.6v1.1 1.2c0 0.4-0.1 1.3-0.2 1.7-0.1 0.3-0.4 1-0.7 1.4 0 0-1.1 1.2-1.2 1.8s-0.1 0.6-0.1 1 0.1 0.9 0.1 0.9-0.8 0.1-1.2 0-0.9-0.8-1-1.1c-0.2-0.3-0.5-0.3-0.7 0-0.2 0.4-0.7 1.1-1.1 1.1-0.7 0.1-2.1 0-3.1 0 0 0 0.2-1-0.2-1.4l-1.1-1.1-1.1-0.7z' clip-path='url(%23a)' fill='${bgColor}'/%3E%3Cpath d='m11.3 20.4c-0.3-0.4-0.6-1.1-1.2-2-0.3-0.5-1.2-1.5-1.5-1.9-0.2-0.4-0.2-0.6-0.1-1 0.1-0.6 0.7-1.1 1.4-1.1 0.5 0 1 0.4 1.4 0.7 0.2 0.2 0.5 0.6 0.7 0.8s0.2 0.3 0.4 0.5c0.2 0.3 0.3 0.5 0.2 0.1-0.1-0.5-0.2-1.3-0.4-2.1-0.1-0.6-0.2-0.7-0.3-1.1-0.1-0.5-0.2-0.8-0.3-1.3-0.1-0.3-0.2-1.1-0.3-1.5-0.1-0.5-0.1-1.4 0.3-1.8 0.3-0.3 0.9-0.4 1.3-0.2 0.5 0.3 0.8 1 0.9 1.3 0.2 0.5 0.4 1.2 0.5 2 0.2 1 0.5 2.5 0.5 2.8 0-0.4-0.1-1.1 0-1.5 0.1-0.3 0.3-0.7 0.7-0.8 0.3-0.1 0.6-0.1 0.9-0.1 0.3 0.1 0.6 0.3 0.8 0.5 0.4 0.6 0.4 1.9 0.4 1.8 0.1-0.4 0.1-1.2 0.3-1.6 0.1-0.2 0.5-0.4 0.7-0.5 0.3-0.1 0.7-0.1 1 0 0.2 0 0.6 0.3 0.7 0.5 0.2 0.3 0.3 1.3 0.4 1.7 0 0.1 0.1-0.4 0.3-0.7 0.4-0.6 1.8-0.8 1.9 0.6v1.1 1.2c0 0.4-0.1 1.3-0.2 1.7-0.1 0.3-0.4 1-0.7 1.4 0 0-1.1 1.2-1.2 1.8s-0.1 0.6-0.1 1 0.1 0.9 0.1 0.9-0.8 0.1-1.2 0-0.9-0.8-1-1.1c-0.2-0.3-0.5-0.3-0.7 0-0.2 0.4-0.7 1.1-1.1 1.1-0.7 0.1-2.1 0-3.1 0 0 0 0.2-1-0.2-1.4l-1.1-1.1-1.1-0.7z' clip-path='url(%23a)' fill='none' stroke='${borderColor}' stroke-linecap='round' stroke-linejoin='round' stroke-width='.75'/%3E%3Cline x1='19.6' x2='19.6' y1='20.7' y2='17.3' clip-path='url(%23a)' fill='none' stroke='${borderColor}' stroke-linecap='round' stroke-width='.75'/%3E%3Cline x1='17.6' x2='17.5' y1='20.7' y2='17.3' clip-path='url(%23a)' fill='none' stroke='${borderColor}' stroke-linecap='round' stroke-width='.75'/%3E%3Cline x1='15.6' x2='15.6' y1='17.3' y2='20.7' clip-path='url(%23a)' fill='none' stroke='${borderColor}' stroke-linecap='round' stroke-width='.75'/%3E%3C/svg%3E") 9 8, default`
}

function sanitizeColor(color) {
  return color.replace('#', '%23')
}
