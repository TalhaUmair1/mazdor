<template>
  <div class="flex items-center justify-center mt-5">
    <UCard class="w-full max-w-2xl p-8 rounded-xl shadow ">
      <template #header>
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-center text-secondary-700 lg:text-3xl">
            Create Your Service Profile
          </h2>
          <p class="max-w-screen-md mx-auto text-center text-secondary-600 md:text-lg mt-2">
            Fill in your service details to connect with customers looking for your expertise.
          </p>
        </div>
      </template>

      <UForm
        :schema="profileSchema"
        :state="form"
        class="space-y-6 mt-4"
        @submit="createProfile"
      >
        <div>
          <UFormField
            label="Profile Title"
            name="title"
           class="text-semibold"
                       required
            :ui="{ label: 'text-neutral-500' }"
          >
            <UInput
              v-model="form.title"
              type="text"
              placeholder="Profile Title"
              size="xl"
              variant="outline"
              class="w-full my-2"
            />
          </UFormField>

          <UFormField
            label="What kind of service you want to offer"
            name="serviceId"
            required
            :ui="{ label: 'text-neutral-500' }"
          >
            <UInputMenu
              v-model="form.serviceId"
              v-model:search-term="serviceSearchTerm"
              :items="services"
              value-key="id"
              label-key="name"
              placeholder="Select a service"
              :disabled="!servicesLoaded"
              searchable
              size="xl"
              class="w-full my-2"
              :loading="!servicesLoaded"
            />
            <template #help v-if="!servicesLoaded"> Loading services... </template>
          </UFormField>

          <UFormField
            label="Years of experience"
            name="experience"
            required
            :ui="{ label: 'text-neutral-500' }"
          >
            <UInput
              v-model.number="form.experience"
              type="number"
              :min="0"
              :max="50"
              placeholder="Years of experience"
              size="xl"
              variant="outline"
              class="w-full my-2"
            />
          </UFormField>

          <UFormField
            label="Start from (minimum service price)"
            name="minPrice"
            required
            :ui="{ label: 'text-neutral-500' }"
          >
            <UInput
              v-model.number="form.minPrice"
              type="number"
              :min="0"
              :max="50000"
              placeholder="Start from (minimum service price)"
              size="xl"
              variant="outline"
              class="w-full my-2"
            />
          </UFormField>

          <UFormField
            label="What type of service you offer"
            name="serviceType"
            required
            :ui="{ label: 'text-neutral-500' }"
          >
            <USelect
              v-model="form.serviceType"
              :items="[
                { label: 'Home Only Services', value: 'homeOnly' },
                { label: 'Shop Only Services', value: 'shopOnly' },
                { label: 'Both Home and at Shop Services', value: 'both' },
              ]"
              placeholder="What type of service you offer"
              size="xl"
              class="w-full my-2"
            />
          </UFormField>

          <UFormField
            label="What areas you operate (must add city first)"
            name="service_area"
            required
            :ui="{ label: 'text-neutral-500' }"
          >
            <USelectMenu
              v-model="form.service_area"
              v-model:search-term="locationSearchTerm"
              :items="locations"
              value-key="id"
              label-key="name"
              placeholder="What areas you operate (must add city first)"
              multiple
              searchable
              :disabled="!locationsLoaded"
              size="xl"
              class="w-full my-2"
              :loading="!locationsLoaded"
            />
            <template #help v-if="!locationsLoaded"> Loading locations... </template>
          </UFormField>

          <UFormField
            label="Share your shop address"
            name="shopAddress"
            :ui="{ label: 'text-neutral-500' }"
          >
            <UInput
              v-model="form.shop_address"
              type="text"
              placeholder="Share your shop address"
              size="xl"
              variant="outline"
              class="w-full my-2"
            />
          </UFormField>

          <UFormField
            label="Describe your skills and services you offer in details"
            name="description"
            required
            :ui="{ label: 'text-neutral-500' }"
          >
            <UTextarea
              v-model="form.description"
              rows="5"
              placeholder="Describe your skills and services you offer in details"
              size="xl"
              variant="outline"
              class="w-full my-2"
            />
          </UFormField>

          <UButton
            type="submit"
            class=" py-3 mt-6"
            :loading="loading"
            color="secondary"
            size="xl"
          >
            Create Profile
          </UButton>
        </div>
      </UForm>
      <p class="text-sm text-black mt-4">User Only create three profiles Just.</p>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "restrict", 'profilte'],
});

