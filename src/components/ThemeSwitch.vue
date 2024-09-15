<script setup lang="ts">
  import MoonIcon from './icons/MoonIcon.vue';
  import SunIcon from './icons/SunIcon.vue';
  import useGlobalStore from '@/store/global';

  const store = useGlobalStore();
</script>

<template>
  <button @click="store.toggleTheme">
    <MoonIcon
      v-if="store.isDarkTheme()"
      width="1.4em"
      height="1.4em"
      class="fill-gray-300"
    />
    <SunIcon
      v-else
      width="1.4em"
      height="1.4em"
      class="fill-gray-800"
    />
  </button>
</template>
