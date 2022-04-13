const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  mode: 'jit',
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
       'xxs': '.50rem'
      },
      fontFamily: {
        sans: ["Balto", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        drift: {
          cyan: '#2cffff',
          yellow: '#ffff05',
          magenta: '#ff5ae5',
          lime: '#c8ff00',
          violet: '#b312ff',
          grey: '#BABCBE',
          orange: '#ff8329',
          indigo: '#3f0fff'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
