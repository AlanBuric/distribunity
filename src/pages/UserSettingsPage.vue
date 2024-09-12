<script setup lang="ts">
  import NavigationBar from '@/components/home/NavigationBar.vue';
  import type { SettingsSection } from '@/types/types';
  import OrganizationSection from './OrganizationSection.vue';
  import { ref } from 'vue';
  import DisplaySection from './DisplaySection.vue';

  const currentSection = ref('profile');
  const sections: SettingsSection[] = [
    {
      name: 'profile',
      sidebarName: 'Profile',
      displayName: 'Profile Settings',
    },
    {
      name: 'account',
      sidebarName: 'Account',
      displayName: 'Account Settings',
    },
    {
      name: 'display',
      sidebarName: 'Display',
      displayName: 'Display Settings',
    },
    {
      name: 'organization',
      sidebarName: 'Organizations',
      displayName: 'Organization Settings',
    },
  ];

  function changeSection(section: string) {
    currentSection.value = section;
  }

  function saveSettings(section: string) {
    alert(`${section} settings saved!`);
  }
</script>

<template>
  <NavigationBar class="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700" />
  <div class="settings-container flex h-screen bg-white dark:bg-gray-900">
    <aside class="side-panel w-1/5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-5 border-r border-gray-300 dark:border-gray-700">
      <h3 class="text-xl font-semibold mb-4">
        Settings
      </h3>
      <ul class="space-y-2">
        <li
          v-for="section in sections" :key="section.name" :class="{
            'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': currentSection === section.name,
            'hover:bg-gray-100 dark:hover:bg-gray-600': currentSection !== section.name
          }"
          class="p-3 rounded cursor-pointer transition-all" @click="changeSection(section.name)"
        >
          {{ section.sidebarName }}
        </li>
      </ul>
    </aside>

    <main class="main-content w-full p-8 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-l border-gray-300 dark:border-gray-700">
      <div v-if="currentSection === 'profile'" class="flex flex-col space-y-4">
        <h2 class="text-2xl font-semibold mb-4">
          Profile Settings
        </h2>
        <button
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
          @click="saveSettings('profile')"
        >
          Save
        </button>
      </div>

      <div v-if="currentSection === 'account'" class="flex flex-col space-y-4">
        <h2 class="text-2xl font-semibold mb-4">
          Account Settings
        </h2>
        <button
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
          @click="saveSettings('account')"
        >
          Save
        </button>
      </div>

      <DisplaySection
        v-if="currentSection === 'display'" class="flex flex-col space-y-4"
        :save-settings="saveSettings"
      />

      <OrganizationSection v-if="currentSection === 'organization'" />
    </main>
  </div>
</template>
