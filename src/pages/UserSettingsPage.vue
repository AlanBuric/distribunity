<script setup lang="ts">
  import NavigationBar from '@/components/home/NavigationBar.vue';
  import { auth, database } from '@/firebase/init';
  import useAuthStore from '@/store/auth';
  import { EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup } from 'firebase/auth';
  import { GoogleAuthProvider } from 'firebase/auth/web-extension';
  import { deleteDoc, doc } from 'firebase/firestore';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const userProfile = computed(() => useAuthStore().userProfile);
  const router = useRouter();

  const newEmail = ref(auth.currentUser?.email);
  const newPassword = ref('');

  // const theme = ref(userProfile?.theme);
  // const language = ref(userProfile?.language);

  const emailConfirmation = ref('');
  const passwordConfirmation = ref('');

  function saveProfileSettings() {

  }

  function saveAccountSettings() {

  }

  function changeEmail() {

  }

  function resetPassword() {

  }

  async function deleteAccountFromFirestore(userId: string) {
    return deleteDoc(doc(database, 'users', userId))
      .catch(error => console.error('Failed to delete user data:', error));
  }

  function alertFailedToDeleteAccount(error?: any) {
    if (error) {
      console.error(error);
    }

    alert('We were unable to delete your account. Try signing out and back in. If the issue persists, please report it.');
  }

  async function deleteAccount() {
    if (auth.currentUser && confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const userId = auth.currentUser.uid;

      try {
        await deleteAccountFromFirestore(userId);
        await auth.currentUser.delete();
        router.push({ path: '/signup' });
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          try {
            await deleteAccountFromFirestore(userId);
            await reauthenticateUser();
            await auth.currentUser?.delete();

            router.push({ path: '/signup' });
          } catch (reauthError) {
            alertFailedToDeleteAccount(reauthError);
          }
        } else {
          alertFailedToDeleteAccount(error);
        }
      }
    }
  }

  async function reauthenticateUser() {
    const user = auth.currentUser;

    if (!user) {
      alert('No authenticated user.');
      return;
    }

    const providerId = user.providerData[0]?.providerId;

    if (providerId === 'password') {
      const email = user.email;
      const password = prompt('Please re-enter your password to continue.');

      if (!email || !password) {
        alert('Missing email or password for reauthentication.');
        return;
      }

      const credential = EmailAuthProvider.credential(email, password);
      return reauthenticateWithCredential(user, credential);
    } else if (providerId === 'google.com') {
      const provider = new GoogleAuthProvider();
      return reauthenticateWithPopup(user, provider);
    } else {
      alert('Unsupported authentication provider.');
    }
  }
</script>

<template>
  <div v-if="userProfile" class="flex flex-col h-full">
    <div class="flex-initial shadow-md z-10 flex justify-center w-full bg-white dark:bg-gray-800">
      <NavigationBar class="max-w-screen-2xl w-full" />
    </div>
    <div class="flex-1 items-center flex flex-col p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <h1 class="text-3xl font-semibold mb-4">
        User Settings
      </h1>

      <div class="flex flex-col lg:flex-row space-x-10">
        <div class="h-full bg-gray-500 w-[1px]" />

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">
            Profile Settings
          </h2>

          <form @submit.prevent="saveProfileSettings">
            <div class="mb-4">
              <label class="block mb-2">First name</label>
              <input
                type="text"
                v-model="userProfile.firstName"
                class="px-3 py-2 border border-gray-500 rounded w-56 dark:bg-gray-700 dark:text-gray-200"
              >
            </div>

            <div class="mb-4">
              <label class="block mb-2">Last name</label>
              <input
                type="text"
                v-model="userProfile.lastName"
                class="px-3 py-2 border border-gray-500 rounded w-56 dark:bg-gray-700 dark:text-gray-200"
              >
            </div>

            <div class="mb-4">
              <label class="block mb-2">Language</label>
              <select
                v-model="userProfile.language"
                class="px-3 py-2 border border-gray-500 rounded w-56 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="en_us">
                  English
                </option>
                <option value="hr_hr">
                  Croatian
                </option>
              </select>
            </div>

            <button
              type="submit"
              class="px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              Save Profile
            </button>
          </form>
        </section>

        <div class="h-full bg-gray-500 w-[1px]" />

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">
            Account Settings
          </h2>

          <form @submit.prevent="">
            <div class="mb-4">
              <label class="block mb-2">Change email</label>
              <input
                type="email"
                v-model="newEmail"
                class="px-3 py-2 border border-gray-500 rounded w-64 dark:bg-gray-700 dark:text-gray-200"
              >
            </div>

            <div class="flex gap-4">
              <button
                type="button"
                @click="changeEmail"
                class="px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                Change Email
              </button>

              <button
                type="button"
                @click="resetPassword"
                class="px-3 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700"
              >
                Reset Password
              </button>
            </div>
          </form>
        </section>

        <div class="h-full bg-gray-500 w-[1px]" />

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">
            Account deletion
          </h2>

          <form @submit.prevent="deleteAccount">
            <div class="mb-4">
              <label class="block mb-2" for="confirm-email">Confirm email</label>
              <input
                type="email"
                name="confirm-email"
                id="confirm-email"
                v-model="emailConfirmation"
                class="px-3 py-2 border border-gray-500 rounded w-64 dark:bg-gray-700 dark:text-gray-200"
              >
            </div>

            <div class="mb-4">
              <label class="block mb-2" for="confirm-password">Confirm password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                v-model="passwordConfirmation"
                class="px-3 py-2 border border-gray-500 rounded w-64 dark:bg-gray-700 dark:text-gray-200"
              >
            </div>

            <button
              type="submit"
              class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Delete Account
            </button>
          </form>
        </section>

        <div class="h-full bg-gray-500 w-[1px]" />
      </div>
    </div>
  </div>
</template>
