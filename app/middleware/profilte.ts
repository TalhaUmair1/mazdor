export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn,  } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/auth/login')
  }

  const { data } = await useFetch('/api/profile', {
    query: { userId: loggedIn.value.id }
  })

  if (data.value?.profiles?.length >= 2) {
    return navigateTo('/profiles')
  }
})
