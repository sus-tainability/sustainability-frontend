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
      animation: {
        fadeIn: "fadeIn 3.5s ease-in",
        grow: "grow 1s ease-in-out",
      },
      keyframes: {
        grow: {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
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
