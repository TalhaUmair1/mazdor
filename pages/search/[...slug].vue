<template>
    <div>
        <div class="text-center my-6 mx-4">
            <h2 class="text-3xl font-semibold mt-8">Search Services of Your Liking</h2>
            <h4 class="text-gray-300 text-xl my-3 font-medium">WE Cover your Back</h4>
        </div>

        <SearchBar />

        <div v-if="profiles?.length">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div v-for="profile in profiles" :key="profile.id" class="border p-4 rounded">
                    <h3 class="text-xl font-semibold">{{ profile.name }}</h3>
                    <!-- Add other profile details here -->
                </div>
            </div>
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

const getId = (str, type) => str.replace(type, '')
const toTitleCase = str =>
    str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

// Extract service and location from URL
if (path.some(v => v.includes('service'))) {
    const servicePath = path.find(v => v.includes('service'))
    service.value = {
        id: getId(servicePath, 'service'),
        name: toTitleCase(getId(servicePath, 'service'))
    }
}

if (path.some(v => v.includes('place'))) {
    const locationPath = path.find(v => v.includes('place'))
    location.value = {
        id: getId(locationPath, 'place'),
        name: toTitleCase(getId(locationPath, 'place'))
    }
}

const { data: profiles, refresh } = await useFetch('/api/search', () => ({
    query: {
        page: page.value,
        limit: limit.value,
        serviceId: service.value?.id,
        locationId: location.value?.id
    },
    watch: [service, location, page],
    immediate: true
}))

watch(page, () => {
    refresh()
})
</script>