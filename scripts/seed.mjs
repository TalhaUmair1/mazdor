// Seed a clean database with a test user (compatible with Drizzle schema)
import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'mazdor.db')
const db = new Database(dbPath)

// Drop and recreate a simplified users table compatible with this project
db.exec(`DROP TABLE IF EXISTS users`)
db.exec(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  avatar TEXT,
  created_at TEXT,
  updated_at TEXT
)`)

const email = 'test@example.com'
const password = 'password123'
const hash = await hashPassword(password, 10)
const now = new Date().toISOString()
const stmt = db.prepare('INSERT INTO users (name, email, password, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)')
stmt.run('Test User', email, hash, '', now, now)

console.log('Seeded test user:', email)
db.close()
