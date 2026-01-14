<template>
  <div class="auth-container" style="min-height: 60vh; display:flex; align-items:center; justify-content:center;">
    <NCard class="p-6 w-full max-w-md" elevation="low">
      <h2 class="text-xl font-semibold mb-4">Sign In</h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <NInput v-model="form.email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <NInput v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Password" />
            <button type="button" @click="togglePassword" class="text-sm text-blue-600">{{ showPassword ? 'Hide' : 'Show' }}</button>
          </div>
        </div>
        <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
        <div>
          <NButton type="submit" class="w-full" :loading="loading">Login</NButton>
        </div>
      </form>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NInput, NButton } from '#nuxt/ui'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ middleware: ['auth-redirect'] })

const router = useRouter()
const { login } = useAuth()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const onSubmit = async () => {
  error.value = null
  if (!form.email || !form.password) {
    error.value = 'Please enter email and password'
    return
  }
  loading.value = true
  try {
    await login(form.email, form.password)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e?.message ?? 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container { /* styling left minimal; rely on Nuxt UI */ }
</style>
