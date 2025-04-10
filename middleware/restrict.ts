export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession()

  const { phone, whatsapp } =
    (user.value as { phone?: string; whatsapp?: string }) || {}
  console.log('user', user.value)
  console.log('phone', phone)
  if (!phone || !whatsapp) {
    return navigateTo('/account')
  }
})
