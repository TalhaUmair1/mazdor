<template>
  <div>
    <HeroSection />
    <SearchBar />
    <ServiceCards :services="services" />
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
    id: 3,
    title: "machinery",
    image: "/download3.jpg"
  }
];
</script>

<style></style>