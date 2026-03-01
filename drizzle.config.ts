import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './server/database/migrations',
  schema: './server/database/schema.ts',
  dialect: 'sqlite',
  driver: 'sqlite-cloud',
  dbCredentials: {
    url: process.env.SQLITE_CLOUD_URL!,
  },
})