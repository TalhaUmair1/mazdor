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
import { ref } from 'vue'

const selectedService = ref([])
const loadingService = ref(false)

async function services(q) {
    loadingService.value = true
    const response = await $fetch('/api/services', { params: { search: q } })
    loadingService.value = false
    return response?.data
}

const loadingLocations = ref(false)
const selectedLocations = ref([])

async function search(q) {
    loadingLocations.value = true
    const response = await $fetch('/api/locations', { params: { search: q } })
    loadingLocations.value = false
    return response?.data
}

// NEW: Results handling
const searchResults = ref([])
const searchDone = ref(false)

const search1 = async () => {
    const serviceUrl = `/${selectedService.value.name.toLowerCase().replaceAll(' ', '-')}-service-${selectedService.value.id}`
    const locationUrl = `/${selectedLocations.value.name.toLowerCase().replaceAll(' ', '-')}-location-${selectedLocations.value.id}`

    navigateTo(`/search${serviceUrl}${locationUrl}`)




    // try {
    //     const searchApi = await $fetch('/api/search', {
    //         params: {
    //             serviceId: selectedService.value,
    //             locationId: selectedLocations.value,
    //         },
    //     })

    //     searchResults.value = searchApi?.data || []
    //     searchDone.value = true
    // } catch (error) {
    //     console.error('Error during search:', error)
    //     searchResults.value = []
    //     searchDone.value = true
    // }
}
</script>

<style lang="scss" scoped></style>