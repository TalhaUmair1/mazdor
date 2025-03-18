import { useValidatedBody, z } from 'h3-zod'
import { users } from '~/server/database/schema'
import db from '~/server/utils/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    name: z.string().min(1).optional(),
    email: z.string().email(),
    phone: z.string().min(11).max(11).optional(),
    whatsapp: z.string().min(11).max(11).optional(),
  })

  const { name, email, phone, whatsapp } = body

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    if (!existingUser.length) {
      return { error: 'User not found' }
    }

    await db
      .update(users)
      .set({
        name,
        email,
        phone,
        whatsapp,
      })
      .where(eq(users.email, email))

    return { message: 'User updated successfully' }
  } catch (error) {
    console.error('Update Error:', error)
    return { error: 'Failed to update user' }
  }
})
