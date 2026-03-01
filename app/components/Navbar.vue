<template>
  <nav class="bg-bg-base border-border">
    <div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">

      <!-- Logo -->
      <div class="-mt-10 md:mt-0">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="/images.jpg" class="h-10 rounded-full" />
          <span class="text-2xl font-semibold text-default">Mazdoor</span>
        </NuxtLink>
      </div>

      <!-- Right Section -->
      <div class="flex md:order-2 items-center">

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center space-x-3">

          <UButton to="/profile/create" color="primary" class="py-2 px-4">
            Create Profile
          </UButton>

          <template v-if="!loggedIn">
            <UButton to="/auth/signup" variant="outline" color="secondary">
              Sign Up
            </UButton>
            <UButton to="/auth/login" color="primary">
              Login
            </UButton>
          </template>

          <template v-else>
            <div class="relative">
              <button @click="toggleDropdown">
                <img
                  :src="avatarUrl"
                  class="w-10 h-10 rounded-full border border-border"
                  @error="handleAvatarError"
                  @load="handleAvatarLoad"
                />
              </button>

              <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-40 bg-bg-base border border-border rounded-lg shadow-lg p-3"
              >
                <UButton to="/account" variant="outline" class="w-full my-2">
                  Account
                </UButton>
                <UButton
                  color="error"
                  variant="outline"
                  class="w-full"
                  @click="logout"
                >
                  Logout
                </UButton>
              </div>
            </div>
          </template>
        </div>

        <!-- Hamburger -->
        <button
          @click="toggleValue"
          class="md:hidden ml-2 p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-muted"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <!-- Mobile + Desktop Menu -->
      <div
        class="w-full md:flex md:w-auto md:order-1"
        :class="{ hidden: !showValue, block: showValue }"
      >
        <ul
          class="flex flex-col gap-3 p-4 mt-4 border border-border rounded-lg bg-bg-muted
                 md:flex-row md:gap-8 md:p-0 md:mt-0 md:border-0 md:bg-transparent"
        >

          <!-- Links -->
          <UButton variant="link" to="/" class="w-full md:w-auto">
            Home
          </UButton>
          <UButton variant="link" to="/allServices" class="w-full md:w-auto">
            All Services
          </UButton>
          <UButton variant="link" to="/myListing" class="w-full md:w-auto">
            My Listing
          </UButton>

          <!-- Mobile-only actions -->
          <div class="md:hidden border-t border-border pt-3 space-y-2">

            <UButton to="/profile/create" color="primary" class="w-full">
              Create Profile
            </UButton>

            <template v-if="!loggedIn">
              <UButton to="/auth/signup" variant="outline" class="w-full">
                Sign Up
              </UButton>
              <UButton to="/auth/login" color="primary" class="w-full">
                Login
              </UButton>
            </template>

            <template v-else>
              <UButton to="/account" variant="outline" class="w-full">
                Account
              </UButton>
              <UButton
                color="error"
                variant="outline"
                class="w-full"
                @click="logout"
              >
                Logout
              </UButton>
            </template>
          </div>
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

const avatarRefreshCounter = ref(0)

const debug = (msg, data = null) =>
  console.log(`[Navbar] ${msg}`, data || '')

const avatarUpdateCounter = watchAvatarUpdate()
watch(avatarUpdateCounter, async () => {
  avatarRefreshCounter.value++
  await refresh()
})

watch(() => useRoute().path, (path) => {
  if (loggedIn.value && (path.includes('/account') || path.includes('/profile'))) {
    refresh()
  }
})

watch(user, () => avatarRefreshCounter.value++, { deep: true })

const toggleValue = () => showValue.value = !showValue.value
const toggleDropdown = () => showDropdown.value = !showDropdown.value

const handleAvatarError = e => debug('Avatar error', e.target.src)
const handleAvatarLoad = e => debug('Avatar loaded', e.target.src)

const avatarUrl = computed(() => {
  if (user.value?.avatar) {
    return `/${user.value.avatar}?t=${Date.now()}_${avatarRefreshCounter.value}`
  }
  return '/default-avatar.svg'
})

const logout = async () => {
  avatarRefreshCounter.value = 0
  await clear()
  showDropdown.value = false
  navigateTo('/auth/login')
}
</script>
