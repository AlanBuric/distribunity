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

<style>
  main {
    display: flex;
    flex-direction: column;
    /* place-items: center; */
    flex-grow: 1;
    /*border-left: 1px solid #9e9e9e;
    border-right: 1px solid #9e9e9e;*/
    background: var(--color-background-mute);
  }

  @font-face {
    font-family: 'Inter';
    src: url(@/assets/fonts/Inter-variable.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pattaya';
    src: url(@/assets/fonts/Pattaya-minified.woff2) format('woff2');
  }
</style>