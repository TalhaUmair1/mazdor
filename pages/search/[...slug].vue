<template>
    <div class="">
        <div class="text-center my-6 mx-4">
            <h2 class="text-3xl font-semibold mt-8">Search Services of Your Liking</h2>
            <h4 class="text-gray-300 text-xl my-3 font-medium">WE Cover your Back</h4>
        </div>

        <div>
            <SearchBar />
        </div>

        <div>
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
const route = useRoute();
const location = ref();
const service = ref();
const queryParams = route.params;

console.log('Query Params:', queryParams);

const getName = (x) => x.split('-')[1].replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const getId = (x) => x.split('-')[2];

location.value = {
    id: getId(queryParams[1]),
    name: getName(queryParams[1])
};

service.value = {
    id: getId(queryParams[0]),
    name: getName(queryParams[0])
};

const { data: profiles } = await useFetch('/api/search', () => ({
    query: {
        page: 1,
        limit: 9,
        serviceId: service.value.id,
        locationId: location.value.id
    },
    key: `profiles-${service.value.id}-${location.value.id}`,
    watch: [service, location],
    immediate: true
}));

console.log('Profiles:', profiles.value);
</script>