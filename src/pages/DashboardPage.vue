<script setup lang="ts">
  import NavigationBar from '@/components/home/NavigationBar.vue';
  import { auth, database } from '@/firebase/init';
  import { type Organization, type WithId } from '@/types/types';
  import { doc, DocumentReference, getDoc } from 'firebase/firestore';
  import { reactive } from 'vue';
  import { RouterLink } from 'vue-router';

  const organizations = reactive<(Organization & WithId)[]>([]);

  getDoc(doc(database, 'users', auth.currentUser!.uid)).then((snapshot) => {
    const organizationSnapshots: Array<DocumentReference> | undefined = snapshot.data()?.organizations;

    if (Array.isArray(organizationSnapshots)) {
      organizationSnapshots.forEach(reference => getDoc(reference)
        .then(snapshot => organizations.push({ ...snapshot.data(), id: snapshot.id } as (Organization & WithId))));
    }
  }).catch();
</script>

<template>
  <NavigationBar />
  <main class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-center mb-6">
        Your organizations
      </h1>
      <p class="text-center text-lg mb-8">
        Click an organization to open its inventories page.
      </p>

      <div class="flex flex-wrap justify-center gap-6">
        <template v-if="organizations.length">
          <RouterLink
            v-for="(organization, index) in organizations"
            :key="index"
            :to="`/organization/${organization.id}/inventory`"
            class="block w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-md transition-shadow transform hover:scale-105"
          >
            <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {{ organization.name }}
            </h3>
            <h6 class="text-lg font-medium text-gray-600 dark:text-gray-400">
              {{ organization.country }}
            </h6>
            <h6 class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ organization.members.length }} members
            </h6>
          </RouterLink>
        </template>
        <h3 v-else class="text-2xl text-center text-gray-700 dark:text-gray-300">
          Loading...
        </h3>
      </div>
    </div>
  </main>
</template>
