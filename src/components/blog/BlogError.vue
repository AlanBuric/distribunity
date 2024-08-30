<script setup>
    const props = defineProps(['errorMessage', 'redirectHref', 'subtitle']);
    // Oops! This page doesn't exist.
    // Let's take you back to the beginning.
</script>

<template>
    <h1><b>{{ props.errorMessage }}</b></h1>
    <a :href="props.redirectHref">{{ props.subtitle }}</a>
</template>