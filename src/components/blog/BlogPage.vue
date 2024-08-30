<script setup>
    import PostList from './PostList.vue';

    const props = defineProps(['posts', 'getPageCount', 'route']);

    function focusTopBar() {
        document.getElementById('#top-bar')?.focus()
    }

    function prevPageExists() {
        return props.route.query.page > 1;
    }

    function nextPageExists() {
        return props.route.query.page < props.getPageCount();
    }
</script>

<template>
    <PostList :posts="props.posts"></PostList>
    <h3 v-if="!nextPageExists()">You've arrived at the beginning of history!</h3>
    <div id="page-controls">
        <RouterLink class="primary-btn" v-if="prevPageExists()"
            :to="{ name: 'blog', query: { page: parseInt($route.query.page) - 1 } }">
            Previous</RouterLink>
        <button class="primary-btn" @click="focusTopBar">Back to top</button>
        <RouterLink class="primary-btn" v-if="nextPageExists()"
            :to="{ name: 'blog', query: { page: parseInt($route.query.page) + 1 } }">Next
        </RouterLink>
    </div>
</template>