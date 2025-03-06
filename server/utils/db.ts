import { createDatabase } from 'db0'
import postgresql from 'db0/connectors/postgresql'
import { drizzle } from 'drizzle-orm/postgres-js'

const db = drizzle(
  createDatabase(
    postgresql({
      url: process.env.DATABASE_URL!,
    })
  )
)

export default db
