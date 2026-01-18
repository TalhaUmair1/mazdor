<template>
  <div class="flex items-center justify-center mt-5">
    <UCard class="w-full max-w-xl p-8 space-y-3 rounded-xl shadow bg-primary-500">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-center text-secondary-500 lg:text-3xl">Create New Profile</h2>
          <p class="max-w-screen-md mx-auto text-center text-secondary-500 md:text-lg">
            Please fill in the details below clearly so that you can reach more people.
          </p>
        </div>
      </template>
      
      <UForm class="space-y-6 mt-3" @submit="createProfile" :state="formState" :validate="validateForm" :validate-on="['blur', 'input']">
        <UFormField label="Title of profile" name="title" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="form.title" 
            type="text" 
            placeholder="Title of profile" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField label="What kind of service you want to offer" name="serviceId" required :ui="{ label: 'text-neutral-500' }">
          <USelectMenu 
            v-model="form.serviceId" 
            :items="services.data" 
            value-key="id" 
            label-key="name"
            placeholder="Select a service"
            size="lg"
            class="w-full"
          >
            <template #label>
              {{ form.serviceId ? services.find(s => s.id === form.serviceId)?.name : 'What kind of service you want to offer' }}
            </template>
          </USelectMenu>
        </UFormField>

        <UFormField label="Years of experience" name="experience" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model.number="form.experience" 
            type="number" 
            :min="0" 
            :max="50" 
            placeholder="Years of experience" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Start from (minimum service price)" name="minPrice" required :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model.number="form.minPrice" 
            type="number" 
            :min="0" 
            :max="50000" 
            placeholder="Start from (minimum service price)" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField label="What type of service you offer" name="serviceType" required :ui="{ label: 'text-neutral-500' }">
          <USelect 
            v-model="form.serviceType" 
            :items="[
              { label: 'Home Only Services', value: 'homeOnly' },
              { label: 'Shop Only Services', value: 'shopOnly' },
              { label: 'Both Home and at Shop Services', value: 'both' }
            ]"
            placeholder="What type of service you offer"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField label="What areas you operate (must add city first)" name="service_area" required :ui="{ label: 'text-neutral-500' }">
          <USelectMenu
            v-model="form.service_area"
            :items="locations.data"
            value-key="id"
            label-key="name"
            placeholder="What areas you operate (must add city first)"
            multiple
            searchable
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Share your shop address" name="shopAddress" :ui="{ label: 'text-neutral-500' }">
          <UInput 
            v-model="form.shop_address" 
            type="text" 
            placeholder="Share your shop address" 
            size="lg"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Describe your skills and services you offer in details" name="description" required :ui="{ label: 'text-neutral-500' }">
          <UTextarea 
            v-model="form.description" 
            rows="5"
            placeholder="Describe your skills and services you offer in details"
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
          Create Profile
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'restrict']
})

const { user } = useUserSession()
const loading = ref(false)

// Form state
const form = reactive({
  title: '',
  service_id: null,
  minPrice: 0,
  serviceType: 'homeOnly',
  shop_address: '',
  description: '',
  experience: 0,
  service_area: []
})

const formState = computed(() => {
  return {
    title: form.title,
    service_id: form.service_id,
    minPrice: form.minPrice,
    serviceType: form.serviceType,
    description: form.description,
    service_area: form.service_area || [],
    shop_address: form.shop_address || '',
    experience: form.experience
  }
})

const validateForm = (state) => {
  const errors = []
  
  if (!state.title) {
    errors.push({ path: 'title', message: 'Title is required' })
  }
  
  if (!state.service_id) {
    errors.push({ path: 'service_id', message: 'Service is required' })
  }
  
  if (!state.minPrice || state.minPrice < 0) {
    errors.push({ path: 'minPrice', message: 'Minimum price must be a positive number' })
  }
  
  if (!state.serviceType) {
    errors.push({ path: 'serviceType', message: 'Service type is required' })
  }
  
  if (!state.experience && state.experience !== 0) {
    errors.push({ path: 'experience', message: 'Experience is required' })
  }
  
  if (!state.description) {
    errors.push({ path: 'description', message: 'Description is required' })
  }
  if (!state.service_area) {
    errors.push({ path: 'service_area', message: 'Service area is required' })
  }
  if (!state.shop_address) {
    errors.push({ path: 'shop_address', message: 'Shop address is required' })
  }
  return errors
}

// Selected locations
const selectedLocations = ref([])

// Fetch services and locations
const { data: servicesData } = await useFetch('/api/services')
const { data: locationsData } = await useFetch('/api/locations')
console.log(servicesData.value,'services dats', locationsData,'location data');

const services = computed(() => servicesData.value || [])
const locations = computed(() => locationsData.value || [])

// Create profile function
const createProfile = async () => {
  if (!user.value?.id) {
    console.error('User not authenticated')
    return
  }

  loading.value = true
  
  try {
    const profileData = {
      title: form.title,
      service_id: form.service_id,
      experience: form.experience,
      min_price: form.minPrice,
      service_type: form.serviceType,
      shop_address: form.shop_address,
      description: form.description,
      service_area: form.service_area
    }

    const response = await $fetch('/api/profile', {
      method: 'POST',
      body: profileData
    })

    console.log('Profile created successfully!', response)
    await navigateTo('/profile')
  } catch (error) {
    console.error('Error creating profile:', error)
    // Handle error appropriately
  } finally {
    loading.value = false
  }
}
</script>