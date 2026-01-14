import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import path from 'path'

// Initialize SQLite database
const dbPath = path.resolve(process.cwd(), 'mazdor.db')
const sqlite = new Database(dbPath)

// Create Drizzle instance
export const db = drizzle(sqlite)

// Export as default for compatibility with existing imports
export default db

// Export schema for convenience
import * as schema from '../database/schema'
export { schema }