import { db } from '~~/server/utils/db'
import { defineEventHandler, getQuery, createError } from 'h3'
import { locations } from '~~/server/database/schema'
import { sql, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 40
    const search = query.search as string
    const offset = (page - 1) * limit

    // Get total count
    let total;
    if (search) {
      const totalResult = await db.select({ count: count() }).from(locations).where(
        sql`lower(${locations.name}) LIKE ${'%' + search.toLowerCase() + '%'} `
      );
      total = Number(totalResult[0].count);
    } else {
      const totalResult = await db.select({ count: count() }).from(locations);
      total = Number(totalResult[0].count);
    }
    
    // Get paginated results
    let response;
    if (search) {
      response = await db.select().from(locations).where(
        sql`lower(${locations.name}) LIKE ${'%' + search.toLowerCase() + '%'} `
      ).offset(offset).limit(limit);
    } else {
      response = await db.select().from(locations).offset(offset).limit(limit);
    }

    return {
      data: response,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch locations',
    })
  }
})