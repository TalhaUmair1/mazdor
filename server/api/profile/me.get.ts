import db from '~~/server/utils/db'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Get the current user session
    const session: any = await getUserSession(event)
    console.log('[Profile/ME] Session retrieved:', { hasSession: !!session, hasUserId: !!session?.user?.id })
    
    const userId = session?.user?.id

    if (!userId) {
      console.error('[Profile/ME] Unauthorized: No user ID in session', { session })
      throw createError({ 
        statusCode: 401, 
        message: 'Unauthorized: User must be logged in to access their profile' 
      })
    }

    console.log('[Profile/ME] Fetching profile for user:', userId)

    // Query the profile associated with the current user
    const userProfile = await db.query.profile.findFirst({
      where: (fields, { eq }) => eq(fields.user_id, userId),
      columns: {
        id: true,
        title: true,
        min_price: true,
        description: true,
        experience: true,
        service_type: true,
        shop_address: true,
      },
      with: {
        user: {
          columns: {
            name: true,
            avatar: true,
            whatsapp: true,
            phone: true,
          },
        },
        serviceAreas: {
          columns: {},
          with: {
            location: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!userProfile) {
      console.log('[Profile/ME] No profile found for user:', userId)
      throw createError({
        statusCode: 404,
        message: 'Profile not found',
      })
    }

    console.log('[Profile/ME] Profile fetched successfully:', { id: userProfile.id, title: userProfile.title })
    return userProfile
  } catch (error: any) {
    console.error('[Profile/ME] Error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch profile',
    })
  }
})