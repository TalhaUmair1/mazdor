<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-primary-400">
      <template #header>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-center text-secondary-800">Create Account</h1>
          <p class="text-secondary-500 mt-2">Join our community today</p>
        </div>
      </template>
      
      <UForm :schema="schema" :state="state" class="space-y-6 mt-3" @submit="handleSubmit">
        <UFormField label="Full Name" name="name" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="state.name" 
            type="text" 
            placeholder="Enter your full name" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>
        
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
            placeholder="Create a password" 
            size="lg"
            variant="outline"
            class="w-full"
            :trailing-icon="showPassword ? 'heroicons:eye-solid' : 'heroicons:eye-closed'"
            @trailing-click="showPassword = !showPassword"
          />
        </UFormField>
        
        <UFormField label="Confirm Password" name="confirmPassword" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="state.confirmPassword" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Confirm your password" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>
        
        <UButton 
          type="submit" 
          class="w-auto py-3 mt-4"
          :loading="loading"
          color="secondary"
          size="lg"
        >
          <span v-if="loading">Creating Account...</span>
          <span v-else>Create Account</span>
        </UButton>
      </UForm>
      
      <div class="text-center mt-6">
        <p class="text-secondary-600">
          Already have an account? 
          <NuxtLink to="/auth/login" class="text-neutral-700 hover:text-neutral-800 font-medium">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserSession } from '#imports'
import { navigateTo } from '#app'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const router = useRouter()
const { fetch: fetchUser } = useUserSession()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Confirm password is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type Schema = z.infer<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  
  try {
    // Call actual API endpoint
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: event.data.name,
        email: event.data.email,
        password: event.data.password
      })
    })
    
    if (response.ok) {
      // Clear form state after successful submission
      state.name = ''
      state.email = ''
      state.password = ''
      state.confirmPassword = ''
      
      await fetchUser()
      
      // Show success alert and redirect to services page
      alert('You\'ve signed up successfully')
      await navigateTo('/allServices')
    } else {
      const data = await response.json()
      error.value = data.message || 'Registration failed'
    }
  } catch (err) {
    error.value = 'Network error. Please try again.'
    console.error('Signup error:', err)
  } finally {
    loading.value = false
  }
}
</script>