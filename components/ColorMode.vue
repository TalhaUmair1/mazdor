<template>
    <USelect v-model="theme" :options="options" option-attribute="name" />
</template>

<script setup>

import { useColorMode } from '@vueuse/core';

const colorMode = useColorMode();
colorMode.preference = 'light'

const options = [{
    name: 'System',
    value: 'system',
}, {
    name: 'Light',
    value: 'light',
}, {
    name: 'Dark',
    value: 'dark',
}]

const theme = ref(colorMode.preference)

watch(theme, () => {
    console.log(theme.value)
    colorMode.preference = theme.value
    console.log(colorMode.preference)
})
</script>