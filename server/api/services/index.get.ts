import { db } from '~~/server/utils/db'
import { defineEventHandler, getQuery, createError } from 'h3'
import { services } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    // Get query params
    const query = getQuery(event) as {
      search?: string
      page?: number
      limit?: number
    }

    const { search } = query
    const page = Number(query.page || 1)
    const limit = Number(query.limit || 8)
    const offset = (page - 1) * limit

    // Get all services
    const servicesQuery = db.select().from(services)
    let allServices = await servicesQuery.limit(100)

    // Filter by search if provided
    if (search) {
      allServices = allServices.filter((service: any) => 
        service.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply pagination
    const response = allServices.slice(offset, offset + limit)
    const count = allServices.length

    return {
      data: response,
      meta: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching services:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch services',
    })
  }
})