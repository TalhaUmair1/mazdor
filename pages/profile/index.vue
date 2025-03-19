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
            <UForm class="space-y-4" @submit="createProfile" :state="form">
                <UFormGroup label="Title of the profile" name="title">
                    <UInput v-model="form.title" type="text" size="lg" variant="outline"
                        placeholder="Title of the profile." required />
                </UFormGroup>

                <UFormGroup label="What kind of service you want to offer" name="service_id">
                    <UInputMenu v-model="form.service_id" trailing-icon="i-heroicons-chevron-up-down-20-solid"
                        class="w-full text-lg shadow-none" placeholder="What service are you looking for?"
                        :options="services?.data" option-attribute="name" value-attribute="id" size="xl" required />
                </UFormGroup>

                <UFormGroup label="Start from (minimum price)" name="min_price">
                    <UInput v-model="form.min_price" type="number" size="lg" variant="outline"
                        placeholder="Starting price" required />
                </UFormGroup>

                <UFormGroup label="Service Type" name="service_type">
                    <USelect v-model="form.service_type" size="lg" :options="serviceOptions" required />
                </UFormGroup>

                <UFormGroup label="Share Your Shop Address" name="shop_address">
                    <UInput v-model="form.shop_address" type="text" size="lg" variant="outline"
                        placeholder="Your Shop Address" required />
                </UFormGroup>

                <UFormGroup label="Describe Your Skill and Services in Detail" name="description">
                    <UTextarea v-model="form.description" :rows="6" placeholder="Describe your skills and services"
                        class="m-2" required />
                </UFormGroup>

                <div class="text-center">
                    <UButton class="w-full py-3 flex justify-center items-center" type="submit" :loading="loading">
                        Create Profile
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
import { ref, reactive } from 'vue';

const loading = ref(false);

const form = reactive({
    title: '',
    service_id: '',
    min_price: '',
    service_type: '',
    shop_address: '',
    description: ''
});


const { data: services } = await useFetch('/api/services');
console.log('services', services);

const serviceOptions = [
    { label: 'Home Service', value: 'homeOnly' },
    { label: 'Shop Service', value: 'shopOnly' },
    { label: 'Both Home and Shop', value: 'Both' }
];

const createProfile = async () => {
    loading.value = true;
    try {
        const response = await $fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        console.log('Profile created successfully!', response);
    } catch (error) {
        console.error('Error creating profile:', error?.data || error);
    } finally {
        loading.value = false;
    }


};

</script>
