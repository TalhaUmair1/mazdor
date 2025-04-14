import { useValidatedBody, z } from 'h3-zod'
import db from '~/server/utils/db'
import { profile, profileServiceAreas } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string().min(1),
    service_id: z.number().min(1),
    experience: z.number().min(1),
    min_price: z.number().min(1),
    service_type: z.string().min(1),
    shop_address: z.string().min(1),
    description: z.string().min(1),
    service_area: z.array(z.number()).min(1),
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

    const transactionResult = await db.transaction(async (tx) => {
      // First insert the profile within the transaction
      const newProfileResult = await tx
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
      let savedServiceAreas: { profileId: string; locationId: number }[] = []

      // Then insert service areas within the transaction
      if (newProfile?.id) {
        await tx.insert(profileServiceAreas).values(
          service_area.map((locationId) => ({
            profileId: newProfile.id,
            locationId: locationId,
          }))
        )

        // Query the saved service areas for verification within the transaction
        savedServiceAreas = await tx.query.profileServiceAreas.findMany({
          where: eq(profileServiceAreas.profileId, newProfile.id),
        })
      }

      return { profile: newProfile, serviceAreas: savedServiceAreas }
    })

    return transactionResult
  } catch (error) {
    console.error('Profile Creation Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create profile and service areas',
      data: error,
    })
  }
})
