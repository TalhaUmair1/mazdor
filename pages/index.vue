<template>
  <div>
    <HeroSection />
    <SearchBar />
    <ServiceCards :services="services?.data" />

    <!-- Profiles Section -->
    <ProfileCards :profiles="profiles ?? []" />

    <div class="text-center my-6 mx-4">
      <h2 class="text-3xl font-semibold mt-8">Want to See More?</h2>
      <h4 class="text-gray-300 text-xl my-3 font-medium">
        To search & view all listings, create your free account.
      </h4>
      <div class="flex gap-4 justify-center">
        <UButton to="/allServices" class="rounded-sm py-2">Find More Workers</UButton>
        <UButton to="/profile" class="rounded-sm py-2">List Your Profile</UButton>
      </div>
    </div>

    <TopPlaces />
  </div>
</template>

<script setup lang="ts">
const { data: profiles } = await useFetch('/api/profile');
console.log("Profile Data:", profiles);

const { data: services } = await useFetch('/api/services') ?? [];
console.log("Services Data:", services);
</script>
