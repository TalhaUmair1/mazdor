// Simple database setup script
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from './server/database/schema.js'

try {
  // Create database connection
  const sqlite = new Database('mazdor.db')
  const db = drizzle(sqlite, { schema })
  
  console.log('Database created successfully!')
  console.log('Tables will be created when the app starts')
  
  sqlite.close()
} catch (error) {
  console.error('Database setup error:', error)
}