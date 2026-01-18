<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-primary-500">
      <template #header>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-center text-secondary-500">Welcome Back</h1>
          <p class="text-secondary-500 mt-2">Sign in to your account</p>
        </div>
      </template>
      
      <UForm class="space-y-6 mt-3" @submit="handleSubmit" :state="formState" :validate="validateForm" :validate-on="['blur', 'input']">
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
            placeholder="Enter your password" 
            size="lg"
            variant="outline"
            class="w-full"
            :trailing-icon="showPassword ? 'heroicons:eye-solid' : 'heroicons:eye-closed'"
            @trailing-click="showPassword = !showPassword"
          />
        </UFormField>
        
        <div class="flex items-center justify-between">
          <UCheckbox 
            v-model="rememberMe" 
            label="Remember me" 
            size="sm"
          />
          
          <a href="#" class="text-sm text-secondary-500 hover:text-secondary-700">
            Forgot password?
          </a>
        </div>
        
        <UButton 
          type="submit" 
          class="w-full py-3 mt-4"
          :loading="loading"
          color="primary"
          size="lg"
        >
          <span v-if="loading">Signing In...</span>
          <span v-else>Sign In</span>
        </UButton>
      </UForm>
      
      <div class="text-center mt-6">
        <p class="text-secondary-500">
          Don't have an account? 
          <NuxtLink to="/auth/signup" class="text-secondary-500 hover:text-secondary-700 font-medium">
            Create one
          </NuxtLink>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { navigateTo } from '#app'

const { isLoggedIn, user, clear, fetch: fetchUser } = useUserSession()

const router = useRouter()

// Form state
const formData = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const formState = computed(() => {
  return {
    email: formData.email,
    password: formData.password
  }
})

// Simple validation
const validateForm = (state) => {
  const errors = []
  
  if (!state.email) {
    errors.push({ path: 'email', message: 'Email is required' })
  }
  
  if (state.email && !/\S+@\S+\.\S+/.test(state.email)) {
    errors.push({ path: 'email', message: 'Please enter a valid email' })
  }
  
  if (!state.password) {
    errors.push({ path: 'password', message: 'Password is required' })
  }
  
  return errors
}

// Form submission
const handleSubmit = async ({ event }) => {
  loading.value = true
  
  try {
    // Call actual API endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        rememberMe: rememberMe.value
      })
    })
    
    if (response.ok) {
      // Refresh the page to ensure session is detected properly
      await fetchUser()
      console.log(user.value, 'User logged in');
      
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