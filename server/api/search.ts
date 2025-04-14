import { defineEventHandler, getQuery } from 'h3'
import db from '~/server/utils/db' // Adjust the import path if necessary
import { locations } from '~/server/database/schema' // Adjust the import path if necessary

export default defineEventHandler(async (event) => {
  const { serviceId, locationId } = getQuery(event)
  // log the query parameters for debugging
  console.log('Query parameters:', { serviceId, locationId })
  if (!serviceId || !locationId) {
    console.warn('Both serviceId and locationId are required for the search.')
    return { data: [] }
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
      where: (profile, { eq, and }) =>
        and(eq(profile.service_id, Number(serviceId))),
      with: {
        serviceAreas: {
          with: {
            location: true,
          },
          where: (profileServiceAreas, { eq, or, inArray }) => {
            const locationIds = db
              .select({ id: locations.id })
              .from(locations)
              .where(eq(locations.parentId, Number(locationId)))

            return or(
              eq(profileServiceAreas.locationId, Number(locationId)),
              inArray(profileServiceAreas.locationId, locationIds)
            )
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
