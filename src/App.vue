<script setup>
  import { RouterView } from 'vue-router'
  import TopBar from './components/main/TopBar.vue'
  import MainFooter from './components/main/MainFooter.vue'
</script>

<template>
  <TopBar />
  <main>
    <RouterView />
  </main>
  <MainFooter />
</template>

<style scoped>
  main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    place-items: center;
    place-content: center;
  }
</style>