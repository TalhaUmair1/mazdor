<template>
    <div class="flex justify-center items-center min-h-screen my-10">
        <UCard class="w-full max-w-3xl border border-gray-200  shadow-lg rounded-lg p-6">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <img :src="`/userfiles/${user.avatar}`" alt="Profile"
                        class="w-32 h-32 rounded-full border-2 border-gray-300" />
                    <h6 class="text-gray-400 text-sm"></h6>
                </div>
            </template>

            <div class="">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b  pb-4">
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Full Name</p>
                        <p class="text-base ">Ali</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Start From</p>
                        <p class="text-base">Rs. 500</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Phone No</p>
                        <p class="text-base">03007654321</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Whatsapp No</p>
                        <p class="text-base">03007654321</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Service Type</p>
                        <p class="text-base">Home Only Services</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Service Areas</p>
                        <p class="text-base">Lahore, Ichhra, Qartaba Chowk, Kalma Chowk</p>
                    </div>
                </div>

                <div class="mt-4">
                    <p class="text-gray-500 text-sm font-semibold">Description</p>
                    <p class="text-base leading-relaxed ">
                        I am a plumber with 5 years of experience in plumbing and repair services. I repair and maintain
                        pipes, valves, fittings, drainage systems, and fixtures in commercial and residential
                        structures.
                        I am one of the best plumbers near Ichhra Bazaar, Qartaba Chowk, and Kalma Chowk.
                    </p>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
const { loggedIn, clear, user } = useUserSession()
const { data: profiles } = await useFetch('/api/profiles');
</script>

<style lang="scss" scoped></style>
