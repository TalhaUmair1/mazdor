<template>
    <div class="mx-2 my-5">
        <h1 class="text-3xl font-bold text-start mb-6">Top Places</h1>
        <div>
            <div v-if="locations.data"
                class="text-center grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                <div v-for="(location, index) in locations.data" :key="index">
                    <a href="#" class="text-blue-600 hover:underline hover:text-blue-800">
                        {{ location.name }}
                    </a>
                </div>
            </div>
            <div v-else>
                <p class="text-gray-500">Loading locations...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: locations } = await useFetch('/api/locations');

</script>