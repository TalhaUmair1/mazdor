import { defineEventHandler, getQuery } from 'h3'
import db from '~/server/utils/db' // Adjust the import path if necessary
import { profile } from '~/server/database/schema' // Adjust the import path if necessary
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { serviceId, locationId } = getQuery(event)

  if (!serviceId || !locationId) {
    console.warn('Both serviceId and locationId are required for the search.')
    return { data: [] }
  }

  try {
    const results = await db
      .select()
      .from(profile)
      .where(
        and(
          eq(profile.serviceId, Number(serviceId)),
          eq(profile.locationId, Number(locationId))
        )
      )

    return { data: results }
  } catch (error) {
    console.error('Error during database query:', error)

    return { data: [] }
  }
})
