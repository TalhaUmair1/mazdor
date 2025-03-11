// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', 'nuxt-auth-utils'],
  colorMode: {
    preference: 'light',
  },
  nitro: {
    openAPI: {
      meta: {
        title: 'My Awesome Project',
        description: 'This might become the next big thing.',
        version: '1.0',
      },
    },
  },
})
