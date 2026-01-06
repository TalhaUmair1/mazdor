<template>
    <div
        class="grid grid-cols-2 gap-2 m-2 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-8 md:mx-24 mt-8 mb-12">
        <UCard :ui="{ body: { padding: 'px-4 py-2 sm:p-4' } }" class="w-full max-w-60 p-0 rounded-sm bg-gray-950"
            v-for="service in services" :key="service.id">
            <div class="flex flex-col items-center text-primary">
                <svg class="w-8 h-8 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    :viewBox="service.view_box" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="0.5">
                    <path :d="service.svg"></path>
                </svg>
                <NuxtLink class="text-lg cursor-pointer font-semibold mt-4 hover:text-primary hover:underline ">{{
                    service.name }}
                </NuxtLink>
            </div>
        </UCard>
    </div>

</template>

<script setup>
defineProps({
    services: Array
})

</script>
