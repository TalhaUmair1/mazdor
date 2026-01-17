import { defineEventHandler, getQuery, createError } from 'h3'
import { db } from '~~/server/utils/db'
import { profile, users, services } from '~~/server/database/schema'
import { eq, and, desc, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 6
    const offset = (page - 1) * limit

    // Get profiles with joined user and service data
    const profiles = await db.select({
      id: profile.id,
      title: profile.title,
      min_price: profile.min_price,
      description: profile.description,
      service_type: profile.service_type,
      experience: profile.experience,
      user_name: users.name,
      user_avatar: users.avatar,
      service_name: services.name,
      service_svg: services.svg,
    })
    .from(profile)
    .leftJoin(users, eq(profile.user_id, users.id))
    .leftJoin(services, eq(profile.service_id, services.id))
    .orderBy(desc(profile.created_at))
    .offset(offset)
    .limit(limit)
    
    // Get total count
    const totalResult = await db.select({ count: count() }).from(profile)
    const total = Number(totalResult[0].count)

    return {
      profiles: profiles.map(p => ({
        id: p.id,
        title: p.title,
        min_price: p.min_price,
        description: p.description,
        service_type: p.service_type,
        experience: p.experience,
        user: {
          name: p.user_name,
          avatar: p.user_avatar,
        },
        service: {
          name: p.service_name,
          svg: p.service_svg,
        }
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Error fetching profiles:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch profiles',
    })
  }
})