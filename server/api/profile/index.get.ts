import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 6
  const offset = (page - 1) * limit

  const [profiles, total] = await Promise.all([
    db.query.profile.findMany({
      limit,
      offset,
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
    }),
    db.query.profile
      .findMany({
        columns: {
          id: true,
        },
      })
      .then((result) => result.length), // Total profiles for pagination info
  ])

  return {
    profiles,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
})
