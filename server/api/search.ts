import { defineEventHandler, getQuery } from 'h3'
import db from '~/server/utils/db' // Adjust the import path if necessary
import {
  locations,
  profile,
  profileServiceAreas,
} from '~/server/database/schema' // Adjust the import path if necessary
import { eq, and, or, inArray } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { serviceId, locationId } = getQuery(event)
  // log the query parameters for debugging
  console.log('Query parameters:', { serviceId, locationId })

  const whereConditions = []

  if (serviceId) {
    whereConditions.push(eq(profile.service_id, Number(serviceId)))
  }

  const serviceAreaWhereConditions = []

  if (locationId) {
    const subquery = db
      .select({ id: locations.id })
      .from(locations)
      .where(eq(locations.parentId, Number(locationId)))

    serviceAreaWhereConditions.push(
      or(
        eq(profileServiceAreas.locationId, Number(locationId)),
        inArray(profileServiceAreas.locationId, subquery)
      )
    )
  }

  try {
    const results = await db.query.profile.findMany({
      columns: {
        id: true,
        title: true,
        min_price: true,
        service_type: true,
        description: true,
      },
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      with: {
        serviceAreas: {
          where:
            serviceAreaWhereConditions.length > 0
              ? and(...serviceAreaWhereConditions)
              : undefined,
          with: {
            location: true,
          },
        },
        user: true,
      },
    })

    console.log('Search results:', results)

    return { data: results }
  } catch (error) {
    console.error('Error during database query:', error)
    return { data: [] }
  }
})
