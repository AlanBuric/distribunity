<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{ saveSettings: (section: string) => void }>();

  const themeSelection = ref<string>();

  function detectSystemTheme() {
    const themeSelect = document.getElementById('theme') as HTMLSelectElement;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      themeSelect.value = 'dark';
    } else {
      themeSelect.value = 'light';
    }
  }
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Display settings
    </h2>

    <form class="space-y-4" @submit.prevent="saveSettings('display')">
      <div class="flex flex-col space-y-2">
        <label for="language" class="text-gray-700 dark:text-gray-300">
          Language
          <select
            id="language" name="language"
            class="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="en_us">English (US)</option>
            <option value="hr_hr">Croatian</option>
          </select>
        </label>

        <label for="theme" class="text-gray-700 dark:text-gray-300">
          Theme
          <select
            id="theme" v-model="themeSelection" name="theme"
            class="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
      </div>

      <button
        type="button" class="max-w-md px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        @click="detectSystemTheme"
      >
        Detect system default theme
      </button><br>

      <button
        type="submit"
        class="max-w-md px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
      >
        Save
      </button>
    </form>
  </div>
</template>
