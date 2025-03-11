import { createDatabase } from 'db0'
import postgresql from 'db0/connectors/postgresql'
import { drizzle } from 'db0/integrations/drizzle'

const db = drizzle(
  createDatabase(
    postgresql({
      url: process.env.DATABASE_URL!,
    })
  )
)

export default db
