<template>
  <section class="p-6 space-y-8">
    <h1 class="text-2xl font-bold text-primary-600">Style Guide Preview</h1>

    <!-- Service Cards Preview -->
    <ServiceCards :services="services" @service-selected="onService" />

    <!-- Profile Cards Preview -->
    <ProfileCards :profiles="profiles" />

    <!-- Simple Login Form Preview -->
    <div class="max-w-md mx-auto p-4 border rounded bg-white">
      <h2 class="text-xl font-semibold mb-3">Login</h2>
      <div class="space-y-3">
        <div>
          <label class="block text-sm text-neutral-700 mb-1">Email</label>
          <input class="w-full p-2 border rounded" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-sm text-neutral-700 mb-1">Password</label>
          <input type="password" class="w-full p-2 border rounded" />
        </div>
        <button class="w-full py-2 rounded bg-primary-600 text-white">Sign in</button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Reuse existing components for preview
import ServiceCards from '~/components/ServiceCards.vue'
import ProfileCards from '~/components/ProfileCards.vue'

// Sample data for previews
const services = [
  { id: 1, name: 'Electrical Work', svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2l2 4 4 2-4 2-2 4-2-4-4-2 4-4 2-2z" fill="#1E40AF"/></svg>' },
  { id: 2, name: 'Plumbing', svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="6" fill="#16A34A"/></svg>' },
]

const profiles = [
  {
    id: 1,
    title: 'Carpenter',
    description: 'Expert in wooden furniture and repairs for homes and shops.',
    user: { avatar: 'https://picsum.photos/60' },
  },
  {
    id: 2,
    title: 'Electrician',
    description: 'Certified electrician for wiring, lighting, and safety systems.',
    user: { avatar: 'https://picsum.photos/61' },
  },
]

const onService = (service) => {
  // no-op for preview
  console.log('service selected', service)
}
</script>
