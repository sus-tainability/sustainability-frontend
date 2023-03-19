module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    fontFamily: { Inter: ['Inter', 'sans-serif'], epilogue: ['Epilogue', 'sans-serif'] },
    extend: {
      colors: {
        grey: '#f5f5f5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};