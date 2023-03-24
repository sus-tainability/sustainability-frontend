const TailWindTheme = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      fontFamily: {
        header: ["Cabin", "sans-serif"],
        body: ["Titillium Web", "sans-serif"],
      },
      colors: {
        lightShade: "#F5F8F8",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

module.exports = TailWindTheme;
