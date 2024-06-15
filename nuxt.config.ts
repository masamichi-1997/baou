// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["@techmely/reset-css", "~/assets/scss/main.scss"],
  modules: ["nuxt-icon", "@pinia/nuxt"],
});
