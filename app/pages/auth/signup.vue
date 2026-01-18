<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-primary-500">
      <template #header>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-center text-secondary-500">Create Account</h1>
          <p class="text-secondary-500 mt-2">Join our community today</p>
        </div>
      </template>
      
      <UForm class="space-y-6 mt-3" @submit="handleSubmit" :state="formState" :validate="validateForm" :validate-on="['blur', 'input']">
        <UFormField label="Full Name" name="name" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="formData.name" 
            type="text" 
            placeholder="Enter your full name" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>
        
        <UFormField label="Email Address" name="email" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="formData.email" 
            type="email" 
            placeholder="you@example.com" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>
        
        <UFormField label="Password" name="password" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="formData.password" 
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
            v-model="formData.confirmPassword" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Confirm your password" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>
        
        <UButton 
          type="submit" 
          class="w-full py-3 mt-4"
          :loading="loading"
          color="primary"
          size="lg"
        >
          <span v-if="loading">Creating Account...</span>
          <span v-else>Create Account</span>
        </UButton>
      </UForm>
      
      <div class="text-center mt-6">
        <p class="text-secondary-500">
          Already have an account? 
          <NuxtLink to="/auth/login" class="text-secondary-500 hover:text-secondary-700 font-medium">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserSession } from '#imports'
import { navigateTo } from '#app'

const router = useRouter()
const { fetch: fetchUser } = useUserSession()

// Form state
const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const formState = computed(() => {
  return {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  }
})

// Simple validation
const validateForm = (state) => {
  const errors = []
  
  if (!state.name) {
    errors.push({ path: 'name', message: 'Name is required' })
  }
  
  if (!state.email) {
    errors.push({ path: 'email', message: 'Email is required' })
  }
  
  if (state.email && !/\S+@\S+\.\S+/.test(state.email)) {
    errors.push({ path: 'email', message: 'Please enter a valid email' })
  }
  
  if (state.password && state.password.length < 6) {
    errors.push({ path: 'password', message: 'Password must be at least 6 characters' })
  }
  
  if (state.password && state.confirmPassword && state.password !== state.confirmPassword) {
    errors.push({ path: 'confirmPassword', message: 'Passwords do not match' })
  }
  
  return errors
}

// Form submission
const handleSubmit = async ({ event }) => {
  loading.value = true
  
  try {
    // Call actual API endpoint
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    })
    
    if (response.ok) {
      await fetchUser()
      // Refresh the page to ensure session is detected properly
      await navigateTo('/')
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