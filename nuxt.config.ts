// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["@techmely/reset-css", "~/assets/scss/main.scss"],
  modules: ["nuxt-icon", "@pinia/nuxt", "@sidebase/nuxt-auth"],
  auth: {
    baseURL: process.env.NEXTAUTH_URL,
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
});
