export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('token')
    const publicPages = ['/auth/login', '/auth/signup']
    if (publicPages.includes(to.path) && token) {
      return navigateTo('/dashboard')
    }
  }
})
