import { ServerFile } from 'nuxt-file-storage'
import { useValidatedBody, z } from 'h3-zod'
import { users } from '~/server/database/schema'
import db from '~/server/utils/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { avatar } = await readBody<{ avatar: ServerFile }>(event)

  console.log('avatar', avatar)
  let avatarName = ''
  if (avatar) {
    avatarName = await storeFileLocally(
      avatar,
      `${Date.now().toString()}_user_avatar`,
      '/userFiles'
    )
  }
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
        avatar: avatarName,
      })
      .where(eq(users.email, email))

    return { message: 'User updated successfully and files saved' }
  } catch (error) {
    console.error('Update Error:', error)
    return { error: 'Failed to update user or save files' }
  }
})
