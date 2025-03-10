<template>
    <div>
        <div class="text-center w-full max-w-[500px] mx-auto">
            <h1 class="text-4xl font-bold mt-14"> My Listings</h1>
            <h6 class="my-8">Start your easy earning journey with us and create a listings to earn more
                You can create up to three profile for free</h6>
            <NuxtLink class="py-3 px-6 bg-green-600 text-white rounded-sm" to="/profile">
                Create Profile
            </NuxtLink>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "custom",
    middleware: ['auth']
})
</script>
