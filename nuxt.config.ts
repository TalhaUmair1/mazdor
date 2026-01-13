// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  srcDir: 'app/',
  modules: ['@nuxt/ui', '@nuxt/icon', 'nuxt-auth-utils', 'nuxt-file-storage'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
  },
  nitro: {
    experimental: {
      openAPI: true,
      database: true,
    },
  },
  fileStorage: {
    mount: './public',
  },
})