const { user } = useUserSession()
const loading = ref(false)
const serviceSearchTerm = ref("")
const locationSearchTerm = ref("")

import { z } from 'zod'

const profileSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  serviceId: z.union([z.number().int().positive('Service is required'), z.object({}).passthrough()]),
  minPrice: z.number().min(0, 'Minimum price must be a positive number'),
  serviceType: z.enum(['homeOnly', 'shopOnly', 'both'], {
    errorMap: () => ({ message: 'Service type is required and must be homeOnly, shopOnly, or both' })
  }),
  experience: z.number().min(0, 'Experience is required'),
  description: z.string().min(1, 'Description is required'),
  service_area: z.array(z.number()).nonempty('Service area is required'),
  shop_address: z.string().min(1, 'Shop address is required')
})

// Form state
const form = reactive({
  title: "",
  serviceId: undefined,
  minPrice: 0,
  serviceType: "homeOnly",
  shop_address: "",
  description: "",
  experience: 0,
  service_area: [],
});

// Selected locations
const selectedLocations = ref([]);

// Fetch services with search support
const { data: servicesData } = useFetch(() => {
  const query = serviceSearchTerm.value && serviceSearchTerm.value.trim() 
    ? `?search=${encodeURIComponent(serviceSearchTerm.value)}`
    : '';
  return `/api/services${query}`;
}, {
  watch: [serviceSearchTerm]
});

// Fetch locations with search support
const { data: locationsData } = useFetch(() => {
  const query = locationSearchTerm.value && locationSearchTerm.value.trim() 
    ? `?search=${encodeURIComponent(locationSearchTerm.value)}`
    : '';
  return `/api/locations${query}`;
}, {
  watch: [locationSearchTerm]
});

// Computed properties to extract data from paginated API responses
const services = computed(() => servicesData.value?.data || []);
const locations = computed(() => locationsData.value?.data || []);

// Check if data is loaded
const servicesLoaded = computed(() => !!servicesData.value?.data);
const locationsLoaded = computed(() => !!locationsData.value?.data);

// Create profile function
const createProfile = async (event) => {
  if (!user.value?.id) {
    console.error("User not authenticated");
    return;
  }
  
  // Check if required data is loaded
  if (!servicesLoaded.value) {
    console.error('Services data is still loading');
    return;
  }
  
  if (!locationsLoaded.value) {
    console.error('Locations data is still loading');
    return;
  }

  loading.value = true;

  try {
    console.log("Creating profile with form data:", event.data);

    // Extract service ID from either a number or an object
    const serviceIdValue = typeof event.data.serviceId === 'object' && event.data.serviceId !== null
      ? event.data.serviceId.id
      : event.data.serviceId;

    const profileData = {
      title: event.data.title,
      service_id: serviceIdValue,
      experience: event.data.experience,
      min_price: event.data.minPrice,
      service_type: event.data.serviceType,
      shop_address: event.data.shop_address,
      description: event.data.description,
      service_area: event.data.service_area,
    };

    console.log("Sending profile data:", profileData);

    const response = await $fetch("/api/profile", {
      method: "POST",
      body: profileData,
    });

    console.log("Profile created successfully!", response);
    await navigateTo("/");
  } catch (error) {
    console.error("Error creating profile:", error);
    // Handle error appropriately
  } finally {
    loading.value = false;
  }
};
</script>
