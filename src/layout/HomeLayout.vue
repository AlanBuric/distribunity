<script lang="ts" setup>
  import { RouterView } from 'vue-router';
  import TopBar from '@/components/home/TopBar.vue';
  import MainFooter from '@/components/home/MainFooter.vue';
</script>

<template>
  <div class="flex flex-col items-center">
    <TopBar />
    <div class="h-28" />
    <RouterView />
    <MainFooter />
  </div>
</template>
