import { useValidatedBody, z } from 'h3-zod'
import db from '~/server/utils/db'
import { profile } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string().min(1),
    service_id: z.number().min(1),

    min_price: z.number().min(1),
    service_type: z.string().min(1),
    shop_address: z.string().min(1),
    description: z.string().min(1),
    service_area: z.array(z.number()).min(1),
  })
  console.log(body)

  const {
    title,
    service_id,
    min_price,
    service_type,
    shop_address,
    service_area,
    description,
  } = body

  try {
    const { user } = await requireUserSession(event)
    console.log('user', user)

    const newProfile = await db
      .insert(profile)
      .values({
        title,
        service_id,
        user_id: user.id, // assuming 'id' is the correct property
        min_price,
        service_type,
        shop_address,
        service_area,
        description,
      })
      .returning()

    return newProfile
  } catch (error) {
    console.error('Profile Creation Error:', error)
  }
})
