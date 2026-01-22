<template>
    <div>
        <UCard class="max-w-2xl mx-auto mt-6 mb-10 p-8 rounded-xl shadow bg-primary-500">
            <template #header>
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-center text-secondary-500 lg:text-3xl">Account Settings</h1>
                    <p class="max-w-screen-md mx-auto text-center text-secondary-500 md:text-lg mt-2">
                        Update your personal information and preferences here.
                    </p>
                </div>
            </template>
            <UForm :schema="accountSchema" :state="form" class="space-y-6 mt-4" @submit="updateAccount">
                <UFormField label="Upload Photo" name="avatar" :ui="{ label: 'text-neutral-500' }" class="mb-6">
                    <UInput size="lg" type="file" @input="handleFileInput" class="w-full" variant="outline" />
                </UFormField>

                <UFormField label="Full Name" name="name" required :ui="{ label: 'text-neutral-500' }">
                    <UInput 
                        v-model="form.name" 
                        type="text" 
                        placeholder="Full Name" 
                         size="xl"
                        variant="outline"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Email" name="email" required :ui="{ label: 'text-neutral-500' }">
                    <UInput 
                        v-model="form.email" 
                        type="email" 
                        placeholder="Email" 
                        size="xl"
                        variant="outline"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Phone No" name="phone" required :ui="{ label: 'text-neutral-500' }">
                    <UInput 
                        v-model="form.phone" 
                        type="text" 
                        placeholder="Phone No" 
                        size="xl"
                        variant="outline"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="WhatsApp No" name="whatsapp" required :ui="{ label: 'text-neutral-500' }">
                    <UInput 
                        v-model="form.whatsapp" 
                        type="text" 
                        placeholder="WhatsApp No" 
                        size="xl"
                        variant="outline"
                        class="w-full"
                      
                    />
                </UFormField>

                <div class="mt-8">
                    <UButton 
                        type="submit" 
                        class=" py-3 mt-4"
                        :loading="loading"
                        color="secondary"
                        size="lg"
                    >
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
import { z } from 'zod';

const accountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  whatsapp: z.string().min(1, 'WhatsApp is required'),
  avatar: z.any().optional()
})

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
    // console.error('Error fetching user data:', userError.value)
} else if (users.value) {
    form = users.value
}

const updateAccount = async (event) => {
    loading.value = true;
    
    try {
        // Create FormData to properly handle file uploads
        const formData = new FormData();
        
        // Add non-file fields
        if (event.data.name) formData.append('name', event.data.name);
        if (event.data.email) formData.append('email', event.data.email);
        if (event.data.phone) formData.append('phone', event.data.phone);
        if (event.data.whatsapp) formData.append('whatsapp', event.data.whatsapp);
        
        // Add avatar file if selected
        if (files.value && files.value.length > 0) {
            formData.append('avatar', files.value[0]);
        }

        const response = await $fetch(`/api/users/${form.id}`, {
            method: 'PATCH',
            body: formData
        });

        // console.log('Account updated successfully!', response);
        await navigateTo('/profile/create');

    } catch (error) {
        console.error('Error updating account:', error?.data || error);
    } finally {
        loading.value = false;
    }
};


</script>
