<template>
    <div>
        <div class="text-center my-6 mx-4">
            <h2 class="text-3xl font-semibold mt-8">Search Services of Your Liking</h2>
            <h4 class="text-gray-300 text-xl my-3 font-medium">WE Cover your Back</h4>
        </div>

        <SearchBar />

        <div v-if="profiles?.length">
            <ProfileCards :profiles="profiles ?? []" />
        </div>

        <div v-else>
            <div>
                <h1 class="text-center text-xl font-semibold mt-8">Nothing Found</h1>
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
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = route.path.split('/')

const service = ref(null)
const location = ref(null)
const page = ref(1)
const limit = ref(9)


// Extract service and location from URL
if (path.some(v => v.includes('service'))) {
    const servicePath = path.find(v => v.includes('service'))
    const serviceId = servicePath.split('-service-')[1]
    const serviceName = servicePath?.split('-service-')[0]?.replace(/-/g, ' ')?.replace(/\b\w/g, c => c.toUpperCase())
    service.value = {
        id: serviceId,
        name: serviceName
    }
}

if (path.some(v => v.includes('location'))) {
    const locationPath = path.find(v => v.includes('location'))
    const locationId = locationPath.split('-location-')[1]
    const locationName = locationPath?.split('-location-')[0]?.replace(/-/g, ' ')?.replace(/\b\w/g, c => c.toUpperCase())
    location.value = {
        id: locationId,
        name: locationName
    }
}

// const { data: profiles, refresh } = await useFetch('/api/search', () => ({
//     query: {
//         page: page.value,
//         limit: limit.value,
//         serviceId: service.value?.id,
//         locationId: location.value?.id
//     },
//     watch: [route, service, location, page],
//     immediate: true
// }))

const profiles = ref([])

const fetchProfiles = async () => {
    const response = await $fetch('/api/search', {
        params: {
            page: page.value,
            limit: limit.value,
            serviceId: service.value?.id,
            locationId: location.value?.id
        }
    })
    profiles.value = response?.data
}

watch([service, location, page], () => {
    if (service.value?.id && location.value?.id) {
        fetchProfiles()
    }
}, { immediate: true })
</script>