<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import BlogError from '@/components/blog/BlogError.vue'
  import BlogPage from '@/components/blog/BlogPage.vue'

  const route = useRoute()

  var postsPerPage = 10
  const posts = ref([
    { id: 1, date: new Date(2024, 3, 7, 12, 0), title: 'Welcome to Distribunity!' },
    {
      id: 2,
      date: new Date(2024, 3, 14, 14, 23),
      title: 'Distribunity planned as a Mobile and Desktop application'
    }
  ])

  function getPageCount() {
    return Math.ceil(posts.value.length / postsPerPage)
  }

  function doesPageExist() {
    return route.query.page > 0 && route.query.page <= getPageCount()
  }
</script>

<template>
  <main class="page-inner main-style">
    <BlogError
v-if="!doesPageExist()" error-message="Oops! This page doesn't exist." redirect-href="/blog?page=1"
      subtitle="Let's take you back to the beginning." />
    <BlogPage v-else :posts="posts" :get-page-count="getPageCount" :route="route" />
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    place-items: center;
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
