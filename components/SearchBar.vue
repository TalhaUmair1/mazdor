<template>
    <div class="flex flex-col md:flex-row my-2 max-w-xl items-center justify-center mx-auto p-6">
        <div
            class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 dark:bg-gray-900 border border-gray-600 rounded-md p-2 shadow-md ">
            <div class="w-full  md:w-80">
                <UInputMenu trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                    placeholder="What service are looking for.." :options="[
                        'Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook',
                        'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz',
                        'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'
                    ]" size="xl" :ui="{ base: 'ring-0 dark:ring-0' }" />
            </div>
            <div class="w-full md:w-80">
                <UInputMenu trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                    placeholder="What are you looking for.." :options="[
                        'Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook',
                        'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz',
                        'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'
                    ]" size="xl" :ui="{ base: 'ring-0 dark:ring-0' }" />
            </div>
            <div>
                <UButton size="xl">Search</UButton>
            </div>
        </div>
    </div>

</template>

<script setup>

</script>

<style lang="scss" scoped></style>