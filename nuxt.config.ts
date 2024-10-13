// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,

  devtools: {
    enabled: false,
  },

  ui: {
    icons: {},
  },

  app: {
    head: {
      htmlAttrs: { dir: "rtl" },
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    // baseURL: '/admin-panel/'
  },

  modules: ["nuxt-icon", "@pinia/nuxt", "@nuxt/ui", "dayjs-nuxt"],
  css: ["~/assets/css/app.css"],

  dayjs: {
    plugins: ["duration", "relativeTime"],
  },

  // colorMode: {
  //   preference: 'light'
  // },

  runtimeConfig: {
    public: {
      env: "dev",
      baseUrl: "http://rahtak.local/api",
    },
  },

  compatibilityDate: "2024-07-11",
});
