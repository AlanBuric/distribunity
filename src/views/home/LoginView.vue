<script lang="ts" setup>
  import { auth } from '@/firebase/init';
  import router from '@/router';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');
  const loginError = ref<string>();
  const isWaitingForResponse = ref(false);

  function handleSubmit() {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => {
        switch (error.code) {
        case 'auth/invalid-credential':
          loginError.value = 'Incorrect email.';
          break;
        default:
          loginError.value = 'Wrong password.';
          break;
        }
      });
  }
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md my-5 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
      Welcome back!
    </h2>

    <label for="email" class="block text-lg font-medium text-gray-700 dark:text-gray-300">Email:</label>
    <input
      v-model="email"
      class="w-full p-2 mt-2 mb-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="email"
      name="email"
      placeholder="e.g. amelia.wilson@gmail.com"
      autocomplete="email"
      required
    >

    <label for="password" class="block text-lg font-medium text-gray-700 dark:text-gray-300">Password:</label>
    <input
      v-model="password"
      class="w-full p-2 mt-2 mb-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="password"
      name="password"
      placeholder="New password"
      autocomplete="current-password"
      required
    >

    <button
      type="submit"
      value="Log in"
      class="fancy-button"
      :disabled="isWaitingForResponse"
    >
      Log in
    </button>
    <p v-if="loginError" class="mt-4 text-red-600">
      {{ loginError }}
    </p>
  </form>
</template>

<style lang="css">
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 0s 600000s, color 0s 600000s !important;
  }
</style>
