export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = session.user?.id
  if (!userId) {
    throw new Error('User is not authenticated')
  }

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    })
    return user
  } catch (error) {
    console.error('User Fetch Error:', error)
    return { error: 'Failed to fetch user' }
  }
})
