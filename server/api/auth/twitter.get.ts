export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        twitter: user.login,
      },
      loggedInAt: Date.now(),
    })
    console.log('github user', user)

    return sendRedirect(event, '/')
  },
})
