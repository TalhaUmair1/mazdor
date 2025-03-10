import db from '~/server/utils/db'
import { services } from '~/server/db/schema'
import { useValidatedBody } from 'h3-zod'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(255, 'Name cannot exceed 255 characters'),

    svg: z
      .string()
      .min(10, 'SVG content must be at least 10 characters')
      .max(500, 'SVG content cannot exceed 500 characters'),

    view_box: z
      .string()
      .min(5, 'View Box must be at least 5 characters')
      .max(10, 'View Box cannot exceed 10 characters'),
  })

  const body = await useValidatedBody(event, schema)

  try {
    const newService = await db
      .insert(services)
      .values({
        name: body.name,
        svg: body.svg,
        view_box: body.view_box,
      })
      .returning()

    return { success: true, data: newService }
  } catch (error) {
    console.error('Error inserting service:', error)
    throw createError({ statusCode: 500, statusMessage: 'Database Error' })
  }
})
