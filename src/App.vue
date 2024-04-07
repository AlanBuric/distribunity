<script setup>
  import { RouterView } from 'vue-router'
  import TopBar from './components/main/TopBar.vue'
  import MainFooter from './components/main/MainFooter.vue'
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
    /* place-items: center; */
    flex-grow: 1;
    /*border-left: 1px solid #9e9e9e;
    border-right: 1px solid #9e9e9e;*/
    background: var(--color-background-mute);
  }
</style>