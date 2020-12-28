module.exports = {
  purge: ['./src/**/*.vue', './src/**/*.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: { max: '639px' },
        ph: { max: '425px' },
      },
    },
  },
  variants: {},
  plugins: [],
};
