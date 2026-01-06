<template>
    <div>
        <footer class="bg-gray-900 text-white p-4">
            <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="text-teal-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-8 10a6 6 0 0112 0M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
                        </svg>
                    </span>
                    <NuxtLink to="/terms" class="text-gray-300 hover:text-white">Terms of Use</NuxtLink>
                    <span class="text-gray-500">|</span>
                    <NuxtLink to="/privacy" class="text-gray-300 hover:text-white">Privacy</NuxtLink>
                </div>

                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://www.facebook.com" target="_blank"
                        class="text-gray-300 hover:text-white">Facebook</a>
                    <a href="https://www.instagram.com" target="_blank"
                        class="text-gray-300 hover:text-white">Instagram</a>
                    <a href="https://www.youtube.com" target="_blank" class="text-gray-300 hover:text-white">YouTube</a>
                </div>


                <div class="flex space-x-2 mt-4 md:mt-0 relative">
                    <ColorMode />
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>


</script>