import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '../database/schema'
import { join } from 'path'

const DATABASE_URL = process.env.DATABASE_URL || 'file:mazdor.db'
const dbPath = DATABASE_URL.replace('file:', '')
const absolutePath = join(process.cwd(), dbPath)

const sqlite = new Database(absolutePath)
const db = drizzle(sqlite, { schema })

export default db