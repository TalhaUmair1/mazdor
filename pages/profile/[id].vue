<template>
    <div class="flex justify-center items-center min-h-screen my-12">
        <UCard class="w-full max-w-3xl border border-gray-200 shadow-md rounded-lg p-6">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <div>
                        <img class="w-24 h-24 rounded-full" :src="`/userfiles/${profile.user.avatar}`" alt="Avatar" />
                    </div>
                    <h6 class="text-gray-400 font-semibold text-lg">
                        I have
                        {{ profile?.experience || 'No Experience provided' }} years in this field
                    </h6>
                </div>
            </template>

            <div>
                <div class="grid grid-cols-1 gap-3">
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Full Name</p>
                        <p class="text-gray-400 text-base">{{ profile?.user?.name }}</p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Start From</p>
                        <p class="text-gray-400 text-base">Rs. {{ profile?.min_price }}</p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Phone No</p>
                        <p class="text-base italic text-gray-600">
                            <span v-if="isLoggedIn">{{ profile?.user?.phone }}</span>
                            <span v-else>Login to see phone number</span>
                        </p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Whatsapp No</p>
                        <p class="text-base italic text-gray-600">
                            <span v-if="isLoggedIn">{{ profile?.user?.whatsapp }}</span>
                            <span v-else>Login to see whatsapp number</span>
                        </p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Service Type</p>
                        <p class="text-gray-400 text-base">{{ profile?.service_type }}</p>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Service Areas</p>
                        <ul class="list-disc list-inside text-gray-400 text-base">
                            <li>Lahore</li>
                            <li>Ichhra</li>
                            <li>Qartaba Chowk</li>
                            <li>Kalma Chowk</li>
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

const isLoggedIn = true // Replace this with actual auth logic later
const route = useRoute()
const { data: profile, error } = await useAsyncData(`profile-${route.params.id}`, () =>
    $fetch(`/api/profile/${route.params.id}`)
)
</script>