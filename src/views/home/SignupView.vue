<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { getPasswordStrength, type PasswordStrength } from '@/scripts/signup';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth, database } from '@/firebase/init';
  import { setDoc, doc } from 'firebase/firestore';
  import router from '@/router';

  const PASSWORDS_MATCH = {
    message: 'Passwords match.',
    className: 'text-green-400',
  };

  const PASSWORDS_DONT_MATCH = {
    message: 'Confirmation password doesn\'t match the password.',
    className: 'text-red-400',
  };

  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const passwordStrength = ref<PasswordStrength>({ title: 'Weak', strength: 1 });
  const passwordsMatch = ref();
  const isWaitingForResponse = ref(false);

  watch(password, (newPassword) => {
    passwordStrength.value = getPasswordStrength(newPassword ?? '');
  });

  watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
    passwordsMatch.value = newPassword != newConfirmPassword ? PASSWORDS_DONT_MATCH : PASSWORDS_MATCH;
  });

  function getFormValidityFeedback() {
    const issues: string[] = [];

    if (passwordStrength.value.strength == 2) {
      issues.push(
        'Your password is too weak. Use lowercase and uppercase letters, numbers and symbols',
      );
    }

    if (password.value.length < 6) {
      issues.push('Your password is too short, it needs to be at least 6 characters long');
    }

    if (confirmPassword.value != password.value) {
      issues.push('Your passwords don\'t match');
    }

    return issues;
  }

  const formIssues = ref<string[]>([]);

  function handleSubmit() {
    formIssues.value = getFormValidityFeedback();

    if (formIssues.value.length == 0) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          formIssues.value = ['Firebase Auth user creation succeeded.'];

          setDoc(doc(database, 'users', userCredential.user.uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            theme: 'dark',
            language: 'en_us',
            organizations: [],
            joined: Date.now(),
          })
            .then(() => {
              formIssues.value = ['Your user profile is ready.'];
              router.push({ path: '/dashboard' });
            })
            .catch(() => {
              formIssues.value = [
                'Sorry, but we failed to create your user profile in our database. Please contact us for support; you can find our contacts at the bottom of the page.',
              ];
            });
        })
        .catch((error) => {
          formIssues.value = [error.code, error.message];
        });
    }
  }
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md my-5 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
      Create an account
    </h2>

    <label for="firstName" class="block text-lg font-medium text-gray-700 dark:text-gray-300">
      First name:
    </label>
    <input
      v-model="firstName"
      class="w-full p-2 mt-2 mb-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="text"
      name="firstName"
      minlength="2"
      maxlength="40"
      placeholder="e.g. Amelia"
      autocomplete="given-name"
      required
    >

    <label for="lastName" class="block text-lg font-medium text-gray-700 dark:text-gray-300">
      Last name:
    </label>
    <input
      v-model="lastName"
      class="w-full p-2 mt-2 mb-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="text"
      name="lastName"
      minlength="2"
      maxlength="40"
      placeholder="e.g. Wilson"
      autocomplete="family-name"
    >

    <label for="email" class="block text-lg font-medium text-gray-700 dark:text-gray-300">
      Email:
    </label>
    <input
      v-model="email"
      class="w-full p-2 mt-2 mb-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="email"
      name="email"
      placeholder="e.g. amelia.wilson@gmail.com"
      autocomplete="email"
      required
    >

    <label for="password" class="block text-lg font-medium text-gray-700 dark:text-gray-300">
      Password:
    </label>
    <input
      v-model="password"
      class="w-full p-2 mt-2 mb-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="password"
      name="password"
      minlength="6"
      placeholder="New password"
      autocomplete="new-password"
      required
    >

    <p id="password-strength" class="mb-4 text-gray-600 dark:text-gray-400">
      Password strength: {{ passwordStrength.title }}
    </p>

    <label for="password-confirm" class="block text-lg font-medium text-gray-700 dark:text-gray-300">
      Confirm password:
    </label>
    <input
      id="password-confirm"
      v-model="confirmPassword"
      class="w-full p-2 mt-2 mb-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      type="password"
      name="password-confirm"
      placeholder="Confirm password"
      autocomplete="off"
      required
      :disabled="isWaitingForResponse"
    >
    <p v-if="passwordsMatch" :class="['mb-4', passwordsMatch.className]">
      {{ passwordsMatch.message }}
    </p>

    <input
      type="submit"
      value="Sign up"
      class="primary-btn w-full py-3 mt-6 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition"
    >

    <ul v-if="formIssues.length > 0" class="invalid-input mt-4 text-red-600">
      <li v-for="(issue, index) in formIssues" :key="index">
        {{ issue }}
      </li>
    </ul>
  </form>
</template>
