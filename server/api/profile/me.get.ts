import { defineEventHandler, createError } from 'h3'
import { db } from '~~/server/utils/db'
import { profile, users, services } from '~~/server/database/schema'
import { eq, desc } from 'drizzle-orm'

// getUserSession is provided by nuxt-auth-utils module
export default defineEventHandler(async (event) => {
  try {
    // Get the authenticated user from the session
    const session: any = await getUserSession(event)
    const userId = session?.user?.id
    
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized: No user session found',
      })
    }

    // Fetch profiles belonging to the authenticated user only
    const userProfiles = await db.select({
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
    .where(eq(profile.user_id, userId))
    .orderBy(desc(profile.created_at))

    return {
      profiles: userProfiles.map(p => ({
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
      }))
    }
  } catch (error) {
    console.error('Error fetching user profiles:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch user profiles',
    })
  }
})