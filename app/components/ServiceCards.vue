<template>
    <div v-if="services && services.length > 0"
        class="grid grid-cols-2 gap-2 m-2 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-8 md:mx-24 mt-8 mb-12">
        <UCard :ui="{ body: { padding: 'px-4 py-2 sm:p-4' } }" class="w-full max-w-60 p-0 rounded-sm bg-primary-500"
            v-for="service in services" :key="service.id">
            <div class="flex flex-col items-center text-secondary-500">
<!-- Service icon - use v-html to render SVG -->
                <div class="w-8 h-8 mx-auto" v-html="service.svg"></div>
                <NuxtLink class="text-lg cursor-pointer font-semibold mt-4 text-secondary-500 hover:text-secondary-700 hover:underline "
                    @click.prevent="$emit('service-selected', service)">{{
                    truncate(service.name, 15) }}
                </NuxtLink>
            </div>
        </UCard>
    </div>
    <div v-else class="text-center text-gray-500 my-8">
        <p class="text-secondary-500">No services available.</p>
    </div>
</template>

<script setup>
const props = defineProps({
    services: {
        type: Array,
        default: () => []
    }
})

defineEmits(['service-selected'])

const truncate = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text
}
</script>
