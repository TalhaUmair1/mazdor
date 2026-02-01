<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-primary-500">
      <template #header>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-center text-secondary-500">Welcome Back</h1>
          <p class="text-secondary-500 mt-2">Sign in to your account</p>
        </div>
      </template>
      
      <UForm :schema="schema" :state="state" class="space-y-6 mt-3" @submit="handleSubmit">
        <UFormField label="Email Address" name="email" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="state.email" 
            type="email" 
            placeholder="you@example.com" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>
        
        <UFormField label="Password" name="password" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="state.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Enter your password" 
            size="lg"
            variant="outline"
            class="w-full"
            :trailing-icon="showPassword ? 'heroicons:eye-solid' : 'heroicons:eye-closed'"
            @trailing-click="showPassword = !showPassword"
          />
        </UFormField>
        
        <!-- <div class="flex items-center justify-between">
          <UCheckbox 
            v-model="rememberMe" 
            label="Remember me" 
            size="sm"
          />
          
          <a href="#" class="text-sm text-secondary-500 hover:text-secondary-800">
            Forgot password?
          </a>
        </div> -->
        
        <UButton 
          type="submit" 
          class="w-auto py-3 px-6 mt-4"
          :loading="loading"
          color="secondary"
          size="lg"
        >
          <span v-if="loading">Signing In...</span>
          <span v-else>Sign In</span>
        </UButton>
      </UForm>
      
      <div class="text-center mt-6">
        <p class="text-secondary-500">
          Don't have an account? 
          <NuxtLink to="/auth/signup" class="text-neutral-600 hover:text-neutral-700 font-medium">
            Create one
          </NuxtLink>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { navigateTo } from '#app'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { user, clear, fetch: fetchUser } = useUserSession()

const router = useRouter()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type Schema = z.infer<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  
  try {
    // Call actual API endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: event.data.email,
        password: event.data.password,
        rememberMe: rememberMe.value
      })
    })
    
    if (response.ok) {
      // Clear form state after successful login
      state.email = ''
      state.password = ''
      
      // Refresh the page to ensure session is detected properly
      await fetchUser()
      console.log(user.value, 'User logged in');
      
      // Show success alert and redirect
      alert('You\'ve logged in successfully')
      await navigateTo('/')
    } else {
      const data = await response.json()
      error.value = data.message || 'Login failed'
    }
  } catch (err) {
    error.value = 'Network error. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>