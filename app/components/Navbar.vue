<template>
  <nav class="bg-bg-base border-border">
    <div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="-mt-10 md:mt-0">
        <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src='/images.jpg' class="h-10  rounded-full" alt="" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-default">Mazdoor</span>
        </NuxtLink>
      </div>
      
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div class="flex flex-col md:flex-row items-center space-x-3">
          <UButton 
          class="py-2 px-4"
            color="primary"
            variant="solid"
            to="/profile/create">
            Create Profile
          </UButton>

          <!-- Auth buttons for logged out users -->
          <div v-if="!loggedIn" class="flex space-x-2">
            <UButton 
             class="py-2 px-4"
              color="secondary"
              variant="outline"
              to="/auth/signup">
              Sign Up
            </UButton>
            <UButton 
             class="py-2 px-4"
              color="primary"
              variant="solid"
              to="/auth/login">
              Login
            </UButton>
          </div>

<!-- User dropdown for logged in users -->
          <div v-else class="relative mt-4 md:mt-0">
            <button @click="toggleDropdown" class="flex items-center">
              <img :src="avatarUrl" 
                   alt="Profile" 
                   class="w-10 h-10 rounded-full border border-border"
                   @error="handleAvatarError"
                   @load="handleAvatarLoad">
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showDropdown"
              class="absolute text-center p-3 right-0 mt-2 w-40 bg-bg-base border border-border rounded-lg shadow-lg">
              <UButton 
                color="secondary"
                variant="outline"
                to="/account"
                class="w-full my-2">
                Account
              </UButton>
              <UButton 
                color="error"
                variant="outline"
                @click="logout"
                class="w-full mt-2 py-2">
                Logout
              </UButton>
            </div>
          </div>
        </div>
        
        <button @click="toggleValue" data-collapse-toggle="navbar-cta" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-muted rounded-lg md:hidden hover:bg-bg-muted focus:outline-none focus:ring-2 focus:ring-border"
          aria-controls="navbar-cta" :aria-expanded="showValue">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-cta"
        :class="{ 'hidden': !showValue, 'block': showValue }">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-border rounded-lg bg-bg-muted md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
          <li>
            <UButton 
              :active="$route.path === '/'"
              variant="link"
              to="/"
              class="w-full md:w-auto md:p-0 text-default rounded-sm">
              Home
            </UButton>
          </li>
          <li>
            <UButton 
              :active="$route.path === '/allServices'"
              variant="link"
              to="/allServices"
              class="w-full md:w-auto md:p-0 text-default rounded-sm">
              All Services
            </UButton>
          </li>
          <li>
            <UButton 
              :active="$route.path === '/myListing'"
              variant="link"
              to="/myListing"
              class="w-full md:w-auto md:p-0 text-default rounded-sm">
              My Listing
            </UButton>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const showValue = ref(false)
const showDropdown = ref(false)
const { loggedIn, user, clear, refresh } = useUserSession()
const { watchAvatarUpdate } = useAvatarUpdate()

// Debug helper
const debug = (message, data = null) => {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`[${timestamp}] Navbar: ${message}`, data || '')
}

// Watch for avatar update events
const avatarUpdateCounter = watchAvatarUpdate()
watch(avatarUpdateCounter, () => {
  debug('Avatar update event received', { counter: avatarUpdateCounter.value })
  refresh()
})

debug('Component mounted', { loggedIn: loggedIn.value, hasUser: !!user.value })

// Refresh session when route changes to account or profile pages
watch(() => useRoute().path, (newPath) => {
  if (loggedIn.value && (newPath.includes('/account') || newPath.includes('/profile'))) {
    debug('Route changed to account/profile, refreshing session', { path: newPath })
    refresh()
  }
})

// Watch auth state changes
watch(loggedIn, (newVal) => {
  debug('Auth state changed', { loggedIn: newVal })
})

// Watch user data changes
watch(user, (newUser) => {
  debug('User data updated', { 
    id: newUser?.id, 
    email: newUser?.email, 
    hasAvatar: !!newUser?.avatar 
  })
}, { deep: true })

const toggleValue = () => {
  showValue.value = !showValue.value
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Image error handler with debugging
const handleAvatarError = (event) => {
  debug('Avatar image failed to load', { 
    src: event.target.src,
    userAvatar: user.value?.avatar 
  })
}

// Image load handler with debugging
const handleAvatarLoad = (event) => {
  debug('Avatar image loaded successfully', { src: event.target.src })
}

// Computed property for avatar URL with cache busting
const avatarUrl = computed(() => {
  if (user.value?.avatar) {
    // Construct the full path - avatar field already contains 'userFiles/filename'
    const url = `/${user.value.avatar}?t=${Date.now()}`
    debug('Avatar URL computed', { avatar: user.value.avatar, url })
    return url
  }
  debug('Using default avatar - no user avatar found')
  return '/default-avatar.svg'
})

// Watch avatar URL changes for debugging
watch(avatarUrl, (newUrl) => {
  debug('Avatar URL changed', { url: newUrl })
})

const logout = async () => {
  debug('Logout initiated')
  await clear()
  showDropdown.value = false
  navigateTo('/auth/login')
}
</script>