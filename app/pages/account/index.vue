<template>
    <div>
        <UCard class="max-w-2xl mx-auto border my-6 border-gray-200 shadow-lg bg-primary-500">
            <template #header>
                <div class="text-center">
                    <h1 class="text-2xl font-bold text-neutral-500">Account Details</h1>
                    <h5 class="text-xl font-semibold my-2 p-2 text-primary-500">
                        Please fill in the details below clearly to keep your profile updated.
                    </h5>
                </div>
            </template>
            <UForm class="space-y-4" @submit="updateAccount" :state="form">
                <UFormGroup label="Upload Photo" name="avatar" :ui="{ label: 'text-primary-500' }">
                    <UInput size="lg" type="file" @input="handleFileInput" />
                </UFormGroup>

                <UFormGroup label="Full Name" name="name" :ui="{ label: 'text-primary-500' }">
                    <UInput v-model="form.name" type="text" size="lg" variant="outline" placeholder="Full Name"
                        required />
                </UFormGroup>

                <UFormGroup label="Email" name="email" :ui="{ label: 'text-primary-500' }">
                    <UInput v-model="form.email" type="email" size="lg" variant="outline" placeholder="Email"
                        required />
                </UFormGroup>

                <UFormGroup label="Phone No" name="phone" :ui="{ label: 'text-primary-500' }">
                    <UInput v-model="form.phone" type="text" size="lg" variant="outline" placeholder="Phone No"
                        required />
                </UFormGroup>

                <UFormGroup label="WhatsApp No" name="whatsapp" :ui="{ label: 'text-primary-500' }">
                    <UInput v-model="form.whatsapp" type="text" size="lg" variant="outline" placeholder="WhatsApp No"
                        required />
                </UFormGroup>

                <div class="text-center">
                    <UButton class="w-full py-3 flex justify-center items-center" type="submit" :loading="loading">
                        Save Changes
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

let form = reactive({
    id: '',
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    avatar: ''
});

const { handleFileInput, files } = useFileStorage()

const { data: users, error: userError } = await useFetch('/api/users')

if (userError.value) {
    console.error('Error fetching user data:', userError.value)
} else if (users.value) {
    form = users.value
}

const updateAccount = async () => {
    loading.value = true;
    form.avatar = files.value[0];

    try {
        const response = await $fetch(`api/users/${form.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        console.log('Account updated successfully!', response);
        // Ensure this function is available in your context
        await navigateTo('/profile/create');

    } catch (error) {
        console.error('Error updating account:', error?.data || error);
    } finally {
        loading.value = false;
    }
};


</script>
