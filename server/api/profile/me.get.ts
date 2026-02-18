import { defineEventHandler, createError } from 'h3'
// Import is made dynamic to support environments where requireUserSession
// may be exported from either '#auth' or '#auth-utils' depending on
// installed Nuxt modules versions.
import { db } from '~~/server/utils/db'
import { profile, services, profileServiceAreas, locations } from '~~/server/database/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // 1️⃣ Get logged-in user (throws 401 if not authenticated)
    // Try auth-utils first, then fallback to auth as a best-effort for mixed environments
    let requireUserSessionFn: any = null
    try {
      const modAuthUtils: any = await import('#auth-utils')
      if (typeof modAuthUtils?.requireUserSession === 'function') {
        requireUserSessionFn = modAuthUtils.requireUserSession
      }
    } catch {
      // ignore
    }
    if (!requireUserSessionFn) {
      try {
        const modAuth: any = await import('#auth')
        if (typeof modAuth?.requireUserSession === 'function') {
          requireUserSessionFn = modAuth.requireUserSession
        }
      } catch {
        // ignore
      }
    }
    if (typeof requireUserSessionFn !== 'function') {
      throw createError({ statusCode: 401, message: 'Not authenticated' })
    }
    const session = await requireUserSessionFn(event)
    if (!session?.user?.id) {
      throw createError({ statusCode: 401, message: 'Not authenticated' })
    }
    const userId = session.user.id

    // 2️⃣ Fetch user's latest profile
    const userProfiles = await db
      .select({
        id: profile.id,
        title: profile.title,
        min_price: profile.min_price,
        description: profile.description,
        service_type: profile.service_type,
        experience: profile.experience,
        shop_address: profile.shop_address,
        service_id: profile.service_id,
        service_name: services.name,
        service_svg: services.svg,
      })
      .from(profile)
      .leftJoin(services, eq(profile.service_id, services.id))
      .where(eq(profile.user_id, userId))
      .orderBy(desc(profile.created_at))
      .limit(1)

    if (!userProfiles || userProfiles.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Profile not found',
      })
    }

    const userProfile = userProfiles[0]

    // 3️⃣ Fetch service areas for this profile
    const serviceAreas = await db
      .select({
        locationId: profileServiceAreas.locationId,
        locationName: locations.name,
      })
      .from(profileServiceAreas)
      .leftJoin(locations, eq(profileServiceAreas.locationId, locations.id))
      .where(eq(profileServiceAreas.profileId, userProfile.id))

    // 4️⃣ Response
    return {
      id: userProfile.id,
      title: userProfile.title,
      min_price: userProfile.min_price,
      description: userProfile.description,
      service_type: userProfile.service_type,
      experience: userProfile.experience,
      shop_address: userProfile.shop_address,
      service: {
        id: userProfile.service_id,
        name: userProfile.service_name,
        svg: userProfile.service_svg,
      },
      service_areas: serviceAreas.map(sa => ({
        locationId: sa.locationId,
        locationName: sa.locationName,
      })),
    }

  } catch (error) {
    console.error('[PROFILE ME]', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch your profile',
    })
  }
})
