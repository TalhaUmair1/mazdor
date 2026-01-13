import db from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // query params
    const query = getQuery(event) as {
      search?: string
      page?: number
      limit?: number
    }
    const { search } = query
    const { page = 1, limit = 20 } = query
    const offset = (page - 1) * limit

    // Get all locations
    const locationsQuery = db.select().from('locations')
    let allLocations = await locationsQuery.limit(100)

    // Filter by search if provided
    if (search) {
      allLocations = allLocations.filter((location: any) => 
        location.name && location.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply pagination
    const response = allLocations.slice(offset, offset + limit)
    const count = allLocations.length

    return {
      data: response,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch locations',
    })
  }
})