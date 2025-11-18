export default defineNuxtConfig({
  compatibilityDate: '2025-06-25',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'PYC',
      link: [
      {
        rel: "preload",
        href: "/fonts/sf/SF-Regular.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/sf/SF-Medium.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/sf/SF-Bold.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
    ],
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
      ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
    },
  },
  css: [
    '~/assets/css/main.css',
  ],
  build: {
    transpile: ['vue-toastification'],
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Separate heavy libraries into their own chunks
            if (id.includes('swiper')) return 'swiper'
            if (id.includes('vue-toastification')) return 'toast'
            if (id.includes('@wangeditor')) return 'editor'
          }
        }
      }
    }
  },
  experimental: {
    treeshakeClientOnly: true,
  },
  routeRules: {
    // Prerender static pages with SWR cache
    '/blog': { swr: 3600 },
    '/blog/**': { swr: 3600 }
  }
})