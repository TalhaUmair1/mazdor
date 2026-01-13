import { useValidatedBody, z } from 'h3-zod'
import db from '~~/server/utils/db'
import { profile, profileServiceAreas } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string().min(1),
    service_id: z.number().min(1),
    experience: z.number().min(0),
    min_price: z.number().min(0),
    service_type: z.enum(['homeOnly', 'shopOnly', 'both']),
    shop_address: z.string().min(1),
    description: z.string().min(1),
    service_area: z.array(z.number()).min(0), // Allow empty array
  })

  const {
    title,
    service_id,
    min_price,
    service_type,
    shop_address,
    experience,
    service_area,
    description,
  } = body

  try {
    const { user } = await requireUserSession(event)

    // Insert the profile
    const newProfileResult = await db
      .insert(profile)
      .values({
        title,
        service_id,
        user_id: user.id,
        min_price,
        service_type,
        shop_address,
        experience,
        description,
      })
      .returning()

    const newProfile = newProfileResult[0]

    // Insert service areas if provided
    if (service_area && service_area.length > 0) {
      await db.insert(profileServiceAreas).values(
        service_area.map((locationId) => ({
          profileId: newProfile.id,
          locationId: locationId,
        }))
      ).run()
    }

    return newProfile
  } catch (error) {
    console.error('Profile Creation Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create profile and service areas',
      data: error,
    })
  }
}
