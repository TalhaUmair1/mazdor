<template>
  <div>
    <div class="text-center mt-20">
      <h1 class="text-4xl font-bold my-2">What Can Our Professionals Do For You?</h1>
      <h6 class="text-gray-300 mt-5 mb-6">
        These are all general categories of all services our professionals provide
      </h6>
    </div>

    <!-- Show loading spinner -->
    <div v-if="pending" class="flex justify-center my-10">
      <span class="text-gray-400">Loading...</span>
    </div>

    <!-- Services Cards -->
    <ServiceCards v-if="services?.data" :services="services.data" />

    <!-- Pagination -->
    <div class="flex justify-center mt-8 mb-2">
      <UPagination v-model="page" :page-count="meta?.totalPages || 1" :total="meta?.total || 0" :per-page="limit" />
    </div>
  </div>
</template>



<script setup>
import { ref, watch } from 'vue'

const page = ref(1)
const limit = 8

const services = ref(null)
const pending = ref(false)
const meta = ref(null)

const fetchServices = async () => {
  pending.value = true

  const { data } = await useFetch('/api/services', {
    query: { page: page.value, limit },
    key: `services-page-${page.value}`,
  })

  services.value = data.value
  meta.value = data.value?.meta
  pending.value = false
}

// Fetch data when page changes, or on first load
watch(page, fetchServices, { immediate: true })
</script>
