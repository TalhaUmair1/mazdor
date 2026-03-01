import { useValidatedBody, z } from 'h3-zod'
import { defineEventHandler, createError } from 'h3'
import { db } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(11).max(11),
    whatsapp: z.string().min(11).max(11),
  })
  const { name, email, phone, whatsapp } = body

  try {
    // Check if user already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    let user
    if (existingUsers.length > 0) {
      user = existingUsers[0]
    } else {
      // Create new user
      const newUsers = await db
        .insert(users)
        .values({
          name,
          email,
          phone,
          whatsapp,
          avatar: `https://picsum.photos/100/100?random=${Date.now()}`,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning()
      
      user = newUsers[0]
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        whatsapp: user.whatsapp,
        avatar: user.avatar,
      },
      loggedInAt: Date.now(),
    })

    return user
  } catch (error) {
    console.error('User creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create or update user'
    })
  }
})