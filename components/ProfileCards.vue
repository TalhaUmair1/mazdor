<template>

    <div class="flex flex-col items-center gap-4 md:gap-0  md:flex-row md:justify-around my-6">
        <UCard class="max-w-sm w-full border border-gray-50 bg-gray-950" v-for="profile in profiles" :key="profile.id">
            <div class="flex flex-col items-center">
                <img :src="profile.image" alt="" class="w-36 h-36 rounded-full" />
            </div>
            <div class="flex justify-between">
                <h6 class="text-gray-300">{{ profile.title }}</h6>
                <h5 class="bg-gray-600 text-white py-1 px-6 rounded-sm">{{ profile.min_price }}</h5>
            </div>
            <h4 class="my-2 mx-2 font-semibold mb-4">{{ }}</h4>
            <p class="text-gray-300 mb-3">{{ profile.description }}</p>
            <NuxtLink :to="`/profile/${profile.id}`" class="rounded-sm">learn more</NuxtLink>
        </UCard>
    </div>

</template>

<script setup>

const { data: profiles } = await useFetch('/api/profiles');
</script>
