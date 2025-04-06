<template>
    <div class="flex flex-col md:flex-row max-w-xl items-center my-3 justify-center mx-auto p-6">
        <div
            class="flex flex-col md:flex-row items-center bg-gray-900 space-y-4 md:space-y-0 md:space-x-4 border border-gray-600 rounded-md p-2 shadow-md w-full md:w-[800px]">
            <div class="w-full md:w-80">
                <UInputMenu v-model="selectedService" :options="services" option-attribute="name"
                    trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                    placeholder="What service are you looking for.." size="xl" :ui="uiConfig" />
            </div>
            <div class="w-full md:w-80">
                <UInputMenu v-model="selectedOption" :options="locations.data" option-attribute="name"
                    value-attribute="id" trailing-icon="i-heroicons-chevron-up-down-20-solid"
                    class="w-full text-lg shadow-none" placeholder="Where are you looking for.." size="xl"
                    :ui="uiConfig" />
            </div>
            <div>
                <UButton size="xl" @click="search">Search</UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';



const selectedService = ref(null);
const selectedOption = ref(null);

const { data: services } = await useFetch('/api/services');
const { data: locations } = await useFetch('/api/locations');

const search = () => {
    console.log('Selected Service:', selectedService.value);
    console.log('Selected Option:', selectedOption.value);

};
</script>

<style lang="scss" scoped></style>
