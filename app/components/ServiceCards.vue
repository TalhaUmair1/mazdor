<template>
    <div v-if="services && services.length > 0"
        class=" flex flex-wrap justify-center gap-4 mt-8 mb-12">
        <UCard :ui="{ body: { padding: 'px-0 py-0 sm:p-0' } }" class="bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-md rounded-md py-4 w-full max-w-72 h-auto flex flex-col items-center"
            v-for="service in services" :key="service.id">
            <div class="flex flex-col items-center text-neutral-700">
                <!-- Service icon - use v-html to render SVG -->
                <div class="w-8 h-8 mx-auto text-primary-500 " v-html="service.svg"></div>
                <NuxtLink class="text-lg cursor-pointer font-semibold mt-4 text-primary-600 hover:text-primary-800 hover:underline" 
                    @click.prevent="$emit('service-selected', service)"><span>{{ truncate(service.name, 15) }}</span></NuxtLink>
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
