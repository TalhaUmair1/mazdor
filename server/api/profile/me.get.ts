import db from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  // Get the current user session
  const session: any = await getUserSession(event)
  const userId = session?.user?.id

  if (!userId) {
    throw createError({ 
      statusCode: 401, 
      message: 'Unauthorized: User must be logged in to access their profile' 
    })
  }

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
    throw createError({ 
      statusCode: 404, 
      message: 'Profile not found for the current user' 
    })
  }

  return userProfile
})