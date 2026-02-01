<template>
    <div>
        <div class="flex flex-col md:flex-row max-w-xl items-center my-3 justify-center mx-auto p-6">
            <form @submit.prevent="search1"
                class="flex flex-col md:flex-row items-center bg-bg-elevated space-y-4 md:space-y-0 md:space-x-4 border border-border rounded-md p-2 shadow-md w-full md:w-[800px]">

                <div class="w-full md:w-80">
                    <UInputMenu v-model="selectedService" :items="serviceItems" :search="services" :loading="loadingService"
                        trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                        placeholder="What service are you looking for?" label-key="name" size="xl" required />
                </div>

                <div class="w-full md:w-80">
                    <UInputMenu v-model="selectedLocations" :items="locationItems" :search="search" :loading="loadingLocations"
                        placeholder="Search for a location..." label-key="name" value-attribute="id" size="xl" class="w-full text-lg shadow-none" />
                </div>

                <div>
                    <UButton size="xl" type="submit">Search</UButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const props = defineProps({
    service: {
        type: Object,
        default: () => ({}),
    },
    location: {
        type: Object,
        default: () => ({}),
    },
})

const loadingService = ref(false)
const selectedService = ref(null)
const serviceItems = ref([])

async function services(q) {
    loadingService.value = true
    const params = q ? { search: q } : {};
    const response = await $fetch('/api/services', { params })
    serviceItems.value = response?.data || []
    loadingService.value = false
    return response?.data
}

const loadingLocations = ref(false)
const selectedLocations = ref(null)
const locationItems = ref([])

async function search(q) {
    loadingLocations.value = true
    const params = q ? { search: q } : {};
    const response = await $fetch('/api/locations', { params })
    
    locationItems.value = response?.data || []
    
    loadingLocations.value = false
    return response?.data
}

// Load initial data and prefill selected service and location from props
onMounted(async () => {
    // Load initial services
    try {
        const servicesResponse = await $fetch('/api/services');
        serviceItems.value = servicesResponse?.data || [];
    } catch (error) {
        console.error('Error loading services:', error);
        serviceItems.value = [];
    }
    
    // Load initial locations
    try {
        const locationsResponse = await $fetch('/api/locations');
        locationItems.value = locationsResponse?.data || [];
    } catch (error) {
        console.error('Error loading locations:', error);
        locationItems.value = [];
    }
    
    // Prefill selected service and location from props
    if (props.service && Object.keys(props.service).length > 0) {
        selectedService.value = props.service
    }
    if (props.location && Object.keys(props.location).length > 0) {
        selectedLocations.value = props.location
    }
})

// // Optionally use watchEffect if props may change after initial load
// watchEffect(() => {
//     if (props.service && Object.keys(props.service).length > 0) {
//         selectedService.value = props.service
//     }
//     if (props.location && Object.keys(props.location).length > 0) {
//         selectedLocations.value = props.location
//     }
// })

const search1 = async () => {
    if (!selectedService.value) {
        alert('Please select a service')
        return
    }
    
    let searchUrl = ''
    
    if (selectedService.value) {
        const serviceUrl = `/${selectedService.value.name.toLowerCase().replaceAll(' ', '-')}-service-${selectedService.value.id}`
        searchUrl += serviceUrl
    }
    
    if (selectedLocations.value) {
        const locationUrl = `/${selectedLocations.value.name.toLowerCase().replaceAll(' ', '-')}-location-${selectedLocations.value.id}`
        searchUrl += locationUrl
    }
    
    if (searchUrl) {
        navigateTo(`/search${searchUrl}`)
    }
}

// Method to set the selected service from parent component
const setSelectedService = (service) => {
  selectedService.value = service;
};

// Method to set the selected location from parent component
const setSelectedLocation = (location) => {
  selectedLocations.value = location;
};

// Expose the methods to parent components
defineExpose({
  setSelectedService,
  setSelectedLocation
});
</script>

<style lang="scss" scoped></style>
