import db from '~/server/utils/db'
import { services } from '~/server/database/schema'

export default defineEventHandler(async () => {
  const allServices = await db.select().from(services)
  return { success: true, data: allServices }
})
