// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@nuxt/fonts"],
  i18n: {
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
        name: "English (US)",
      },
    ],
    langDir: "locales",
    defaultLocale: "en",
  },
  fonts: {
    provider: "fontshare",
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
      styles: ["normal", "italic"],
    },
  },
})
