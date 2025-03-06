<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div class="-mt-10 md:-mt-0">

                <NuxtLink href="/" class="flex items-center  space-x-3 rtl:space-x-reverse">
                    <img src="/images.jpg" class="h-10 rounded-full" alt="" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mazdoor</span>
                </NuxtLink>
            </div>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div class="flex flex-col md:flex-row items-center  space-x-3">
                    <NuxtLink class="py-3 px-4 bg-green-600 text-white rounded-sm" to="/profile">
                        Create Profile
                    </NuxtLink>

                    <div class="relative mt-4 md:mt-0">

                        <NuxtLink to="/login" v-if="!isLoggedIn" @click="isLoggedIn = true"
                            class="text-gray-900 bg-white border border-gray-300 mt-2 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Login
                        </NuxtLink>


                        <div v-else class="relative ">
                            <button @click="toggleDropdown" class="flex items-center ">
                                <img src="/images.jpg" alt="Profile" class="w-10 h-10 rounded-full border">
                            </button>

                            <!-- Dropdown Menu -->
                            <div v-if="showDropdown"
                                class="absolute text-center p-3  right-0 mt-2 w-40 bg-gray-400 border rounded-lg shadow-lg dark:bg-gray-800">
                                <NuxtLink to="/account"
                                    class="block rounded-md w-full px-3 py-2 my-2 text-center border border-green-700 text-white dark:text-white hover:bg-green-100 dark:hover:bg-green-700">
                                    Account
                                </NuxtLink>
                                <button @click="logout"
                                    class="block rounded-md w-full px-3 py-2 text-center border border-red-600 text-red-600 dark:text-white hover:bg-red-100 dark:hover:bg-red-700">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <button @click="toggleValue" data-collapse-toggle="navbar-cta" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-cta" :aria-expanded="showValue">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
            <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-cta"
                :class="{ 'hidden': !showValue, 'block': showValue }">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <NuxtLink to="/"
                            class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                            aria-current="page">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/allServices"
                            class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            All
                            Services</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/myListing"
                            class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            My
                            Listing</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
const login = ref(false);

const showValue = ref(false);
const toggleValue = () => {
    showValue.value = !showValue.value;
};
const isLoggedIn = ref(false);
const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const logout = () => {
    isLoggedIn.value = false;
    showDropdown.value = false;
};
</script>
