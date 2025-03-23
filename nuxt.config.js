// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // runtimeConfig: {
  //   public: {
  //     appUrl: "https://api.escuelajs.co/api/v1",
  //   },
  // },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@vesp/nuxt-fontawesome",
    "@pinia/nuxt",
  ],
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
      },
    ],
  },
  fontawesome: {
    icons: {
      solid: ["cog"],
    },
  },
  css: ["@fortawesome/fontawesome-free/css/all.min.css"],
});
