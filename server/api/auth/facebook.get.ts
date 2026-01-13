import db from '~~/server/utils/db'

export default defineOAuthFacebookEventHandler({
  async onSuccess(event, { user }) {
    console.log('facebook user', user)

    try {
      // Check if user already exists by email
      let existingUsers = await db
        .select()
        .from('users')
        .where((u: any) => u.email === user.email)
        .limit(1)

      let newUser
      if (existingUsers.length === 0) {
        // Create new user
        const insertedUsers = await db
          .insert('users')
          .values({
            name: user.name,
            email: user.email,
            phone: null,
            whatsapp: null,
            avatar: user?.picture || `https://picsum.photos/100/100?random=${Date.now()}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .returning('*')
        
        newUser = insertedUsers[0]
        console.log('Inserted new Facebook user:', newUser)
      } else {
        newUser = existingUsers[0]
        console.log('Existing Facebook user found:', newUser)
      }

      await setUserSession(event, {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          avatar: newUser.avatar,
          phone: newUser.phone,
          whatsapp: newUser.whatsapp,
        },
        loggedInAt: Date.now(),
      })

      return sendRedirect(event, '/')
    } catch (error) {
      console.error('Facebook auth error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed'
      })
    }
  },

  onError(event, error) {
    console.error('Facebook auth error:', error)
    return sendRedirect(event, '/login?error=auth_failed')
  }
})