// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-06-25",
  devtools: { enabled: true },
  app: {
    head: {
      title: "PYC",
      // Load preflight script from /theme-preflight.js to avoid inline typing issues
      script: [{ src: "/theme-preflight.js" }],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n", // 👈 solo se declara aquí
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [],
  css: ["~/assets/css/main.css"],
});
