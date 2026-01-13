<template>
  <div class="p-4 max-w-2xl mx-auto" v-if="user">
    <h1 class="text-2xl mb-4">Profile</h1>
    <div class="border p-4 rounded">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Name:</strong> {{ user.name ?? 'User' }}</p>
      <button class="btn mt-4" @click="clearSession">Logout</button>
    </div>
  </div>
  <div v-else class="p-4">Loading...</div>
</template>

<script setup>
const { user, loggedIn, clear } = useUserSession()
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
  if (!loggedIn.value) {
    router.push('/login')
  }
})

function clearSession() {
  clear()
  router.push('/login')
}
</script>
