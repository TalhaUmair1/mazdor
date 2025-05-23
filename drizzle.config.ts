import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './server/database/migrations',
  schema: './server/database/schema.ts',
  dialect: 'postgresql',
  extensionsFilters: ['postgis'],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
