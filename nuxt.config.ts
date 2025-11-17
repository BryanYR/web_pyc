// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-25',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'PYC',
      script: [{ src: '/theme-preflight.js' }],
    },
  },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  plugins: ['~/plugins/pinia'],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'es',
    langDir: 'locales',
    locales: [
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
    ],
    vueI18n: './i18n/i18n.config.ts',
    detectBrowserLanguage: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '~/assets/css/main.css',
    // Swiper styles (ensure proper rendering in Safari and all browsers)
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    '@wangeditor/editor/dist/css/style.css'
  ],
  build: {
    transpile: ['vue-toastification'],
  },
})
