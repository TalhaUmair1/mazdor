<template>
    <div class="container mx-auto mt-20 p-4">
        <h1 class="text-3xl font-bold text-start mb-6">Top Places</h1>
        <div class="flex flex-wrap justify-start gap-6">

            <div v-for="(city, index) in cities" :key="index">
                <a href="#"
                    class="block text-blue-500 text-center font-medium p-3 rounded-lg hover:underline hover:text-blue-700 cursor-pointer transition-all ease-in-out duration-200">
                    {{ city }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Multan',
    'Peshawar',
    'Quetta',
    'Faisalabad',
    'Sialkot',
    'Gujranwala',
    'Sukkur',
    'Bahawalpur',
    'Murree',
    'Gawadar',
    'Mardan',
    'Abbottabad',
    'Haripur',
    'Hyderabad',
    'Jhelum',
    'Larkana',
    'Dera Ghazi Khan',
    'Sargodha',
    'Khushab',
    'Nowshera',
    'Turbat',
    'Chiniot',
    'Bannu',
    'Kasur',
    'Kotli',
    'Risalpur',
    'Zhob'
];
</script>
