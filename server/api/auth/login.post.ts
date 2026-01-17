import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '../../utils/db'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'



export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)
    
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }
    
    // Find user by email
    const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1)
    const user = userResult[0]

    
    if (!user || !user.password) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(user.password, password)
    console.log('Password verification:', isValidPassword);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }
    
    // Create user session
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    })
    
    return {
      status: 'success',
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
})
