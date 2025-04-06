import db from '~/server/utils/db'
import { locations } from '~/server/database/schema'

export default defineEventHandler(async () => {
  const allLocations = await db.select().from(locations).limit(200)
  return allLocations
})
