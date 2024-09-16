<script setup lang="ts">
  import NavigationBar from '@/components/home/NavigationBar.vue';
  import LoadingAnimation from '@/components/icons/LoadingAnimation.vue';
  import JoinOrganizationForm from '@/components/JoinOrganizationForm.vue';
  import OrganizationCard from '@/components/OrganizationCard.vue';
  import NewOrganizationFormPopup from '@/components/popup/NewOrganizationFormPopup.vue';
  import useAuthStore from '@/store/auth';
  import { computed, ref } from 'vue';

  const organizations = computed(() => useAuthStore().userProfile?.organizations);
  const isOrganizationFormOpen = ref(false);
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
          <JoinOrganizationForm />
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
