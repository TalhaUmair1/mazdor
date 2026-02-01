<template>
  <div>
    <div class="text-center mt-20">
      <h1 class="text-4xl text-secondary-700 font-bold my-2">What Can Our Professionals Do For You?</h1>
      <h6 class="text-primary-700 mt-5 mb-6">
        These are all general categories of all services our professionals provide
      </h6>
    </div>

    <!-- Show loading spinner -->
    <div v-if="pending" class="flex justify-center my-10">
      <span class="text-gray-400">Loading...</span>
    </div>

    <!-- Services Cards -->
    <ServiceCards v-if="services?.data" :services="services.data" @service-selected="handleServiceSelected" />

    <!-- Pagination -->
    <div v-if="(services?.total || 0) > limit" class="flex justify-center mt-8 mb-2">
      <UPagination v-model:page="page" :total="services?.total || 0" :items-per-page="limit" show-controls />
    </div>
  </div>
</template>



<script setup>
import { ref, watch } from 'vue'

definePageMeta({
  middleware: ['auth']
})

const page = ref(1)
const limit = 12

const services = ref(null)
const pending = ref(false)

const fetchServices = async () => {
  pending.value = true

  const response = await $fetch('/api/services', {
    params: { page: page.value, limit },
  })

  services.value = response
  pending.value = false
}

// Fetch data when page changes, or on first load
watch(page, fetchServices, { immediate: true })

// Handle service selection from ServiceCards
const handleServiceSelected = (service) => {
  // Navigate to the search page with the selected service
  navigateTo(`/search/${service.name.toLowerCase().replaceAll(' ', '-')}-service-${service.id}`);
}
</script>