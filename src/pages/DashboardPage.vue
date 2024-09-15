<script setup lang="ts">
  import NavigationBar from '@/components/home/NavigationBar.vue';
  import LoadingAnimation from '@/components/icons/LoadingAnimation.vue';
  import OrganizationCard from '@/components/OrganizationCard.vue';
  import NewOrganizationFormPopup from '@/components/popup/NewOrganizationFormPopup.vue';
  import { auth, database } from '@/firebase/init';
  import useAuthStore from '@/store/auth';
  import { doc, arrayRemove, arrayUnion, collection, getDocs, query, where, limit, writeBatch } from 'firebase/firestore';
  import { computed, ref } from 'vue';

  const organizations = computed(() => useAuthStore().userProfile?.organizations);
  const isOrganizationFormOpen = ref(false);
  const invitationCode = ref<string>();
  const invitationStatus = ref<{ text: string, status?: 'progress' | 'success' | 'not-found' }>({ text: '' });
  const authStore = useAuthStore();

  async function joinOrganization() {
    invitationStatus.value = {
      text: 'Searching for organizations...',
      status: 'progress',
    };

    invitationCode.value = invitationCode.value?.toUpperCase();
    const organizationsRef = collection(database, 'organizations');
    const queryOrgsWithCode = query(organizationsRef, where('invites', 'array-contains', invitationCode.value), limit(1));

    try {
      const snapshot = await getDocs(queryOrgsWithCode);

      if (snapshot.size == 0) {
        setInvitationFailure();
        return;
      }

      const targetOrganization = snapshot.docs[0];
      const batch = writeBatch(database);

      batch.update(targetOrganization.ref, { invites: arrayRemove(invitationCode.value), members: arrayUnion(doc(database, 'users', auth.currentUser!.uid)) });
      batch.update(doc(database, 'users', auth.currentUser!.uid), { organizations: arrayUnion(targetOrganization.ref) });

      await batch.commit();

      invitationStatus.value = {
        text: `You've joined ${targetOrganization.data().name}`,
        status: 'success',
      };
    } catch (ignored) {
      setInvitationFailure();
    }
  }

  function setInvitationFailure() {
    invitationStatus.value = {
      text: 'Organization not found with that invitation code.',
      status: 'not-found',
    };
  }
</script>

<template>
  <NewOrganizationFormPopup
    v-if="isOrganizationFormOpen"
    @close-form="isOrganizationFormOpen = false"
  />
  <div class="flex flex-col h-full">
    <NavigationBar :hide-blog="true" class="flex-initial" />
    <main class="flex-grow flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-4">
      <div class="max-w-7xl space-y-6">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold text-center">
            Your organizations
          </h1>

          <h2 class="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
            Create or join an organization
          </h2>
        </div>

        <div class="flex flex-wrap justify-center items-stretch gap-6">
          <div class="md:w-1/3 space-y-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <button
              class="w-full px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              @click.prevent="isOrganizationFormOpen = true"
            >
              Create an organization
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
              An organization is a company, business, or even a community, which manages one or more inventories.
            </p>
          </div>
          <form class="md:w-1/3 space-y-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md" @submit.prevent="joinOrganization">
            <input
              v-model="invitationCode"
              placeholder="6-digit invitation code"
              class="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 appearance-none dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-active-link"
              pattern="[A-Za-z0-9]{6}"
              title="6 characters long"
              required
            >
            <p class="text-sm text-gray-400">
              The invitation code is 6 characters long, composed of Latin letters and/or numbers.
            </p>
            <button
              type="submit"
              class="w-full px-3 py-2 text-white rounded bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              :disabled="!invitationCode || invitationCode.length === 0"
            >
              Join an organization
            </button>
            <p
              v-if="invitationStatus.status" :class="{
                'text-center mt-4': true,
                'text-red-500': invitationStatus.status === 'not-found',
                'text-green-500': invitationStatus.status === 'success',
                'text-teal-500': invitationStatus.status === 'progress'
              }"
            >
              {{ invitationStatus.text }}
            </p>
          </form>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
            Joined organizations
          </h2>
          <p v-if="organizations" class="text-center text-lg text-gray-700 dark:text-gray-200">
            Click an organization to open its inventories page.
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6">
          <Transition mode="out-in" v-if="organizations && organizations.length > 0">
            <Suspense timeout="0">
              <OrganizationCard v-for="organization in organizations" :key="organization" :organization-string-ref="organization" />

              <template #fallback>
                <LoadingAnimation />
              </template>
            </Suspense>
          </Transition>
          <h3 v-else class="text-2xl text-center text-gray-700 dark:text-gray-300">
            You're not a member of any organization.
          </h3>
        </div>
      </div>
    </main>
  </div>
</template>
