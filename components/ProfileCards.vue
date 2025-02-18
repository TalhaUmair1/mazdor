<template>

    <div class="flex justify-around my-6">
        <UCard class="max-w-sm w-full border border-gray-50" v-for="profile in profiles" :key="profile.id">
            <div class="flex flex-col items-center">
                <img :src="profile.image" alt="" class="w-36 h-36 rounded-full" />
            </div>
            <div class="flex justify-between">
                <h6 class="text-gray-300">{{ profile.skill }}</h6>
                <h5 class="bg-gray-600 text-white py-1 px-6 rounded-sm">{{ profile.price }}</h5>
            </div>
            <h4 class="my-2 mx-2 font-semibold mb-4">{{ profile.experiance }}</h4>
            <p class="text-gray-300 mb-3">{{ profile.description }}</p>
            <UButton class="rounded-sm">learn more</UButton>
        </UCard>
    </div>

</template>

<script setup>
defineProps({
    profiles: Array
})
</script>
