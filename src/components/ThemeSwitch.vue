<script setup lang="ts">
  import { ref } from 'vue';
  import MoonIcon from './icons/MoonIcon.vue';
  import SunIcon from './icons/SunIcon.vue';

  const isDark = ref(false);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  };

  // Load the theme on initial load:
  const savedTheme = localStorage.getItem('theme') === 'dark';

  document.documentElement.classList.toggle('dark', savedTheme);

  isDark.value = savedTheme;
</script>

<template>
  <button @click="toggleDarkMode">
    <MoonIcon
      v-if="isDark"
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
