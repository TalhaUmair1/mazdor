// client-side auth guard for frontend-only mode
export default defineNuxtRouteMiddleware((to) => {
  // Protect /profile routes
  if (to.path.startsWith('/profile')) {
    const sess = localStorage.getItem('mazdor_session')
    if (!sess) {
      return navigateTo('/auth/login')
    }
  }
})
