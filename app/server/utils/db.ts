// @ts-nocheck
import Database from 'better-sqlite3'
import path from 'path'

// Initialize SQLite database instance
const dbPath = path.resolve(process.cwd(), 'mazdor.db')
export const db = new Database(dbPath)

export function ensureUserTable() {
  db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT,
    updated_at TEXT
  )`)
}

export function getUserByEmail(email: string) {
  const row = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').get(email)
  return row
}

export function insertUser(email: string, passwordHash: string) {
  const now = new Date().toISOString()
  const stmt = db.prepare('INSERT INTO users (email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?)')
  const info = stmt.run(email, passwordHash, now, now)
  return { id: info.lastInsertRowid, email }
}

export function closeDb() {
  db.close()
}

export default db
