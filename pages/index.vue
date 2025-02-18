<template>
  <div>
    <HeroSection />
    <SearchBar />
    <ServiceCards :services="services" />
    <ProfileCards :profiles="profiles" />
    <div class="text-center my-6">
      <h2 class="text-3xl font-semibold mt-8">Want to See more</h2>
      <h4 class="text-gray-300 text-xl my-3 font-medium">To search & view all listings, create your free account.</h4>
      <div class="flex gap-4 justify-center">
        <UButton class="rounded-sm py-2 ">find more worker </UButton>
        <UButton class="rounded-sm py-2 ">list your profile</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
const profiles = [
  {
    id: 1,
    image: "/download1.jpg",
    skill: 'Electrion',
    price: 200,
    experiance: 'Electrion with the experiance of 3 years',
    description: 'Skilled and experienced electrician with 3 years of experience in the commercial and residential se...'
  },
  {
    id: 1,
    image: "/download2.png",
    skill: 'plumber',
    price: 600,
    experiance: 'Plumber with the experiance of 3 years',
    description: 'Skilled and experienced plumber with 3 years of experience in the commercial and residential se...'
  },
  {
    id: 1,
    image: "/download3.jpg",
    skill: 'carpanter',
    price: 900,
    experiance: 'Carpanter with the experiance of 3 years',
    description: 'Skilled and experienced carpanter with 3 years of experience in the commercial and residential se...'
  }
]
</script>

<style></style>