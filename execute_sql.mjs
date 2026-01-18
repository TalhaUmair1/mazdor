import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'mazdor.db');
const db = new Database(dbPath);

try {
  // Read the SQL file
  const sql = fs.readFileSync('services_insert.sql', 'utf8');
  
  // Split by semicolon and execute each statement
  const statements = sql.split(';').filter(stmt => stmt.trim());
  
  console.log(`Executing ${statements.length} INSERT statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i].trim();
    if (statement) {
      try {
        db.exec(statement);
        console.log(`✓ Executed statement ${i + 1}/${statements.length}`);
      } catch (error) {
        if (!error.message.includes('UNIQUE constraint failed')) {
          console.error(`✗ Error executing statement ${i + 1}:`, error.message);
        } else {
          console.log(`○ Statement ${i + 1} skipped (duplicate)`);
        }
      }
    }
  }
  
  console.log('✅ All services have been added to the database!');
  
  // Verify by counting services
  const count = db.prepare('SELECT COUNT(*) as count FROM services').get();
  console.log(`Total services in database: ${count.count}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
}