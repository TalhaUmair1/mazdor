import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const profiles = await db.query.profile.findMany({
    columns: {
      id: true,
      title: true,
      min_price: true,
      description: true,
      service_type: true,
    },
    with: {
      user: {
        columns: {
          name: true,
          avatar: true,
        },
      },
    },
  })
  return profiles
})
