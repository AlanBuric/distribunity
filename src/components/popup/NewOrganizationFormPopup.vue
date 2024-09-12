<script setup lang="ts">
  import { auth, database } from '@/firebase/init';
  import { addDoc, collection } from 'firebase/firestore';
  import { ref } from 'vue';
  import Popup from '../ModalPopup.vue';

  const isWaiting = ref(false);
  const hasFinished = ref(false);

  const name = ref('');
  const country = ref('us');

  function submitForm() {
    const userUID = auth.currentUser?.uid;

    if (userUID == null) {
      return;
    }

    addDoc(collection(database, 'organizations'), {
      name: name.value,
      owner: auth.currentUser?.uid,
      folders: [],
    });
  }

</script>

<template>
  <Popup>
    <div v-if="hasFinished" />
    <form
      v-else
      @submit.prevent="submitForm"
    >
      <h3 class="text-lg font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">
        Create a new
        organization
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        Please fill out the following details to create your organization.
      </p>
      <div class="flex flex-col space-y-4">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Organization
            Name</label>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            minlength="3"
            required
            placeholder="My Awesome Business"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          >
        </div>

        <div>
          <label
            for="country"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Country</label>
          <input
            id="country"
            v-model="country"
            name="country"
            type="text"
            minlength="2"
            required
            placeholder="United States"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          >
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          @click="$emit('closeForm')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-teal-500 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400"
        >
          Create
        </button>
      </div>
    </form>
  </Popup>
</template>
