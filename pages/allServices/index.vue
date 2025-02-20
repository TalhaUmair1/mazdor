<template>
    <div>
        <div class="text-center mt-20 mb-10">
            <h1 class="text-4xl font-bold my-2"> What Can Our Professionals Do For You?</h1>
            <h6 class="text-gray-300 mt-3 mb-6">These are all general categories of all services our professionals
                provide
            </h6>
        </div>
        <ServiceCards :services="services" />
    </div>
</template>

<script setup>
// import ServiceCards from '@/components/ServiceCards.vue';

const props = defineProps({
    services: Array
});

console.log("Services Data:", props.services);
</script>
