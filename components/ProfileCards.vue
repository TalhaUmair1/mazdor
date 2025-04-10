<template>
    <div v-if="profiles.length > 0"
        class="flex flex-col items-center gap-4 md:gap-0 md:flex-row md:justify-around my-6">
        <UCard class="max-w-sm w-full h-96 border border-gray-50 bg-gray-950 py-4" v-for="profile in profiles"
            :key="profile.id">
            <div class="flex flex-col items-center">
                <!-- ✅ Placeholder image or use profile.image if available -->
                <img alt="User Image" class="w-36 h-36 rounded-full object-cover"
                    :src="`/userfiles/${profile.user.avatar}`" />
            </div>
            <div class="flex justify-between my-2">
                <h6 class="text-gray-300">{{ profile.title }}</h6>
                <h5 class="bg-gray-600 text-white py-1 px-6 rounded-sm">
                    {{ profile.min_price }}
                </h5>
            </div>
            <!-- ✅ Truncate description to 70 words -->
            <p class="text-gray-300 mb-3">
                {{ truncateWords(profile.description, 20) }}
            </p>
            <NuxtLink to="profile/detail" class="rounded-sm text-blue-500 hover:underline">
                Learn more
            </NuxtLink>
        </UCard>
    </div>

    <div v-else class="text-center text-gray-500 my-8">
        No profiles found.
    </div>
</template>

<script setup>
defineProps({
    profiles: Array
})

// ✅ Word-based truncation
function truncateWords(text, maxWords) {
    if (!text) return ''
    const words = text.split(' ')
    return words.length > maxWords
        ? words.slice(0, maxWords).join(' ') + '......'
        : text
}
</script>