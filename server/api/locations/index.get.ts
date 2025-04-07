import db from '~/server/utils/db'
import { locations } from '~/server/database/schema'
import { sql, ilike } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // query params
  const query = getQuery(event) as {
    search?: string
    page?: number
    limit?: number
  }
  const { search } = query
  const { page = 1, limit = 20 } = query
  const offset = (page - 1) * limit
  const [response, count] = await Promise.all([
    db
      .select()
      .from(locations)
      .where(search ? ilike(locations.name, `%${search}%`) : undefined)
      .offset(offset)
      .limit(limit),
    db
      .select({ count: sql<number>`cast(count(${locations.id}) as integer)` })
      .from(locations)
      .where(search ? ilike(locations.name, `%${search}%`) : undefined),
  ])
  return {
    data: response,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: count[0].count,
      totalPages: Math.ceil(count[0].count / limit),
    },
  }
})
