import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm' // Replace 'some-library' with the actual library name

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
        })
        .returning()

      console.log('Inserted user:', simpleUser)
    }

    await setUserSession(event, {
      user: {
        id: simpleUser[0].id,
        email: user.email,
        name: user.name,
      },
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/')
  },
})
