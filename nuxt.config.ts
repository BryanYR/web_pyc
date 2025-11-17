// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-25',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'PYC',
      script: [{ src: '/theme-preflight.js', defer: true }],
      link: [
        // Preload critical CSS
        { rel: 'preload', as: 'style', href: '/css/critical.css' }
      ]
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
  ],
  build: {
    transpile: ['vue-toastification'],
  },
  vite: {
    build: {
      cssMinify: 'esbuild',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'swiper': ['swiper'],
          }
        }
      }
    },
    css: {
      devSourcemap: false,
    }
  },
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    }
  }
})
