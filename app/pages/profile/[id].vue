<template>
    <div class="flex justify-center items-center min-h-screen my-12">
        <div v-if="pending" class="text-center">
            <p>Loading profile...</p>
        </div>
        <div v-else-if="showError || !profile" class="text-center">
            <p class="text-red-500">Error loading profile: {{ error?.data?.message || error?.message || 'Profile not found' }}</p>
            <NuxtLink to="/" class="text-blue-500 underline mt-4 inline-block">Go back to home</NuxtLink>
        </div>
        <UCard v-else class="w-full max-w-3xl border border-gray-200 shadow-md rounded-lg p-6">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <div>
                        <img class="w-24 h-24 rounded-full" :src="`/userfiles/${profile?.user?.avatar || 'default-avatar.png'}`" alt="Avatar" />
                    </div>
                    <h6 class="text-gray-400 font-semibold text-lg">
                        I have
                        {{ profile?.experience || 'No Experience provided' }} years of experience in this field
                    </h6>
                </div>
            </template>

            <div>
                <div class="grid grid-cols-1 gap-3">
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Full Name</p>
                        <p class="text-gray-400 text-base">{{ profile?.user?.name || 'No name provided' }}</p>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Skill</p>
                        <p class="text-gray-400 text-base">Rs. {{ profile?.title || 'No title provided' }}</p>
                    </div>


                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Start From</p>
                        <p class="text-gray-400 text-base">Rs. {{ profile?.min_price || 'No price provided' }}</p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Phone No</p>
                        <p class="text-base italic text-gray-600">
                            <span v-if="isLoggedIn">{{ profile?.user?.phone || 'No phone provided' }}</span>
                            <span v-else>Login to see phone number</span>
                        </p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Whatsapp No</p>
                        <p class="text-base italic text-gray-600">
                            <span v-if="isLoggedIn">{{ profile?.user?.whatsapp || 'No whatsapp provided' }}</span>
                            <span v-else>Login to see whatsapp number</span>
                        </p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Service Type</p>
                        <p class="text-gray-400 text-base">{{ profile?.service_type || 'No service type provided' }}</p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Service Areas</p>
                        <ul class="list-disc list-inside text-gray-400 text-base">
                            <li v-for="(area, index) in profile?.serviceAreas || []" :key="index">
                                {{ area?.location?.name || 'Location name not available' }}
                            </li>
                        </ul>

                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Description</p>
                        <p class="text-gray-400 text-base leading-relaxed italic">
                            {{ profile?.description || 'No description provided.' }}
                        </p>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { loggedIn } = useUserSession()
const isLoggedIn = computed(() => loggedIn.value)

const route = useRoute()
const { data: profile, error, pending } = await useAsyncData(`profile-${route.params.id}`, () =>
    $fetch(`/api/profile/${route.params.id}`)
)

if (error.value) {
    console.error('Error fetching profile:', error.value)
}

const showError = computed(() => {
    if (error.value) {
        console.error('Profile fetch error:', error.value)
        return true
    }
    return false
})
</script>