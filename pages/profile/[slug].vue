<template>
    <div class="flex justify-center items-center min-h-screen my-10">
        <UCard class="w-full max-w-3xl border border-gray-200  shadow-lg rounded-lg p-6">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <img :src="`/userfiles/${user.avatar}`" alt="Profile"
                        class="w-32 h-32 rounded-full border-2 border-gray-300" />
                    <h6 class="text-gray-400 text-sm">{{ profiles.title }}</h6>

                </div>
            </template>

            <div class="">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b  pb-4">
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Full Name</p>
                        <p class="text-base ">{{ user.name }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Start From</p>
                        <p class="text-base">{{ profiles.min_price }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Phone No</p>
                        <p class="text-base">{{ user.phone }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Whatsapp No</p>
                        <p class="text-base">{{ user.whatsapp }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Service Type</p>
                        <p class="text-base">{{ profiles.service_type }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-semibold">Service Areas</p>
                        <p class="text-base">Lahore, Ichhra, Qartaba Chowk, Kalma Chowk</p>
                    </div>
                </div>

                <div class="mt-4">
                    <p class="text-gray-500 text-sm font-semibold">Description</p>
                    <p class="text-base leading-relaxed ">
                        {{ profiles.description }}
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

</script>

<style lang="scss" scoped></style>
