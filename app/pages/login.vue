<template>
    <div class="flex items-center justify-center min-h-screen py-10 px-4">
        <div
            class="pt-3 pb-8 px-6 border dark:border-gray-800 border-gray-200 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full">
            <div class="text-center">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-300 mb-3"> Login with social accounts</h1>
                <h1
                    class="text-lg sm:text-2xl font-bold pb-4 sm:pb-6 border-b dark:border-gray-800 border-gray-300 mb-4 sm:mb-6">
                    It will take less than 2 minutes
                </h1>
            </div>
            <div class="space-y-3 sm:space-y-4 p-2 sm:p-4">
                <NuxtLink to="api/auth/google" external
                    class="w-full bg-red-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-red-700 flex items-center justify-center text-sm sm:text-base">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd"
                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                            clip-rule="evenodd" />
                    </svg>
                    Login with Google
                </NuxtLink>

                <NuxtLink to="api/auth/facebook" external
                    class="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 flex items-center justify-center text-sm sm:text-base">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563V10h2.773l-.443 2.89h-2.33v6.987C16.343 19.128 20 14.991 20 10c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Login with Facebook
                </NuxtLink>

                <NuxtLink to="api/auth/twitter" external
                    class="w-full bg-gray-800 text-white py-2 sm:py-3 px-4 rounded hover:bg-gray-900 flex items-center justify-center text-sm sm:text-base">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.95.563-2.005.974-3.127 1.195-.897-.957-2.173-1.554-3.591-1.554-2.717 0-4.92 2.202-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.72-2.162-10.148-5.144-.423.722-.666 1.56-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.828-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.085.627 1.956 2.444 3.379 4.6 3.421-1.68 1.319-3.809 2.107-6.114 2.107-.397 0-.79-.023-1.177-.067 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.01-7.5 14.01-14 0-.213-.005-.426-.014-.637.961-.695 1.797-1.56 2.457-2.548z" />
                    </svg>
                    Login with Twitter
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
