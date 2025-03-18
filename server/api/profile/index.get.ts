import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const profiles = await db.query.profile.findMany({
      with: {
        user: true,
      },
    })
    return profiles
  } catch (error) {
    console.error('Profile Fetch Error:', error)
    return { error: 'Failed to fetch profiles' }
  }
})
