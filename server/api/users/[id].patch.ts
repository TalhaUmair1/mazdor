import { eq } from 'drizzle-orm'
import { useValidatedBody, z } from 'h3-zod'
import { ServerFile } from 'nuxt-file-storage'
import { users } from '~/server/database/schema'
import db from '~/server/utils/db' // Ensure correct import

export default defineEventHandler(async (event) => {
  try {
    const { avatar } = await readBody<{ avatar: ServerFile }>(event)

    console.log('avatar', avatar)
    let avatarName = ''

    // Ensure file storage does not fail silently
    if (avatar) {
      try {
        avatarName = await storeFileLocally(
          avatar,
          `${Date.now().toString()}_user_avatar`,
          '/userFiles'
        )
      } catch (fileError) {
        console.error('File upload error:', fileError)
        return { error: 'Failed to upload avatar' }
      }
    }

    const body = await useValidatedBody(event, {
      name: z.string().min(1).optional(),
      email: z.string().email(),
      phone: z.string().min(11).max(11).optional(),
      whatsapp: z.string().min(11).max(11).optional(),
    })

    const { name, email, phone, whatsapp } = body

    // Check if the user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (existingUser.length === 0) {
      return { error: 'User not found' }
    }

    // Update user in the database
    const updateResult = await db
      .update(users)
      .set({
        name,
        email,
        phone,
        whatsapp,
        avatar: avatarName || existingUser[0].avatar, // Keep old avatar if none uploaded
      })
      .where(eq(users.email, email))
      .returning()

    if (!updateResult.length) {
      return { error: 'Failed to update user' }
    }

    const updatedUser = updateResult[0]

    // Update user session so changes reflect everywhere
    await setUserSession(event, {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatar: updatedUser.avatar, // Use stored avatar
      },
      loggedInAt: Date.now(),
    })

    return { message: 'User updated successfully and session updated' }
  } catch (error: any) {
    console.error('Update Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    })
  }
})
