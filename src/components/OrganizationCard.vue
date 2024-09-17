<script setup lang="ts">
  import { database, auth } from '@/firebase/init';
  import { deleteInventoryRecursively } from '@/scripts/firebase-utilities';
  import useAuthStore from '@/store/auth';
  import type { Organization, WithId } from '@/types/types';
  import { getDoc, doc, updateDoc, arrayRemove, runTransaction, collection, getDocs } from 'firebase/firestore';

  const props = defineProps<{
    organizationStringRef: string
  }
  >();

  const orgRef = doc(database, props.organizationStringRef);
  const orgSnapshot = await getDoc(orgRef);
  const orgData = orgSnapshot.data() as Organization;
  const organization: Organization & WithId = { ...orgData, id: orgSnapshot.id };

  async function leaveOrganization() {
    if (!confirm(`Are you sure you want to leave the organization ${organization.name}?`)) {
      return;
    }

    const userProfileRef = useAuthStore().userProfileRef;

    if (userProfileRef) {
      await updateDoc(userProfileRef, { organizations: arrayRemove(orgRef) });
    }
  };

  async function deleteOrganization() {
    if (!confirm(`Are you sure you want to delete the organization ${organization.name}?`)) {
      return;
    }

    const orgRef = doc(database, 'organizations', organization.id);
    const inventoriesRef = collection(database, 'organizations', organization.id, 'inventories');
    const membersRef = collection(database, 'organizations', organization.id, 'members');

    try {
      await runTransaction(database, async (transaction) => {
        const inventorySnapshots = await getDocs(inventoriesRef);
        inventorySnapshots.forEach(async (inventoryDoc) => {
          await deleteInventoryRecursively(organization.id, inventoryDoc.id);
        });

        (await getDocs(membersRef)).forEach((memberDoc) => {
          const userRef = doc(database, 'users', memberDoc.id);

          transaction.update(userRef, {
            organizations: arrayRemove(orgRef),
          });
        });

        transaction.delete(orgRef);
      });
    } catch (error) {
      console.error('An error was caught while trying to delete an organization', error);
    }
  };
</script>

<template>
  <div class="block w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
      {{ organization.name }}
    </h3>
    <h6 class="text-lg font-medium text-gray-600 dark:text-gray-400">
      {{ organization.country }}
    </h6>

    <div class="mt-4 flex space-x-2">
      <RouterLink :to="`/organization/${organization.id}/inventories`" class="text-sm bg-gray-200 text-gray-900 px-3 py-2 rounded-lg dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-sm transition-shadow transform hover:scale-105">
        Open
      </RouterLink>
      <RouterLink
        :to="`/organization/${organization.id}`"
        v-if="organization.owner.id === auth.currentUser?.uid"
        class="text-sm bg-gray-200 text-gray-900 px-3 py-2 rounded-lg dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-sm transition-shadow transform hover:scale-105"
      >
        Admin page
      </RouterLink>
      <button
        v-if="organization.owner.id === auth.currentUser?.uid"
        @click="deleteOrganization()"
        class="text-red-600 hover:text-red-800 text-sm font-semibold px-2 py-1 hover:shadow-md transition-shadow transform hover:scale-105"
      >
        Delete
      </button>
      <button
        v-else
        @click="leaveOrganization()"
        class="text-red-600 hover:text-red-800 text-sm font-semibold px-2 py-1 hover:shadow-md transition-shadow transform hover:scale-105"
      >
        Leave
      </button>
    </div>
  </div>
</template>
