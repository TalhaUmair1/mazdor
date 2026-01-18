<template>
  <div>
    <!-- Test Color Theme (temporary) -->
    <HeroSection />
    <SearchBar />
    <ServiceCards :services="services?.data" />

    <ProfileCards :profiles="profileData?.profiles ?? []" />

    <!-- Pagination Controls -->
    <div v-if="(profileData?.total || 0) > limit" class="flex justify-center mt-4">
      <UPagination v-model:page="page" :total="profileData.total || 0" :items-per-page="limit" show-controls />
      
    </div>
    <div class="text-center my-6 mx-4">
      <h2 class="text-3xl font-semibold mt-8">Want to See More?</h2>
      <h4 class="text-gray-300 text-xl my-3 font-medium">
        To search & view all listings, create your free account.
      </h4>
      <div class="flex gap-4 justify-center">
        <UButton to="/allServices" class="rounded-sm py-2">Find More Workers</UButton>
        <UButton to="/profile" class="rounded-sm py-2">List Your Profile</UButton>
      </div>
    </div>

    <TopPlaces />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// State

const page = ref(1)
const limit = 6

const profileData = ref({
  profiles: [],
  total: 0,
  totalPages: 1,
})

const profileError = ref(null)
const servicesError = ref(null)

// Fetch profiles when page changes
async function fetchProfiles() {
  try {
    const { data, error } = await useFetch(`/api/profile?page=${page.value}&limit=${limit}`)
    if (error.value) {
      profileError.value = error.value
      console.error('Error fetching profiles:', error.value)
    } else if (data.value) {
      profileData.value = {
        profiles: data.value.profiles || [],
        total: data.value.total || 0,
        totalPages: data.value.totalPages || 1
      }
      profileError.value = null
    }
  } catch (err) {
    profileError.value = err
    console.error('Error fetching profiles:', err)
  }
}

// Watch page changes
watch(page, fetchProfiles, { immediate: true })

// Fetch services (static fetch)
const { data: services, error: servicesErrorRef } = await useFetch('/api/services')
if (servicesErrorRef.value) {
  servicesError.value = servicesErrorRef.value
  console.error('Error fetching services:', servicesErrorRef.value)
}
</script>
