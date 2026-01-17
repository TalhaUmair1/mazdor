const Database = require('better-sqlite3');
const path = require('path');

// Initialize SQLite database
const dbPath = path.resolve(process.cwd(), 'mazdor.db');
const db = new Database(dbPath);

try {
  // Add password column to users table
  db.exec('ALTER TABLE users ADD COLUMN password TEXT');
  console.log('Password column added successfully');
  
  // Test the schema
  const columns = db.prepare('PRAGMA table_info(users)').all();
  console.log('Users table columns:', columns.map(c => c.name));
  
  db.close();
} catch (error) {
  console.log('Error or column might already exist:', error.message);
  db.close();
}