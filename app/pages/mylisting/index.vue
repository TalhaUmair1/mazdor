<template>
    <div>
        <div class="text-center w-full max-w-[500px] mx-auto">
            <h1 class="text-4xl font-bold mt-14"> My Listings</h1>
            
            <div v-if="pending">
                <p>Loading your profile...</p>
            </div>
            
            <div v-else-if="error">
                <p v-if="error.statusCode === 404" class="text-red-500 mb-4">You haven't created a profile yet.</p>
                <p v-else class="text-red-500 mb-4">Error loading profile: {{ error.message }}</p>
                <NuxtLink class="py-3 px-6 bg-green-600 text-white rounded-sm inline-block" to="/profile/create">
                    Create Profile
                </NuxtLink>
            </div>
            
            <div v-else-if="data">
                <!-- Display user's profile if it exists -->
                <div class="my-8">
                    <UCard class="max-w-sm w-full h-auto border border-gray-50 bg-primary-500 py-2 mx-auto">
                        <div class="flex flex-col items-center">
                            <img alt="User Image" class="w-36 h-36 mb-3 rounded-full object-cover"
                                :src="`/userfiles/${data.user.avatar}`" 
                                onerror="this.src='https://picsum.photos/100/100?random=default'" />
                        </div>
                        <div class="flex justify-between my-2">
                            <h2 class="text-white font-semibold">{{ truncateWords(data.title, 4) }}</h2>
                            <h5 class="bg-neutral-600 text-white  px-4 rounded-sm">
                                {{ data.min_price }}
                            </h5>
                        </div>
                        <!-- Truncate description to 15 words -->
                        <p class="text-secondary-400 mb-3">
                            {{ truncateWords(data.description, 15) }}
                        </p>
                        <UButton :to="`/profile/${data.id}`" variant="outline" color="neutral" class="w-full">
                            View Profile
                        </UButton>
                        <UButton to="/profile/create" variant="outline" color="primary" class="w-full mt-2">
                            Edit Profile
                        </UButton>
                    </UCard>
                </div>
            </div>
            
            <div v-else>
                <h6 class="my-8">Start your easy earning journey with us and create a listings to earn more
                    You can create up to three profile for free</h6>
                <NuxtLink class="py-3 px-6 bg-green-600 text-white rounded-sm" to="/profile/create">
                    Create Profile
                </NuxtLink>
            </div>
            
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "custom",
    middleware: ['auth']
})

const { data, pending, error } = await useAsyncData('user-profile', () =>
    $fetch('/api/profile/me')
)

// Word-based truncation function
function truncateWords(text, maxWords) {
    if (!text) return ''
    const words = text.split(' ')
    return words.length > maxWords
        ? words.slice(0, maxWords).join(' ') + '......'
        : text
}
</script>
