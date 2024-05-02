export default defineNuxtConfig({
  app: {
    head: {
      title: "CS2 KZ",
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 5173,
  },
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@nuxt/fonts"],
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "zh",
        iso: "zh-CN",
        file: "zh.json",
        name: "简体中文",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
      },
    ],
    langDir: "locales",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
  fonts: {
    provider: "bunny",
    defaults: {
      weights: [400, 500, 600, 700, 800],
      styles: ["normal"],
    },
  },
  ssr: false,
})
