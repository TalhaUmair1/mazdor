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
// console.log('services', services);

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
const servicesData = {
    "items": [
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.156Z",
            "id": "tsm6zhbjvtypyyv",
            "name_en": "Transportation",
            "name_ur": "نقل و حمل",
            "svg_path": "M58.2 11.5H26.9c-2.5 0-4.6 2.1-4.6 4.6v.7H8.6c-.9 0-1.7.5-2.1 1.3l-5 10.1c-.2.3-.2.7-.2 1.1v15.6c0 1 .8 1.8 1.8 1.8H6c.5 3.6 3.6 6.3 7.3 6.3s6.8-2.8 7.3-6.3H42c.5 3.6 3.6 6.3 7.3 6.3s6.8-2.8 7.3-6.3h3.7c1.4 0 2.5-1.1 2.5-2.5V16c0-2.5-2.1-4.5-4.6-4.5zM9.3 20.2h13.1v7H5.8l3.5-7zm3.9 29.2c-2.2 0-3.9-1.8-3.9-3.9s1.8-3.9 3.9-3.9 3.9 1.8 3.9 3.9-1.7 3.9-3.9 3.9zm0-11.3c-3.2 0-6 2.1-7 5H4.8V30.8h17.6v12.3h-2.1c-1.1-2.9-3.8-5-7.1-5zm36.1 11.3c-2.2 0-3.9-1.8-3.9-3.9s1.8-3.9 3.9-3.9 3.9 1.8 3.9 3.9-1.8 3.9-3.9 3.9zm10-6.3h-3c-1-2.9-3.8-5-7-5s-6 2.1-7 5H25.8V16c0-.6.5-1.1 1.1-1.1h31.3c.6 0 1.1.5 1.1 1.1v27.1z",
            "updated": "2023-03-29 19:25:31.156Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.199Z",
            "id": "59z5ks0dipujmti",
            "name_en": "Plumbing",
            "name_ur": "پلمبنگ",
            "svg_path": "M45.971 44.396c0-1.994-3.638-7.567-3.638-7.567s-3.693 5.573-3.693 7.567c0 1.99 1.642 3.604 3.666 3.604 2.023 0 3.665-1.614 3.665-3.604ZM19.666 13.171h-7.331V5.944h1.999V2H1v3.944h2v11.17c0 2.904 2.388 5.257 5.333 5.257h11.333v1.972h4.001V11.201h-4.001v1.97Zm27.332 16.428v-11.17c0-2.903-2.387-5.257-5.329-5.257H30.334v-1.97h-4.001v13.143h4.001v-1.973h7.332v7.227h-1.997v3.944H49v-3.944h-2.002Z",
            "updated": "2023-03-29 19:25:31.199Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.216Z",
            "id": "evpn2lp2b3bo8br",
            "name_en": "Electrician",
            "name_ur": "الیکٹریشن",
            "svg_path": "M21 14c0-.55-.45-1-1-1h-2v2h2c.55 0 1-.45 1-1zm-1 3h-2v2h2c.55 0 1-.45 1-1s-.45-1-1-1zm-4-5h-2c-1.1 0-2 .9-2 2h-1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h1c0 1.1.9 2 2 2h2c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM5 13c0-1.1.9-2 2-2h1.5c1.93 0 3.5-1.57 3.5-3.5S10.43 4 8.5 4H5c-.55 0-1 .45-1 1s.45 1 1 1h3.5c.83 0 1.5.67 1.5 1.5S9.33 9 8.5 9H7c-2.21 0-4 1.79-4 4s1.79 4 4 4h2v-2H7c-1.1 0-2-.9-2-2z",
            "updated": "2023-03-29 19:25:31.216Z",
            "view_box": "0 0 24 24"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.232Z",
            "id": "cwm8w47rtbo6hha",
            "name_en": "Painting",
            "name_ur": "پینٹنگ",
            "svg_path": "M55.7 9.2h-.9V4.9c0-2-1.5-3.7-3.4-3.7H17.8c-1.9 0-3.4 1.7-3.4 3.7v4.2H9.9c-1.9 0-3.4 1.5-3.4 3.4v15.2c0 1.9 1.5 3.4 3.4 3.4h28.3v4.4H36c-1.7 0-3 1.4-3 3.2v20.8c0 1.8 1.4 3.2 3 3.2h8c1.7 0 3-1.4 3-3.2V38.7c0-1.8-1.4-3.2-3-3.2h-2.2V31c0-1.9-1.5-3.4-3.4-3.4H10v-15h4.4v4.2c0 2 1.5 3.7 3.4 3.7h33.7c1.9 0 3.4-1.7 3.4-3.7v-4.2h.9c1 0 1.8-.8 1.8-1.8s-.9-1.6-1.9-1.6zM43.4 59.3h-7V39h7v20.3zm7.9-42.4v.2H18V4.7h33.3v12.2z",
            "updated": "2023-03-29 19:25:31.232Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.247Z",
            "id": "qe1gk2r4zchmc9c",
            "name_en": "Carpentry",
            "name_ur": "کارپینٹری",
            "svg_path": "m9.8 17-3.9-5.4L20 2l2 3v3h-3v3h-3v3h-3v3m-3.3 1.7-.5 2.8-1.6 1.2c-.9.6-2.1.4-2.8-.5l-3.5-4.9c-.6-.9-.4-2.1.5-2.8l3.3-2.3 4.6 6.5M4.6 15 3 16.1 6.5 21l1.6-1.2L4.6 15Z",
            "updated": "2023-03-29 19:25:31.247Z",
            "view_box": "0 0 24 24"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.260Z",
            "id": "1y7f5t9nafghd63",
            "name_en": "Plastering",
            "name_ur": "پلستر کرنا",
            "svg_path": "M60.9 49.8 48.6 37.4c-1.2-1.2-2.7-1.8-4.4-1.8-1.6 0-3.2.6-4.4 1.8L31.3 29l8.3-8.3c.8-.8 1.1-1.8.9-2.9-.2-1-.9-1.9-1.9-2.3L5.8 1.5c-1.2-.5-2.6-.2-3.5.7-1 .9-1.2 2.3-.7 3.5l14 32.8c.4 1 1.3 1.7 2.3 1.9.2 0 .4.1.6.1.8 0 1.6-.3 2.3-.9l8-8 8.5 8.5c-2.4 2.4-2.4 6.3 0 8.7l12.3 12.3c1.2 1.2 2.7 1.8 4.4 1.8s3.2-.6 4.4-1.8l2.5-2.5c2.4-2.6 2.4-6.4 0-8.8zM18.7 36.7 5.1 5l31.8 13.5-18.2 18.2zM58.4 56l-2.5 2.5c-1 1-2.7 1-3.8 0L39.9 46.2c-1-1-1-2.7 0-3.7l2.5-2.5c.5-.5 1.2-.8 1.9-.8s1.4.3 1.9.8l12.3 12.3c.9 1 .9 2.6-.1 3.7z",
            "updated": "2023-03-29 19:25:31.260Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.277Z",
            "id": "57csvpx84cemx9t",
            "name_en": "Cleaning",
            "name_ur": "صفائی",
            "svg_path": "M14 17V3c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v14M14 14h4M26 31H6l2.7-12.4c.2-.9 1-1.6 2-1.6h10.8c.9 0 1.8.7 2 1.6L26 31zM9 21h14M11 27v3M21 29v1",
            "updated": "2023-03-29 19:25:31.277Z",
            "view_box": "0 0 32 32"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.290Z",
            "id": "f7fh5w4qy6uapq3",
            "name_en": "Wallpapering",
            "name_ur": "وال پیپرنگ",
            "svg_path": "M487.491 81.312 420.967 3.645A10.408 10.408 0 0 0 413.051 0H168.763a10.422 10.422 0 0 0-10.217 8.358L90.118 346.862H48.88C21.472 346.862 0 378.301 0 418.436 0 458.56 21.472 490 48.88 490h273.615c40.821 0 77.046-31.491 88.098-76.583l79.108-322.845a10.413 10.413 0 0 0-2.21-9.26zm-30.575-3.645h-49.608l11.036-45.036 38.572 45.036zm-174.31 391.482H48.88c-13.256 0-28.029-20.831-28.029-50.713 0-29.892 14.773-50.722 28.029-50.722h233.727c-8.344 12.868-13.436 30.714-13.436 50.722-.001 20.003 5.091 37.845 13.435 50.713zm107.736-60.701c-8.755 35.736-36.657 60.701-67.847 60.701h-6.705c-10.715 0-22.506-16.097-25.198-40.287h61.388c5.758 0 10.426-4.663 10.426-10.426 0-40.134-20.475-71.574-46.615-71.574H111.387L177.29 20.851h222.474l-15.867 64.762c-1.917 6.566 3.543 12.905 10.125 12.905h72.266l-75.946 309.93zm-99.751-.438c2.693-24.201 14.483-40.297 25.198-40.297 10.711 0 22.501 16.096 25.193 40.297h-50.391z",
            "updated": "2023-03-29 19:25:31.290Z",
            "view_box": "0 0 490 490"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.304Z",
            "id": "ibtjabmyihpugfj",
            "name_en": "Roofing",
            "name_ur": "چھت سازی",
            "svg_path": "M8.149 16.062h6.06l-.053 3.575-6.007 5.406v-8.981zm16.758-1.979L1 35.169 3.52 38l21.485-18.954L46.486 38 49 35.169 25.097 14.083 25 14l-.093.083z",
            "updated": "2023-03-29 19:25:31.304Z",
            "view_box": "0 0 50 50"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.316Z",
            "id": "cloz5175o3skt5g",
            "name_en": "Gardening",
            "name_ur": "باغبانی",
            "svg_path": "m222.427 289.256 17.633 77.246-22.845 44.818c-7.182-.152-14.152 3.691-17.557 10.549L149.293 524.98c-4.705 9.457-.851 20.943 8.606 25.646l8.559 4.256c9.458 4.705 20.942.852 25.646-8.605l50.356-103.104c2.878-5.785 2.524-12.307-.325-17.586l25.273-49.59.22-.078 11.035-21.82 23.419 6.178.144-.115 33.908 9.246c.354 7.842 5.47 14.994 13.407 17.434l109.911 32.951c10.098 3.107 20.799-2.553 23.906-12.65L486.17 398c3.107-10.098-2.554-20.797-12.651-23.906l-109.911-32.951c-5.346-1.645-10.825-.775-15.291 1.846l-42.065-11.477-45.833-56.781-51.762-222.683L156.379 0l46.435 203.385L69.867 38.68l8.97 72.685 143.59 177.891zm-6.235-39.665c-2.075-4.8.134-10.366 4.935-12.441s10.366.134 12.441 4.934c2.075 4.8-.134 10.366-4.935 12.441s-10.366-.134-12.441-4.934z",
            "updated": "2023-03-29 19:25:31.316Z",
            "view_box": "0 0 556.888 556.889"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.331Z",
            "id": "k33usisdsozz3bp",
            "name_en": "AC Repair",
            "name_ur": "اے سی کی مرمت",
            "svg_path": "M22 3.6V11H2V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6ZM18 7h1M2 11l.79 2.584A2 2 0 0 0 4.702 15H6m16-4-.79 2.584A2 2 0 0 1 19.298 15H18m-8.5-.5s0 7-3.5 7m8.5-7s0 7 3.5 7m-6-7v7",
            "updated": "2023-03-29 19:25:31.331Z",
            "view_box": "0 0 24 24"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.342Z",
            "id": "4rwy3oqfv4tpy79",
            "name_en": "Geyser",
            "name_ur": "گیزر",
            "svg_path": "M36.994 21.402 49.701 8.695a1 1 0 0 0-.707-1.707h-8a1 1 0 1 0 0 2h5.586l-11 11h-1.586v-4a1 1 0 0 0-1-1h-2V13.97a5.944 5.944 0 0 0 3.242-1.669 5.957 5.957 0 0 0 1.758-4.242 5.96 5.96 0 0 0-1.758-4.243L30.701.28a1.03 1.03 0 0 0-1.414 0l-3.535 3.536a5.958 5.958 0 0 0-1.758 4.243c0 1.603.624 3.109 1.758 4.242a5.944 5.944 0 0 0 3.242 1.669v1.018h-2a1 1 0 0 0-1 1v4h-1.586l-11-11h5.586a1 1 0 1 0 0-2h-8a1 1 0 0 0-.707 1.707l12.707 12.707v4.859c-5.14 1.13-9 5.713-9 11.187v21.54a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1v-21.54c0-5.474-3.86-10.057-9-11.187v-1.273h3v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h-3v-1.586zm-9.828-10.514a3.973 3.973 0 0 1-1.172-2.828c0-1.068.416-2.073 1.172-2.829l2.828-2.828 2.828 2.828a3.973 3.973 0 0 1 1.172 2.829 3.973 3.973 0 0 1-1.172 2.828 3.966 3.966 0 0 1-1.828 1.03v-1.93a1 1 0 1 0-2 0v1.929a3.965 3.965 0 0 1-1.828-1.029zm14.828 12.1h2v2h-2v-2zm-14-6h4v3h-4v-3zm16 34h-12v-12h12v12zm-.023-14H30.994a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13v5h-28v-20.54c0-5.216 4.244-9.46 9.46-9.46h9.08c5.061 0 9.195 3.998 9.437 9zm-18.517-11h-.46v-4h10v4H25.454z",
            "updated": "2023-03-29 19:25:31.342Z",
            "view_box": "0 0 59.988 59.988"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.362Z",
            "id": "ccijjv6sbm9jxhd",
            "name_en": "Car Repair",
            "name_ur": "کار کی مرمت",
            "svg_path": "m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z",
            "updated": "2023-03-29 19:25:31.362Z",
            "view_box": "0 0 32 32"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.375Z",
            "id": "k2ql5ob3dtik2en",
            "name_en": "Maid",
            "name_ur": "نوکرانی",
            "svg_path": "M392.501 1.915c-8.353-4.318-18.624-1.096-22.939 7.258L228.805 281.599h38.324L399.814 24.801c4.315-8.353 1.042-18.571-7.313-22.886zM304.798 305.996c-.557-.619-1.781-1.698-3.719-1.698H115.288v.001c-1.94 0-3.163 1.093-3.719 1.712a5.02 5.02 0 0 0-1.255 3.9l7.329 69.042 85.707-40.341c5.672-2.671 12.434-.234 15.103 5.438 2.671 5.672.236 12.435-5.434 15.104l-92.838 43.705 11.556 108.795c.184.15.628.346 1.348.346h150.198c.721 0 1.164-.196 1.348-.346l21.423-201.743a5.065 5.065 0 0 0-1.256-3.915z",
            "updated": "2023-03-29 19:25:31.375Z",
            "view_box": "0 0 511.999 511.999"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.388Z",
            "id": "x3oh40a5ov2ekg6",
            "name_en": "Home Appliances Repair",
            "name_ur": "گھریلو آلات کی مرمت",
            "svg_path": "M7 23q-.5-1-.75-2.45Q6 19.1 6 17.6q0-2.475.55-4.088Q7.1 11.9 8 11V6l3-5h.5v5.15q-.25.125-.375.35Q11 6.725 11 7q0 .425.288.713Q11.575 8 12 8t.713-.287Q13 7.425 13 7q0-.275-.125-.5-.125-.225-.375-.35V1h.5l3 5v5q.925.9 1.462 2.512Q18 15.125 18 17.6q0 1.5-.25 2.95Q17.5 22 17 23q-1.05-.325-1.675-1.188-.625-.862-.6-1.962 0-.625.138-1.35.137-.725.137-1.45 0-1.45-.787-3.05-.788-1.6-2.213-3-1.4 1.4-2.2 3-.8 1.6-.8 3.05 0 .725.15 1.45t.175 1.35q0 1.1-.637 1.975Q8.05 22.7 7 23Z",
            "updated": "2023-03-29 19:25:31.388Z",
            "view_box": "0 0 24 24"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.399Z",
            "id": "bqfipmbpjyb0zti",
            "name_en": "Labor",
            "name_ur": "مزدور",
            "svg_path": "M62.2 14.9 49 1.5c-.7-.7-1.8-.7-2.5 0s-.7 1.8 0 2.5l5.4 5.5-3.7 3.7-1-1c-.7-.7-1.8-.7-2.5 0s-.7 1.8 0 2.5l1 1-17.9 18-5.2-5.2c-.8-.8-2.1-.8-2.9 0L4.5 43.9C.2 48.3.2 55.4 4.5 59.7c2.1 2.1 4.9 3.3 7.9 3.3s5.8-1.2 7.9-3.3l15.3-15.4c.8-.8.8-2.1 0-2.9l-5.2-5.3L48.3 18l.9 1c.7.7 1.8.7 2.5 0s.7-1.8 0-2.5l-1-1 3.7-3.7 5.4 5.4c.7.7 1.8.7 2.5 0 .6-.5.6-1.6-.1-2.3zM32 42.9 17.8 57.3c-1.4 1.5-3.4 2.3-5.4 2.3-2 0-3.9-.8-5.4-2.3-3-3-3-7.9 0-10.9L21.2 32l4.2 4.2-1 1c-.7.7-.7 1.8 0 2.5.3.3.8.5 1.2.5.5 0 .9-.2 1.2-.5l1-1 4.2 4.2z",
            "updated": "2023-03-29 19:25:31.399Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.411Z",
            "id": "6447ep7ar2q3zjs",
            "name_en": "Crafts",
            "name_ur": "دستکاری",
            "svg_path": "M53.5 1.2h-5.1c-4 0-7.3 3.3-7.3 7.3v40.1c0 .3.1.6.3.9l7.3 12c.5.8 1.4 1.3 2.4 1.3s1.9-.5 2.4-1.3l7.3-12c.2-.3.3-.6.3-.9V8.5c-.3-4-3.6-7.3-7.6-7.3zm-5.1 3.5h5.1c2.1 0 3.8 1.7 3.8 3.8v3.4H44.6V8.5c0-2.1 1.7-3.8 3.8-3.8zm2.5 53.9-6.4-10.5V15.4h12.7v32.7l-6.3 10.5zM22.5 1.3H9c-3.2 0-5.8 2.6-5.8 5.8V57c0 3.2 2.6 5.8 5.8 5.8h13.5c3.2 0 5.8-2.6 5.8-5.8V7.1c-.1-3.2-2.7-5.8-5.8-5.8zm2.2 55.6c0 1.2-1 2.3-2.3 2.3H9c-1.2 0-2.3-1-2.3-2.3v-4.4c.1 0 .3.1.5.1h7.4c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8H7.2c-.2 0-.3 0-.5.1v-6.4c.1 0 .3.1.5.1h2.2c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8H7.2c-.2 0-.3 0-.5.1V33c.1 0 .3.1.5.1h7.4c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8H7.2c-.2 0-.3 0-.5.1v-6.4c.1 0 .3.1.5.1h2.2c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8H7.2c-.2 0-.3 0-.5.1v-6.4c.1 0 .3.1.5.1h7.4c1 0 1.8-.8 1.8-1.8s-.8-1.7-1.8-1.7H7.2c-.2 0-.3 0-.5.1v-3c0-1.2 1-2.3 2.3-2.3h13.5c1.2 0 2.3 1 2.3 2.3v49.8z",
            "updated": "2023-03-29 19:25:31.411Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.428Z",
            "id": "8wdg3gwv6aw384r",
            "name_en": "Food Delivery",
            "name_ur": "کھانے کی ترسیل",
            "svg_path": "M62.5 36.6c-2.2-7-7.2-14.6-13.9-21.3A54 54 0 0 0 27.4 1.5a5 5 0 0 0-6.2 3L1.6 56a5 5 0 0 0 1.1 5.3c1 1 2.2 1.5 3.5 1.5l1.8-.3L38.1 51l.2-.1 3.6-1.4 17.5-6.7a5 5 0 0 0 3.1-6.2zM6.8 59.1c-.8.3-1.4-.2-1.6-.3-.2-.2-.7-.7-.3-1.6l4.2-11A6.2 6.2 0 0 0 21 43.7c0-3.4-2.8-6.2-6.2-6.2-.9 0-1.8.2-2.6.6L20 17.5c1.3.8 2.6 1.6 3.9 2.6a6.1 6.1 0 0 0-2.6 5c0 3.4 2.8 6.2 6.2 6.2 2.6 0 4.8-1.6 5.7-3.8A78 78 0 0 1 46.7 44l-2.4.9c0-3.4-2.8-6.2-6.2-6.2s-6.2 2.8-6.2 6.2c0 1.6.6 3 1.6 4.1L6.8 59.1zM12 43.7c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7c0 1.5-1.2 2.7-2.7 2.7S12 45.2 12 43.7zm18.2-18.8v.2c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 0 1-.3-5.4l3 2.5zm7.2 22.6a2.8 2.8 0 0 1-2.1-2.6c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7c0 .6-.2 1.1-.5 1.5l-2.8 1.1zm20.9-8L50 42.7a81.1 81.1 0 0 0-16.9-20l-.2-.1a60.5 60.5 0 0 0-4.2-3.3l-.1-.1c-2.6-1.9-5.1-3.6-7.4-5l3.2-8.5c.2-.6.8-1 1.4-1l.5.1c6.4 2 13.6 6.8 19.8 13 6.2 6.2 11 13.5 13 19.9.3.7-.1 1.5-.8 1.8z",
            "updated": "2023-03-29 19:25:31.428Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-03-29 19:25:31.443Z",
            "id": "08lxjv2jw7ypq4s",
            "name_en": "Medicine Delivery",
            "name_ur": "ادویات کی فراہمی",
            "svg_path": "M20.5 62.7A19.3 19.3 0 0 1 6.9 29.9l23-23a19.3 19.3 0 0 1 27.2 27.2l-23 23a18.9 18.9 0 0 1-13.6 5.6zM9.4 54.6a15.9 15.9 0 0 0 22.3 0L42 44.3 19.6 22.1 9.4 32.4a15.6 15.6 0 0 0 0 22.2zm12.7-35 22.3 22.3 10.3-10.3a15.9 15.9 0 0 0 0-22.3 15.9 15.9 0 0 0-22.3 0L22.1 19.6z",
            "updated": "2023-03-29 19:25:31.443Z",
            "view_box": "0 0 64 64"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 03:45:04.284Z",
            "id": "0on1omk8yhrvy1a",
            "name_en": "Computer Laptop Hardware",
            "name_ur": "کمپیوٹر لیپ ٹاپ ہارڈ ویئر",
            "svg_path": "M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z",
            "updated": "2023-07-16 03:45:04.284Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 03:53:38.959Z",
            "id": "c98u7tev9ih89dh",
            "name_en": "Software Development",
            "name_ur": "سافٹ ویئر ڈویلپمنٹ",
            "svg_path": "M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z",
            "updated": "2023-07-25 09:48:48.435Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 03:58:45.111Z",
            "id": "lk22tovccjzibbn",
            "name_en": "Mobile Phone Repair",
            "name_ur": "موبائل فون کی مرمت",
            "svg_path": "M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z",
            "updated": "2023-07-16 03:58:45.111Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 04:10:50.107Z",
            "id": "ypijo0n54udw6ui",
            "name_en": "Solar Panel Installation",
            "name_ur": "سولر پینل لگانا",
            "svg_path": "M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z",
            "updated": "2023-07-16 04:10:50.107Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 04:16:59.513Z",
            "id": "mvnpuv2vg8b9zso",
            "name_en": "LED LCD TV Repair",
            "name_ur": " ٹی وی کی مرمت",
            "svg_path": "M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z",
            "updated": "2023-07-16 04:16:59.513Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 04:35:53.503Z",
            "id": "igzk426ru8y93rx",
            "name_en": "Fridge Repair",
            "name_ur": "فریج کی مرمت",
            "svg_path": "M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
            "updated": "2023-07-16 04:35:53.503Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 04:46:20.034Z",
            "id": "x1azmwc19u6gl3b",
            "name_en": "Water Purifier Service",
            "name_ur": "پانی صاف کرنے والے فلٹر",
            "svg_path": "M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z",
            "updated": "2023-07-16 04:46:20.034Z",
            "view_box": "0 0 16 16"
        },
        {
            "collectionId": "tstd32fgzo3gfly",
            "collectionName": "service",
            "created": "2023-07-16 04:50:44.331Z",
            "id": "px09uh2k6dc0y2s",
            "name_en": "Washing Machine Repair",
            "name_ur": "واشنگ مشین کی مرمت",
            "svg_path": "M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z",
            "updated": "2023-07-16 04:50:44.331Z",
            "view_box": "0 0 16 16"
        }
    ],
    "page": 1,
    "perPage": 30,
    "totalItems": 27,
    "totalPages": 1
}

const tableName = "services";

const sqlStatements = servicesData.items.map(service => {
    return `INSERT INTO ${tableName} (name, svg, view_box) VALUES 
('${service.name_en}', '${service.svg_path}', '${service.view_box}');`;
}).join("\n\n");

console.log(sqlStatements);

</script>
