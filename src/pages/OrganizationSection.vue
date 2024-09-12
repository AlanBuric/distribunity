<script setup lang="ts">
  import NewOrganizationFormPopup from '@/components/popup/NewOrganizationFormPopup.vue';
  import { auth, database } from '@/firebase/init';
  import { type Organization, type User, type WithId } from '@/types/types';
  import { arrayRemove, arrayUnion, collection, doc, getDocs, limit, query, updateDoc, where, writeBatch } from 'firebase/firestore';
  import { ref } from 'vue';
  import { useDocument } from 'vuefire';

  type ResolvedUser = Omit<User, 'organizations'> & {
    organizations: (Organization & WithId)[]
  };
  type InvitationStatusEnum = 'searching' | 'success' | 'not-found';
  type InvitationStatus = {
    text: string
    status?: InvitationStatusEnum
  };

  const isOrganizationFormOpen = ref(false);
  const invitationCode = ref<string>();
  const invitationStatus = ref<InvitationStatus>({ text: '' });

  const userDoc = doc(database, 'users', auth.currentUser!.uid);
  const userRef = useDocument<ResolvedUser>(userDoc, { maxRefDepth: 1 });

  function promptLeaveOrganization(organization: Organization & WithId) {
    if (confirm('Are you sure you want to leave the organization ' + organization.name
      + '? The owner will have to invite you again.')) {
      updateDoc(userDoc, { organizations: arrayRemove(doc(database, 'organization', organization.id)) });
    }
  }

  function setInvitationFailure() {
    invitationStatus.value = {
      text: 'Organization not found with that invitation code.',
      status: 'not-found',
    };
  }

  async function joinOrganization() {
    invitationStatus.value = {
      text: 'Searching for organizations...',
      status: 'searching',
    };

    invitationCode.value = invitationCode.value?.toUpperCase();
    const organizationsRef = collection(database, 'organization');
    const queryOrgsWithCode = query(organizationsRef, where('invites', 'array-contains', invitationCode.value), limit(1));

    try {
      const snapshot = await getDocs(queryOrgsWithCode);

      if (snapshot.size == 0) {
        setInvitationFailure();
        return;
      }

      const targetOrganization = snapshot.docs[0];
      const batch = writeBatch(database);

      batch.update(targetOrganization.ref, { invites: arrayRemove(invitationCode.value), members: arrayUnion(userDoc) });
      batch.update(userDoc, { organizations: arrayUnion(targetOrganization.ref) });

      await batch.commit();

      invitationStatus.value = {
        text: `You've joined ${targetOrganization.data().name}`,
        status: 'success',
      };
    } catch (ignored) {
      setInvitationFailure();
    }
  }

</script>

<template>
  <div class="flex flex-col space-y-4">
    <NewOrganizationFormPopup
      v-if="isOrganizationFormOpen"
      @close-form="isOrganizationFormOpen = !isOrganizationFormOpen"
    />
    <h2 class="text-2xl font-semibold mb-4">
      Organization settings
    </h2>

    <div class="flex flex-col max-w-md">
      <button
        class="max-w-md px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
        @click.prevent="isOrganizationFormOpen = !isOrganizationFormOpen"
      >
        Create an organization
      </button><br>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        An organization is a company, business or even a community, which manages one or more inventories.
      </p>
    </div>

    <template v-if="userRef">
      <template v-if="userRef.organizations?.length > 0">
        <h4 class="text-xl font-semibold mb-4">
          My organizations
        </h4>
        <table class="w-full border-collapse table-auto">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700 text-left">
              <th class="p-2 border-b border-gray-300 dark:border-gray-600">
                Name
              </th>
              <th class="p-2 border-b border-gray-300 dark:border-gray-600">
                Role
              </th>
              <th class="p-2 border-b border-gray-300 dark:border-gray-600 max-md:hidden">
                Country
              </th>
              <th class="p-2 border-b border-gray-300 dark:border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(organization, index) in userRef.organizations" :key="index"
              class="even:bg-gray-50 dark:even:bg-gray-800"
            >
              <td class="p-2 border-b border-gray-200 dark:border-gray-700">
                {{ organization.name }}
              </td>
              <td class="p-2 border-b border-gray-200 dark:border-gray-700">
                Unknown
              </td>
              <td class="p-2 border-b border-gray-200 dark:border-gray-700 max-md:hidden">
                {{ organization.country }}
              </td>
              <td class="p-2 border-b border-gray-200 dark:border-gray-700">
                <button
                  class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  @click="promptLeaveOrganization(organization)"
                >
                  Leave
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <p v-else>
        You're not a member of any organizations.
      </p>
    </template>
    <p v-else class="animate-pulse">
      Loading...
    </p>

    <form class="mt-8 max-w-md" @submit.prevent="joinOrganization">
      <div class="mb-4">
        <input
          id="invite-code" v-model="invitationCode" type="text"
          name="inviteCode" pattern="[A-Za-z0-9]{6}"
          title="6 characters long" placeholder="6-digit invitation code" required
          class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-2 dark:bg-gray-800 dark:text-gray-200"
        >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          The invitation code is 6 characters long, composed
          of Latin
          letters and/or numbers.
        </p>
      </div>
      <button
        type="submit"
        class="w-full px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
      >
        Join an organization
      </button>
    </form>

    <p
      v-if="invitationStatus.status" class="mt-4" :class="{
        'text-red-500': invitationStatus.status === 'not-found',
        'text-green-500': invitationStatus.status === 'success',
        'text-yellow-500': invitationStatus.status === 'searching'
      }"
    >
      {{ invitationStatus.text }}
    </p>
  </div>
</template>

<style lang="postcss" scoped>
  input:user-invalid {
    border: 2px solid theme("colors.red.400");
  }

  input:user-valid {
    border: 2px solid theme("colors.green.500");
  }

  input:active {
    border: 2px solid theme("colors.blue.500");
  }
</style>
