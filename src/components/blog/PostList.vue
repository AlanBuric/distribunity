<script setup>
    const props = defineProps(['posts']);
</script>

<template>
    <div v-for="post in props.posts" :key="post.id" class="post">
        <h4>{{ post.title }}</h4>
        <span>{{ post.date.toLocaleDateString() }}</span>
    </div>
</template>

<style scoped>
    .post {
        border: 1px silver solid;
        padding: 10px;
        border-radius: 10px;
        width: 100%;
        max-width: 800px;
    }
</style>