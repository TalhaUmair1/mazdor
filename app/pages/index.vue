<template>
  <div>
    <!-- Test Color Theme (temporary) -->
    <HeroSection />
    <SearchBar />
    <!-- Services Section -->
    <ServiceCards :services="serviceData?.services ?? []" />
    
    <!-- Service Pagination -->
    <div v-if="(serviceData?.total || 0) > serviceLimit" class="flex justify-center mt-4">
      <UPagination v-model:page="servicePage" :total="serviceData.total || 0" :items-per-page="serviceLimit" show-controls />
    </div>

    <!-- Profiles Section -->
    <ProfileCards :profiles="profileData?.profiles ?? []" />

    <!-- Profile Pagination -->
    <div v-if="(profileData?.total || 0) > profileLimit" class="flex justify-center mt-4">
      <UPagination v-model:page="profilePage" :total="profileData.total || 0" :items-per-page="profileLimit" show-controls />
    </div>
    <div class="text-center my-6 mx-4">
      <h2 class="text-3xl font-semibold mt-8">Want to See More?</h2>
      <h4 class="text-gray-300 text-xl my-3 font-medium">
        To search & view all listings, create your free account.
      </h4>
      <div class="flex gap-4 justify-center">
        <UButton to="/allServices" class="rounded-sm py-2">Find More Workers</UButton>
        <UButton to="/profile/create" class="rounded-sm py-2">List Your Profile</UButton>
      </div>
    </div>

    <TopPlaces />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// State
const profilePage = ref(1)
const profileLimit = 3
const servicePage = ref(1)
const serviceLimit = 8

const profileData = ref({
  profiles: [],
  total: 0,
  totalPages: 1,
})

const serviceData = ref({
  services: [],
  total: 0,
  totalPages: 1,
})

const profileError = ref(null)
const servicesError = ref(null)

// Fetch profiles when page changes
async function fetchProfiles() {
  try {
    const { data, error } = await useFetch(`/api/profile?page=${profilePage.value}&limit=${profileLimit}`)
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

// Fetch services when page changes
async function fetchServices() {
  try {
    const { data, error } = await useFetch(`/api/services?page=${servicePage.value}&limit=${serviceLimit}`)
    if (error.value) {
      servicesError.value = error.value
      console.error('Error fetching services:', error.value)
    } else if (data.value) {
      serviceData.value = {
        services: data.value.data || [],
        total: data.value.total || 0,
        totalPages: data.value.totalPages || 1
      }
      servicesError.value = null
    }
  } catch (err) {
    servicesError.value = err
    console.error('Error fetching services:', err)
  }
}

// Watch page changes
watch(profilePage, fetchProfiles, { immediate: true })
watch(servicePage, fetchServices, { immediate: true })
</script>
