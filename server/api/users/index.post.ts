import { useValidatedBody, z } from 'h3-zod'
import { users } from '~/server/database/schema'
import db from '~/server/utils/db'
export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(11).max(11),
    whatsapp: z.string().min(11).max(11),
  })
  const { name, email, phone, whatsapp } = body
  console.log(name, email, phone, whatsapp)

  try {
    const simpleUser = await db
      .insert(users)
      .values({
        name,
        email,
        phone,
        whatsapp,
      })
      .returning()
    return simpleUser
  } catch (simpleError) {
    console.error('Simple Test Error:', simpleError)
  }
})
