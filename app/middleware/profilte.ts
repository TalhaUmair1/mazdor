export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/auth/login')
  }

  const { data } = await useFetch('/api/profile/me')

  if (data.value?.profiles && data.value.profiles.length >= 3) {
    return navigateTo('/mylisting')
  }
})
