// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  srcDir: 'app/',
  modules: ['@nuxt/ui', '@nuxt/icon', 'nuxt-auth-utils', '@nuxthub/core'],
  hub: {
    db: 'sqlite'
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
  },
  nitro: {
    experimental: {
      openAPI: true,
      database: true,
    },
    cors: {
      origin: true,
      credentials: true
    }
  },

  auth: {
    session: {
      cookie: {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      }
    },
    secret: process.env.NUXT_SESSION_PASSWORD || 'your-super-long-and-secure-password-for-session-encryption',
  },
  // Force port 3000 for development
  devServer: {
    port: 3000,
  },
})
