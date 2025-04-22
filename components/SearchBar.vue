<template>
    <div>
        <div class="flex flex-col md:flex-row max-w-xl items-center my-3 justify-center mx-auto p-6">
            <form @submit.prevent="search1"
                class="flex flex-col md:flex-row items-center bg-gray-900 space-y-4 md:space-y-0 md:space-x-4 border border-gray-600 rounded-md p-2 shadow-md w-full md:w-[800px]">

                <div class="w-full md:w-80">
                    <UInputMenu v-model="selectedService" :search="services" :loading="loadingService"
                        trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                        placeholder="What service are you looking for?" option-attribute="name" size="xl" required />
                </div>

                <div class="w-full md:w-80">
                    <UInputMenu v-model="selectedLocations" :search="search" :loading="loadingLocations"
                        placeholder="Search for a location..." option-attribute="name" trailing by="id" size="xl" />
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

async function services(q) {
    loadingService.value = true
    const response = await $fetch('/api/services', { params: { search: q } })
    loadingService.value = false
    return response?.data
}

const loadingLocations = ref(false)
const selectedLocations = ref(null)

async function search(q) {
    loadingLocations.value = true
    const response = await $fetch('/api/locations', { params: { search: q } })
    loadingLocations.value = false
    return response?.data
}

// Prefill selected service and location from props
onMounted(() => {
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
    const serviceUrl = `/${selectedService.value.name.toLowerCase().replaceAll(' ', '-')}-service-${selectedService.value.id}`
    const locationUrl = `/${selectedLocations.value.name.toLowerCase().replaceAll(' ', '-')}-location-${selectedLocations.value.id}`

    navigateTo(`/search${serviceUrl}${locationUrl}`)
}
</script>

<style lang="scss" scoped></style>
