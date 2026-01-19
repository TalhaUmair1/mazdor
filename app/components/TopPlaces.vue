<template>
    <div class="mx-2 my-5">
        <h1 class="text-3xl font-bold text-start mb-6">Top Places</h1>
        <div>
            <div v-if="error" class="text-red-500">
                <p>Failed to load locations. Please check your database connection.</p>
            </div>
            <div v-else-if="locationData.data && locationData.data.length > 0"
                class="text-center grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                <div v-for="(location, index) in paginatedLocations" :key="index">
                    <NuxtLink
                        :to="`/search/${location.name.toLowerCase().replaceAll(' ', '-')}-location-${location.id}`"
                        class="text-blue-600 hover:underline hover:text-blue-800">
                        {{ truncate(location.name, 15) }}
                    </NuxtLink>
                </div>
            </div>
            <div v-else-if="pending">
                <p class="text-gray-500">Loading locations...</p>
            </div>
            <div v-else>
                <p class="text-gray-500">No locations available.</p>
            </div>
            
            <!-- Pagination -->
            <div v-if="(locationData.totalPages || 0) > 1" class="flex justify-center mt-8 mb-2">
                <UPagination v-model:page="currentPage" :total="locationData.total || 0" :items-per-page="itemsPerPage" show-controls />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentPage = ref(1);
const itemsPerPage = 20;

// State for location data
const locationData = ref({
  data: [],
  total: 0,
  totalPages: 1,
});

const error = ref(null);
const pending = ref(false);

// Fetch locations function
async function fetchLocations() {
  try {
    pending.value = true;
    const { data, error: fetchError } = await useFetch('/api/locations', {
      query: {
        page: currentPage.value,
        limit: itemsPerPage
      }
    });
    
    if (fetchError.value) {
      error.value = fetchError.value;
      console.error('Error fetching locations:', fetchError.value);
    } else if (data.value) {
      locationData.value = {
        data: data.value.data || [],
        total: data.value.total || 0,
        totalPages: data.value.totalPages || 1
      };
      error.value = null;
    }
  } catch (err) {
    error.value = err;
    console.error('Error fetching locations:', err);
  } finally {
    pending.value = false;
  }
}

// Watch page changes and fetch data
watch(currentPage, fetchLocations, { immediate: true });

// Initial fetch
fetchLocations();

const totalPages = computed(() => {
  return locationData.value.totalPages || 0;
});

const paginatedLocations = computed(() => {
  return locationData.value.data || [];
});

const truncate = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};
</script>