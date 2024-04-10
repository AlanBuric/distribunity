<script setup>
  import { RouterView } from 'vue-router'
  import TopBar from '@/components/home/TopBar.vue'
  import MainFooter from '@/components/home/MainFooter.vue'
</script>

<template>
  <TopBar />
  <main class="page-inner">
    <RouterView />
  </main>
  <MainFooter />
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: var(--color-background-mute);
  }
</style>