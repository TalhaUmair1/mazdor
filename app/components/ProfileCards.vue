<template>
    <div v-if="profiles.length > 0"
        class="flex flex-col items-center gap-4 md:gap-0 md:flex-row md:justify-around md:flex-wrap my-6">
        <UCard class="max-w-sm w-full h-auto border border-neutral-200 hover:shadow-md rounded-xl py-2" v-for="profile in profiles"
            :key="profile.id">
            <div class="flex flex-col items-center">
<!-- User avatar image -->
                <img alt="User Image" class="w-36 h-36 mb-3 rounded-full object-cover"
                    :src="`/${profile.user.avatar}`" 
                    onerror="this.src='https://picsum.photos/100/100?random=default'" />
            </div>
            <div class="flex justify-between items-center my-2">
                <h2 class="text-neutral-900 font-semibold">{{ truncateWords(profile.title, 4) }}</h2>
                <h5 class="bg-neutral-100 text-neutral-800 px-4 rounded-sm">Rs:{{ profile.min_price }}</h5>
            </div>
            <!-- Truncate description -->
            <div class="h-24 overflow-hidden">
              <p class="text-neutral-700 mb-3">{{ truncateWords(profile.description, 15) }}</p>
            </div>
            <UButton :to="`/profile/${profile.id}`" variant="solid" color="primary" class="w-auto mt-2 rounded-sm">
                Learn more
            </UButton>
        </UCard>
    </div>

    <div v-else class="text-center text-secondary-500 my-8">
        <p class="text-secondary-500">No profiles found.</p>
    </div>
</template>

<script setup>
defineProps({
    profiles: Array
})

//

// Word-based truncation function
function truncateWords(text, maxWords) {
    if (!text) return ''
    const words = text.split(' ')
    return words.length > maxWords
        ? words.slice(0, maxWords).join(' ') + '......'
        : text
}
</script>
