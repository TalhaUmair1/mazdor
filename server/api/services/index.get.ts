import { ilike, sql } from 'drizzle-orm'
import db from '~/server/utils/db'
import { services } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
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

  // This ensures we always pass a valid .where() clause
  const whereClause = search ? ilike(services.name, `%${search}%`) : sql`TRUE`

  const [response, count] = await Promise.all([
    db.select().from(services).where(whereClause).offset(offset).limit(limit),

    db
      .select({ count: sql<number>`cast(count(${services.id}) as integer)` })
      .from(services)
      .where(whereClause),
  ])

  return {
    data: response,
    meta: {
      page,
      limit,
      total: count[0].count,
      totalPages: Math.ceil(count[0].count / limit),
    },
  }
})
