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
    <ServiceCards v-else :services="services?.data" />


    <div class="flex justify-center mt-8 mb-2">
      <UPagination v-model="page" :page-count="meta?.totalPages || 1" :total="meta?.total || 0" :per-page="limit" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const page = ref(1)
const limit = 8


const { data: services, pending, refresh } = useFetch('/api/services', () => ({
  query: { page: page.value, limit },
  key: `services-page-${page.value}`,
  watch: [page],
}))

const meta = computed(() => services.value?.meta)
</script>
