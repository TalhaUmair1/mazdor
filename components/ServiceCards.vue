<template>
    <div class="grid grid-cols-2 gap-2 m-2 md:flex md:flex-row md:gap-8 md:mx-24 mt-8 mb-12">
        <UCard :ui="{ body: { padding: 'px-4 py-2 sm:p-4' } }" class="w-full p-0" v-for="service in services"
            :key="service.id">
            <div class="flex flex-col items-center">
                <img :src="service.image" alt="service" class="w-16 h-16" />
                <NuxtLink class="text-lg font-semibold mt-4">{{ service.title }}</NuxtLink>
            </div>
        </UCard>
    </div>

</template>

<script setup>
defineProps({
    services: Array
})
</script>
