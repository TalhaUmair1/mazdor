import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineOAuthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: 'offline',
    },
  },

  async onSuccess(event, { user }) {
    console.log('google user', user)

    let simpleUser = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email))
      .limit(1)

    console.log('simpleUser', simpleUser)

    if (simpleUser.length === 0) {
      console.log('new user')

      simpleUser = await db
        .insert(users)
        .values({
          name: user.name,
          email: user.email,
          phone: user?.phone || null, // Ensure null if undefined
          whatsapp: user?.whatsapp || null,
          avatar: user?.picture || null, // Set initial avatar from Google
        })
        .returning()

      console.log('Inserted user:', simpleUser)
    } else {
      // Always use the latest avatar from the database
      console.log('Existing user, using stored avatar')
    }

    await setUserSession(event, {
      user: {
        id: simpleUser[0].id,
        email: user.email,
        name: user.name,
        avatar: simpleUser[0].avatar, // Use stored avatar, not Google’s picture
      },
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/')
  },
})
