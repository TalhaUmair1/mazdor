import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import path from 'path'

// Initialize SQLite database
const dbPath = path.resolve(process.cwd(), 'mazdor.db')
const client = createClient({
  url: `file:${dbPath}`
})

import * as schema from '../database/schema'

// Create Drizzle instance
export const db = drizzle(client, { schema })

// Export as default for compatibility with existing imports
export default db