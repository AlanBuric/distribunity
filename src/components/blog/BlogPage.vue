<script lang="ts" setup>
  import PostList from './PostList.vue'

  const props = defineProps(['posts', 'getPageCount', 'route'])

  function focusTopBar() {
    document.getElementById('#top-bar')?.focus()
  }

  function prevPageExists() {
    return props.route.query.page > 1
  }

  function nextPageExists() {
    return props.route.query.page < props.getPageCount()
  }
</script>

<template>
  <PostList :posts="props.posts" />
  <h3 v-if="!nextPageExists()">
    You've arrived at the beginning of history!
  </h3>
  <div id="page-controls">
    <RouterLink
      v-if="prevPageExists()" class="primary-btn"
      :to="{ name: 'blog', query: { page: parseInt($route.query.page) - 1 } }"
    >
      Previous
    </RouterLink>
    <button class="primary-btn" @click="focusTopBar">
      Back to top
    </button>
    <RouterLink
      v-if="nextPageExists()" class="primary-btn"
      :to="{ name: 'blog', query: { page: parseInt($route.query.page) + 1 } }"
    >
      Next
    </RouterLink>
  </div>
</template>
