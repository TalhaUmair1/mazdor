<template>
  <div>
    <HeroSection />
    <SearchBar />
    <ServiceCards :services="services?.data" />

    <ProfileCards :profiles="profileData?.profiles ?? []" />

    <!-- Pagination Controls -->
    <div v-if="profileData?.totalPages > 1" class="flex justify-center mt-4">
      <UPagination v-model="page" :total="profileData.totalPages" :page-count="1" />
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
import { ref, watchEffect } from 'vue'

// State
const page = ref(1)
const limit = 6

const profileData = ref({
  profiles: [],
  totalPages: 1,
})

// Automatically fetch new data when `page` changes
watchEffect(async () => {
  const { data } = await useFetch(`/api/profile?page=${page.value}&limit=${limit}`)
  if (data.value) {
    profileData.value = data.value
  }
})
// Fetch services (static fetch)
const { data: services } = await useFetch('/api/services')
</script>
