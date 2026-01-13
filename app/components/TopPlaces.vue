<template>
    <div class="mx-2 my-5">
        <h1 class="text-3xl font-bold text-start mb-6">Top Places</h1>
        <div>
            <div v-if="error" class="text-red-500">
                <p>Failed to load locations. Please check your database connection.</p>
            </div>
            <div v-else-if="locations?.data && locations.data.length > 0"
                class="text-center grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                <div v-for="(location, index) in locations.data" :key="index">
                    <NuxtLink
                        :to="`/search/${location.name.toLowerCase().replaceAll(' ', '-')}-location-${location.id}`"
                        class="text-blue-600 hover:underline hover:text-blue-800">
                        {{ location.name }}
                    </NuxtLink>
                </div>
            </div>
            <div v-else-if="pending">
                <p class="text-gray-500">Loading locations...</p>
            </div>
            <div v-else>
                <p class="text-gray-500">No locations available.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: locations, error, pending } = await useFetch('/api/locations');
</script>