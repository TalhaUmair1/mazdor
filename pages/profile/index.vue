<template>
    <div>
        <UCard class="max-w-2xl mx-auto border my-6 border-gray-200 shadow-lg">
            <template #header>
                <div class="text-center">
                    <h1 class="text-2xl font-bold">Create New Profile</h1>
                    <h5 class="text-xl font-semibold my-2 p-2 text-gray-300">
                        Please fill in the details below clearly so that you can reach more people.
                    </h5>
                </div>
            </template>

            <UForm class="space-y-4">
                <UFormGroup label="Title of the profile" name="title">
                    <UInput type="text" size="lg" variant="outline" placeholder="Title of the profile." />
                </UFormGroup>

                <UFormGroup label="What kind of service you want to offer" name="service">
                    <div class="w-full md:w-[620px] border rounded-md  border-gray-500">
                        <UInputMenu trailing-icon="i-heroicons-chevron-up-down-20-solid"
                            class="w-full text-lg shadow-none" placeholder="What service are you looking for?" :options="[
                                'Plumber', 'Electrician', 'Carpenter', 'Painter',
                            ]" size="xl"
                            :ui="{ base: 'appearance-none shadow-none inset-shadow-none dark:appearance-none dark:shadow-none dark:inset-shadow-none dark:ring-0' }" />
                    </div>
                </UFormGroup>

                <UFormGroup label="Start from (minimum price)" name="price">
                    <UInput type="text" size="lg" variant="outline" placeholder="Starting price" />
                </UFormGroup>

                <UFormGroup label="What type of service do you offer?" name="service type">
                    <div class="w-full md:w-[620px] border rounded-md border-gray-500">
                        <UInputMenu trailing-icon="i-heroicons-chevron-down-20-solid" class="w-full text-lg shadow-none"
                            placeholder="What service do you provide?" :options="[
                                'Home Only Service', 'Shop Only Service', 'Both Home and Shop Service', 'Online Service',
                            ]" size="xl"
                            :ui="{ base: 'appearance-none shadow-none inset-shadow-none dark:appearance-none dark:shadow-none dark:inset-shadow-none dark:ring-0' }" />
                    </div>
                </UFormGroup>

                <UFormGroup label="Share Your Shop Address" name="address">
                    <UInput type="text" size="lg" variant="outline" placeholder="Your Shop Address" />
                </UFormGroup>

                <UFormGroup label="What Areas do you operate in? (Include city name)" name="areas">
                    <UInput type="text" size="lg" variant="outline" placeholder="What areas do you operate in?" />
                </UFormGroup>

                <UFormGroup label="Describe Your Skill and Services in Detail" name="description">
                    <UTextarea :rows="12" placeholder="Describe your skills and services" class="m-2" />
                </UFormGroup>

                <div class="text-center">
                    <UButton class="w-full py-3 flex justify-center items-center" type="submit">
                        Create Profile
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </div>

</template>

<script setup>

</script>

<style lang="scss" scoped></style>