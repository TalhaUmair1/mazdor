<template>
    <div class="flex justify-center items-center min-h-screen my-12">
        <UCard class="w-full max-w-3xl border border-gray-200 shadow-md rounded-lg p-6">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <div>
                        <img class="w-24 h-24 rounded-full " src="/images.jpg" alt="">
                    </div>
                    <h6 class="text-gray-700 font-semibold text-lg">Plumber with 5 years of experience</h6>
                </div>
            </template>

            <div>
                <div class="grid grid-cols-1 gap-3">
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Full Name</p>
                        <p class="text-gray-400 text-base">Ali</p>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Start From</p>
                        <p class="text-gray-400 text-base">Rs. 500</p>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Phone No</p>
                        <p class="text-gray-400 text-base italic text-gray-600">Login to see phone number</p>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Whatsapp No</p>
                        <p class="text-gray-400 text-base italic text-gray-600">Login to see whatsapp number</p>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-200 text-sm font-semibold">Service Type</p>
                        <p class="text-gray-400 text-base">Home Only Services</p>
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
                        <p class="text-gray-400 text-base leading-relaxed italic text-gray-700">
                            No description provided.
                        </p>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup>

</script>