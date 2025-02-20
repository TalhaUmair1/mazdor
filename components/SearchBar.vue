<template>
    <div class="flex flex-col md:flex-row max-w-xl items-center my-3 justify-center mx-auto p-6">
        <div
            class="flex flex-col md:flex-row items-center bg-gray-900 space-y-4 md:space-y-0 md:space-x-4 border border-gray-600 rounded-md p-2 shadow-md w-full md:w-[800px]">
            <div class="w-full md:w-80">
                <UInputMenu trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                    placeholder="What service are looking for.." :options="[
                        'Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook',
                        'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz',
                        'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'
                    ]" size="xl"
                    :ui="{ base: 'appearance-none shadow-none inset-shadow-none dark:appearance-none dark:shadow-none dark:inset-shadow-none dark:ring-0' }" />
            </div>
            <div class="w-full md:w-80">
                <UInputMenu trailing-icon="i-heroicons-chevron-up-down-20-solid" class="w-full text-lg shadow-none"
                    placeholder="What are you looking for.." :options="[
                        'Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook',
                        'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz',
                        'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'
                    ]" size="xl"
                    :ui="{ base: 'appearance-none shadow-none inset-shadow-none dark:appearance-none dark:shadow-none dark:inset-shadow-none dark:ring-0' }" />
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