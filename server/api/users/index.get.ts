import { db } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = session.user?.id
  if (!userId) {
    throw new Error('User is not authenticated')
  }

  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).get()
    return user
  } catch (error) {
    console.error('User Fetch Error:', error)
    return { error: 'Failed to fetch user' }
  }
})
