export default {
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./assets/**/*.{vue,js,ts}",
    "./sections/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1650px',
      },
      colors: {
        primary: {
          100: "#e6f1fb",
          200: "#bfdcf5",
          300: "#99c7ef",
          400: "#4d9de3",
          500: "#0073d6", // un poco más claro que base
          600: "#0068c5",
          700: "#005dba", // tu color base
          800: "#004a94",
          900: "#003670",
          1000: "#00224c",
        },
        secondary: {
          100: "#e6f9ff",
          200: "#b3ecff",
          300: "#80e0ff",
          400: "#4dd3ff",
          500: "#1ac7ff",
          600: "#00bfff",
          700: "#00b2ff", // tu color base
          800: "#0090cc",
          900: "#006d99",
          1000: "#004966",
        },
      },
    },
  },
  plugins: [],
};
