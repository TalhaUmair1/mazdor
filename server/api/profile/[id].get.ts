import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Profile ID is required' })
  }

  const profile = await db.query.profile.findFirst({
    where: (fields, { eq }) => eq(fields.id, String(id)),
    columns: {
      id: true,
      title: true,
      min_price: true,
      description: true,
      experience: true,
      service_type: true,
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
    },
  })

  if (!profile) {
    throw createError({ statusCode: 404, message: 'Profile not found' })
  }

  return profile
})
