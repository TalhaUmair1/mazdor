import { useValidatedBody, z } from 'h3-zod'
import db from '~/server/utils/db'
import { profile } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string().min(1),
    service_id: z.string().min(1),
    user_id: z.string().min(1),
    min_price: z.string().regex(/^\d+(\.\d{1,2})?$/),
    service_type: z.string().min(1),
    shop_address: z.string().min(1),
    description: z.string().min(1),
  })

  const {
    title,
    service_id,
    user_id,
    min_price,
    service_type,
    shop_address,
    description,
  } = body

  try {
    const newProfile = await db
      .insert(profile)
      .values({
        title,
        service_id,
        user_id,
        min_price,
        service_type,
        shop_address,
        description,
      })
      .returning()

    return newProfile
  } catch (error) {
    console.error('Profile Creation Error:', error)
  }
})
