<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl mb-4">Sign Up</h1>
    <form @submit.prevent="handleSignup" class="space-y-2">
      <input v-model="name" placeholder="Name" class="input w-full" />
      <input v-model="email" placeholder="Email" class="input w-full" />
      <input v-model="password" type="password" placeholder="Password" class="input w-full" />
      <button class="btn btn-primary w-full" type="submit" :disabled="loading">Sign Up</button>
    </form>
    <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function handleSignup() {
  loading.value = true
  error.value = null
  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value }
    })
    router.push('/login')
  } catch (e) {
    error.value = e?.message ?? 'Signup failed'
  } finally {
    loading.value = false
  }
}
</script>
