// Simple JSON-based database for now
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DB_FILE = join(process.cwd(), 'data.json')

// Initialize database with empty data if it doesn't exist
function initDb() {
  try {
    const data = readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    const initialData = {
      users: [],
      services: [],
      locations: [],
      profiles: [],
      profileServiceAreas: []
    }
    writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2))
    return initialData
  }
}

function saveDb(data: any) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

const db = {
  // Mock database interface that returns actual data
  select: (columns?: any) => ({
    from: (table: string) => {
      const data = initDb()
      const items = data[table] || []
      
      return {
        where: (condition: any) => ({
          limit: (limit: number) => {
            let filteredItems = items
            
            // Handle where conditions
            if (typeof condition === 'function') {
              filteredItems = items.filter(condition)
            } else if (condition && typeof condition === 'object') {
              filteredItems = items.filter((item: any) => {
                for (const [key, value] of Object.entries(condition)) {
                  if (item[key] !== value) return false
                }
                return true
              })
            }
            
            return filteredItems.slice(0, limit)
          },
          orderBy: (orderBy: any) => ({
            limit: (limit: number) => {
              let filteredItems = items
              
              if (typeof condition === 'function') {
                filteredItems = items.filter(condition)
              } else if (condition && typeof condition === 'object') {
                filteredItems = items.filter((item: any) => {
                  for (const [key, value] of Object.entries(condition)) {
                    if (item[key] !== value) return false
                  }
                  return true
                })
              }
              
              return filteredItems.slice(0, limit)
            }
          })
        }),
        limit: (limit: number) => {
          return items.slice(0, limit)
        }
      }
    }
  }),
  
  insert: (table: string) => ({
    values: (records: any) => ({
      returning: (columns?: any) => {
        const data = initDb()
        let result: any[]
        
        if (Array.isArray(records)) {
          const newRecords = records.map((record, index) => ({
            ...record,
            id: (data[table]?.length || 0) + index + 1
          }))
          data[table] = [...(data[table] || []), ...newRecords]
          result = newRecords
        } else {
          const newRecord = {
            ...records,
            id: (data[table]?.length || 0) + 1
          }
          data[table] = [...(data[table] || []), newRecord]
          result = [newRecord]
        }
        
        saveDb(data)
        return result
      }
    })
  }),
  
  update: (table: string) => ({
    set: (updates: any) => ({
      where: (condition: any) => ({
        returning: (columns?: any) => {
          const data = initDb()
          const items = data[table] || []
          let updatedItems: any[] = []
          
          data[table] = items.map((item: any) => {
            let matches = false
            
            if (typeof condition === 'function') {
              matches = condition(item)
            } else if (condition && typeof condition === 'object') {
              matches = Object.entries(condition).every(([key, value]) => item[key] === value)
            }
            
            if (matches) {
              const updatedItem = { ...item, ...updates, updated_at: new Date().toISOString() }
              updatedItems.push(updatedItem)
              return updatedItem
            }
            return item
          })
          
          saveDb(data)
          return updatedItems
        }
      })
    })
  }),
  
  delete: (table: string) => ({
    where: (condition: any) => ({
      returning: (columns?: any) => {
        const data = initDb()
        const items = data[table] || []
        let deletedItems: any[] = []
        
        data[table] = items.filter((item: any) => {
          let matches = false
          
          if (typeof condition === 'function') {
            matches = condition(item)
          } else if (condition && typeof condition === 'object') {
            matches = Object.entries(condition).every(([key, value]) => item[key] === value)
          }
          
          if (matches) {
            deletedItems.push(item)
            return false
          }
          return true
        })
        
        saveDb(data)
        return deletedItems
      }
    })
  })
}

export default db