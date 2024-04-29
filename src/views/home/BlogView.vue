<script setup>
    import { ref } from 'vue';
    import { navigate } from '@/shared';
    import { useRoute } from "vue-router";
    const route = useRoute();

    var postsPerPage = 10;
    const posts = ref([
        { id: 1, date: new Date(2024, 3, 7, 12, 0), title: 'Welcome to Distribunity!' },
        { id: 2, date: new Date(2024, 3, 14, 14, 23), title: 'Distribunity planned as a Mobile and Desktop application' }
    ]);

    function prevPageExists() {
        return route.query.page > 1;
    }

    function nextPageExists() {
        return route.query.page < Math.ceil(posts.value.length / postsPerPage);
    }
</script>

<template>
    <main class="page-inner main-style">
        <h3>You've arrived at the beginning of history!</h3>
        <div id="page-controls">
            <RouterLink class="primary-btn" v-if="prevPageExists()"
                :to="{ name: 'blog', query: { page: parseInt($route.query.page) - 1 } }">
                Previous</RouterLink>
            <button class="primary-btn" onClick="document.getElementById('#top-bar')?.focus()">Back to top</button>
            <RouterLink class="primary-btn" v-if="nextPageExists()"
                :to="{ name: 'blog', query: { page: parseInt($route.query.page) + 1 } }">Next
            </RouterLink>
        </div>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        place-items: center;
        margin: 20px 0px 20px 0px;
    }

    #page-controls {
        display: flex;
        margin: 20px;
        gap: 10px;
    }

    #page-controls * {
        font-size: 1.2em;
        padding: 0.6em 0.7em;
        margin: 0;
    }
</style>