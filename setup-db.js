// Database setup and seed script
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './server/database/schema.ts'
import { readFileSync } from 'fs'

try {
  // Create database connection
  const client = createClient({
    url: 'file:mazdor.db'
  })
  const db = drizzle(client, { schema })
  
  console.log('Database connection established!')
  
  // Load seed data from data.json
  const seedData = JSON.parse(readFileSync('./data.json', 'utf-8'))
  
  // Check if data already exists
  const existingUsers = db.select().from(schema.users).all()
  
  if (existingUsers.length === 0) {
    console.log('Seeding database with initial data...')
    
    // Insert services
    if (seedData.services && seedData.services.length > 0) {
      for (const service of seedData.services) {
        db.insert(schema.services).values(service).run()
      }
      console.log(`✓ Inserted ${seedData.services.length} services`)
    }
    
    // Insert locations
    if (seedData.locations && seedData.locations.length > 0) {
      for (const location of seedData.locations) {
        db.insert(schema.locations).values(location).run()
      }
      console.log(`✓ Inserted ${seedData.locations.length} locations`)
    }
    
    // Insert users
    if (seedData.users && seedData.users.length > 0) {
      for (const user of seedData.users) {
        db.insert(schema.users).values({
          ...user,
          created_at: user.created_at ? new Date(user.created_at) : new Date(),
          updated_at: user.updated_at ? new Date(user.updated_at) : new Date(),
        }).run()
      }
      console.log(`✓ Inserted ${seedData.users.length} users`)
    }
    
    // Insert profiles
    if (seedData.profiles && seedData.profiles.length > 0) {
      for (const profile of seedData.profiles) {
        db.insert(schema.profile).values({
          ...profile,
          created_at: profile.created_at ? new Date(profile.created_at) : new Date(),
          updated_at: profile.updated_at ? new Date(profile.updated_at) : new Date(),
          deleted_at: profile.deleted_at ? new Date(profile.deleted_at) : null,
        }).run()
      }
      console.log(`✓ Inserted ${seedData.profiles.length} profiles`)
    }
    
    // Insert profile service areas
    if (seedData.profileServiceAreas && seedData.profileServiceAreas.length > 0) {
      for (const area of seedData.profileServiceAreas) {
        db.insert(schema.profileServiceAreas).values(area).run()
      }
      console.log(`✓ Inserted ${seedData.profileServiceAreas.length} profile service areas`)
    }
    
    console.log('\n✅ Database seeded successfully!')
  } else {
    console.log('⚠ Database already has data, skipping seed')
  }
  
  console.log('\nDatabase setup complete!')
} catch (error) {
  console.error('❌ Database setup error:', error)
  process.exit(1)
}