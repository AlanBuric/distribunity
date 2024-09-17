<script lang="ts" setup>
  import { RouterView } from 'vue-router';
  import TopBar from '@/components/home/TopBar.vue';
  import MainFooter from '@/components/home/MainFooter.vue';
</script>

<template>
  <div class="flex flex-col items-center h-full">
    <TopBar />
    <RouterView class="mt-28 max-sm:mt-40" />
    <MainFooter class="flex-1 mt-4 w-full" />
  </div>
</template>
