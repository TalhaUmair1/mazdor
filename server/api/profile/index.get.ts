import { defineEventHandler, getQuery } from 'h3'
import db from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 6
    const offset = (page - 1) * limit

    // Get profiles data
    const profilesQuery = db
      .select()
      .from('profiles')
    
    const profilesData = await profilesQuery.limit(limit)

    // Get users data to join
    const usersData = await db
      .select()
      .from('users')
      .limit(100) // Get all users

    // Get services data
    const servicesData = await db
      .select()
      .from('services')
      .limit(100) // Get all services

    // Join profiles with users and services
    const profiles = profilesData.map((profile: any) => {
      const user = (usersData as any[]).find((u: any) => u.id === profile.user_id)
      const service = (servicesData as any[]).find((s: any) => s.id === profile.service_id)
      
      return {
        id: profile.id,
        title: profile.title,
        min_price: profile.min_price,
        description: profile.description,
        service_type: profile.service_type,
        user: user ? {
          name: user.name,
          avatar: user.avatar,
        } : null,
        service: service ? {
          name: service.name,
          svg: service.svg,
        } : null,
      }
    })

    // Get total count
    const total = (profilesData as any[]).length

    return {
      profiles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Error fetching profiles:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch profiles',
    })
  }
})