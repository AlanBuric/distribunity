<script lang="ts" setup>
  import { ref } from 'vue';
  import { auth } from '@/firebase/init';
  import MenuIcon from '../icons/MenuIcon.vue';
  import ThemeSwitch from '../ThemeSwitch.vue';
  import router from '@/router';

  const mobileMenuOpen = ref(false);

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }

  function logoutAndRefresh() {
    auth.signOut().finally(() => router.go(0));
  }
</script>

<template>
  <nav class="flex flex-1 items-center justify-between px-4 py-2 bg-transparent bg-white dark:bg-gray-800">
    <div class="flex items-center gap-3">
      <RouterLink
        class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
        to="/"
        exact
      >
        Home
      </RouterLink>
      <RouterLink
        class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
        :to="{ name: 'blog', query: { page: 1 } }"
      >
        Blog
      </RouterLink>
      <RouterLink
        class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
        to="/resources"
      >
        Resources
      </RouterLink>
    </div>

    <div class="flex items-center gap-3">
      <form class="show-past-1200 ml-2 relative">
        <input
          name="search"
          placeholder="Search..."
          type="search"
          class="bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 appearance-none dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 pl-10 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-active-link"
        >
        <input
          type="submit"
          value="Submit"
          class="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-2 py-1 ml-1"
        >
      </form>

      <template v-if="!auth.currentUser">
        <RouterLink
          class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
          to="/login"
        >
          Log in
        </RouterLink>
        <RouterLink
          class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
          to="/signup"
        >
          Sign up
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink
          class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
          to="/dashboard"
        >
          Dashboard
        </RouterLink>
        <button
          class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-active-link show-past-1200"
          @click.prevent="logoutAndRefresh()"
        >
          Sign out
        </button>
      </template>

      <ThemeSwitch />
      <button id="hidden-menu" @click="toggleMobileMenu" class="lg:hidden">
        <MenuIcon width="4em" height="4em" class="fill-gray-300" />
      </button>
    </div>

    <div v-if="mobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-sm">
      <RouterLink class="block text-lg py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-active-link dark:hover:text-active-link" to="/">
        Home
      </RouterLink>
      <RouterLink class="block text-lg py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-active-link" :to="{ name: 'blog', query: { page: 1 } }">
        Blog
      </RouterLink>
      <RouterLink class="block text-lg py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-active-link" to="/resources">
        Resources
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
  input[name=search] {
    background-image: url('/src/assets/search.svg');
    background-position: 5px 5px;
    background-repeat: no-repeat;
  }

  .router-link-exact-active {
    color: var(--active-link);
  }

  @media screen and (max-width: 1100px) {
    .show-past-1200 {
      display: none;
    }
  }
</style>
