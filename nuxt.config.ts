// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', 'nuxt-auth-utils', 'nuxt-file-storage'],
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
