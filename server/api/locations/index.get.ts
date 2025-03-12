import db from '~/server/utils/db'
import { locations } from '~/server/database/schema'

export default defineEventHandler(async () => {
  const allLocations = await db.select().from(locations)
  return { success: true, data: locations }
})
