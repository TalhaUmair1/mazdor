import { ilike, sql } from 'drizzle-orm'
import db from '~/server/utils/db'
import { services } from '~/server/database/schema'

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
      .from(services)
      .where(search ? ilike(services.name, `%${search}%`) : undefined)
      .offset(offset)
      .limit(limit),
    db
      .select({ count: sql<number>`cast(count(${services.id}) as integer)` })
      .from(services)
      .where(search ? ilike(services.name, `%${search}%`) : undefined),
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
