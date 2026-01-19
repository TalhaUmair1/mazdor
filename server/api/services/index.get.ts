import { db } from '~~/server/utils/db'
import { defineEventHandler, getQuery, createError } from 'h3'
import { services } from '~~/server/database/schema'
import { sql, count } from 'drizzle-orm'

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

    // Get total count
    let total;
    if (search) {
      const totalResult = await db.select({ count: count() }).from(services).where(
        sql`lower(${services.name}) LIKE ${'%' + search.toLowerCase() + '%'} `
      );
      total = Number(totalResult[0].count);
    } else {
      const totalResult = await db.select({ count: count() }).from(services);
      total = Number(totalResult[0].count);
    }
    
    // Get paginated results
    let response;
    if (search) {
      response = await db.select().from(services).where(
        sql`lower(${services.name}) LIKE ${'%' + search.toLowerCase() + '%'} `
      ).offset(offset).limit(limit);
    } else {
      response = await db.select().from(services).offset(offset).limit(limit);
    }

    return {
      data: response,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Error fetching services:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch services',
    })
  }
})