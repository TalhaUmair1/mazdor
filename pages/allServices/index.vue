<template>
    <div>
        <div class="text-center mt-20">
            <h1 class="text-4xl font-bold my-2"> What Can Our Professionals Do For You?</h1>
            <h6 class="text-gray-300 mt-3 mb-6">These are all general categories of all services our professionals
                provide
            </h6>
        </div>
        <ServiceCards :services="services" />
    </div>
</template>

<script setup>
const services = [
    {
        id: 1,
        title: "Plumbing",
        image: "/download1.jpg"
    },
    {
        id: 2,
        title: "Electrical",
        image: "/download2.png"
    },
    {
        id: 3,
        title: "Carpentry",
        image: "/download3.jpg"
    },
    {
        id: 4,
        title: "machinery",
        image: "/download2.png"
    }
];
console.log("Services Data:", services);
</script>
