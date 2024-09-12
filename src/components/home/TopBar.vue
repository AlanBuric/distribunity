<script lang="ts" setup>
  import NavHeader from './NavHeader.vue';
  import NavigationBar from './NavigationBar.vue';
</script>

<template>
  <div
    role="banner"
    class="bg-white dark:bg-gray-800"
  >
    <div class="max-w-screen-2xl w-full page-inner-nav">
      <NavHeader />
      <NavigationBar />
    </div>
  </div>
</template>

<style scoped>
  [role='banner'] {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0px 2px 5px rgba(40, 40, 40, 0.2);
    z-index: 100;
    padding: 8px 10px;
    font-size: 0.9rem;
  }

  .page-inner-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
</style>
