// @ts-nocheck
import { defineEventHandler, readBody, createError } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { db } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = body

  try {
    // Check if user already exists
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existingUsers.length > 0) {
      throw createError({ statusCode: 409, statusMessage: 'User already exists' })
    }

    const hashedPassword = await hashPassword(password)
    const now = new Date().toISOString()

    // Create new user
        const user = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      avatar: `https://picsum.photos/100/100?random=${Date.now()}`,
    }).returning().get()


    // Create user session
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      loggedInAt: Date.now(),
    })

    return user
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
})
