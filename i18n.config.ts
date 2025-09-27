// i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locales: [
    { code: "es", iso: "es-ES", file: "es.json", name: "Español" },
    { code: "en", iso: "en-US", file: "en.json", name: "English" },
  ],
  defaultLocale: "es",
  lazy: true,                // 👈 habilitar lazy
  langDir: "locales/",       // 👈 asegurarte que existe /locales/en.json y /locales/es.json
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    fallbackLocale: "es",
  },
}));
