<template>
    <div>
        <div class="text-center w-full max-w-[500px] mx-auto">
            <h1 class="text-3xl text-secondary-700 font-bold mt-14"> My Listings</h1>
            
            <div v-if="pending">
                <p>Loading your profile...</p>
            </div>
            
            <div v-else-if="error">
                <div v-if="error.statusCode === 404 || error.message.includes('Profile not found') || (data.value && data.value.profiles && data.value.profiles.length === 0)" class="mb-4">
                    <p class="text-red-500">You haven't created a profile yet.</p>
                    <NuxtLink class="py-3 px-6 bg-green-600 text-white rounded-sm inline-block mt-2" to="/profile/create">
                        Create Profile
                    </NuxtLink>
                </div>
                <p v-else class="text-red-500 mb-4">Error loading profile: {{ error.message }}</p>
            </div>
            
            <div v-else-if="userProfile">
                <!-- Display user's profile if it exists -->
                <div class="my-8">
                    <UCard class="max-w-sm w-full h-auto border  py-2 mx-auto">
                        <div class="flex flex-col items-center">
                            <img alt="User Image" class="w-36 h-36 mb-3 rounded-full object-cover"
                                :src="`/${user.avatar}`" 
                                onerror="this.src='https://picsum.photos/100/100?random=default'" />
                        </div>
                        <div class="flex justify-between my-2">
                            <h2 class="text-black font-semibold">{{ truncateWords(userProfile.title, 4) }}</h2>
                            <h5 class="bg-neutral-600 text-white  px-4 rounded-sm">
                                {{ userProfile.min_price }}
                            </h5>
                        </div>
                        <!-- Truncate description to 15 words -->
                        <p class="text-black text-start mb-3">
                            {{ truncateWords(userProfile.description, 15) }}
                        </p>
                        <UButton :to="`/profile/${userProfile.id}`" variant="outline" color="neutral" class="text-start">
                            View Profile
                        </UButton>
                       
                    </UCard>
                </div>
            </div>
            
            <div v-else-if="!userProfile">
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

const { user } = useUserSession()
console.log(user, 'this is me user')

// useFetch automatically forwards cookies during SSR
const { data, pending, error } = await useFetch('/api/profile/me', {
    key: 'user-profile',
})
console.log(data.value, 'this is me data');

// Extract the first profile from the profiles array
const userProfile = computed(() => {
    if (data.value && data.value.profiles && data.value.profiles.length > 0) {
        return data.value.profiles[0]; // Get the first profile
    }
    return null;
});

// Word-based truncation function
function truncateWords(text, maxWords) {
    if (!text) return ''
    const words = text.split(' ')
    return words.length > maxWords
        ? words.slice(0, maxWords).join(' ') + '......'
        : text
}
</script>
