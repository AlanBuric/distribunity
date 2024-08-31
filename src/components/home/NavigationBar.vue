<script lang="ts" setup>
  import { auth } from '@/firebase/init'
  import MenuIcon from '../icons/MenuIcon.vue'

  function signOut() {
    auth.signOut()
  }
</script>

<template>
  <nav>
    <RouterLink class="nav-link show-past-1200" to="/" exact>
      Home
    </RouterLink>
    <RouterLink class="nav-link show-past-1200" :to="{ name: 'blog', query: { page: 1 } }">
      Blog
    </RouterLink>
    <RouterLink class="nav-link show-past-1200" to="/resources">
      Resources
    </RouterLink>
    <template v-if="!auth.currentUser">
      <RouterLink class="nav-link show-past-1200" to="/login">
        Log in
      </RouterLink>
      <RouterLink class="nav-link show-past-1200" to="/signup">
        Sign up
      </RouterLink>
    </template>
    <template v-else>
      <RouterLink class="nav-link show-past-1200" to="/work">
        Work
      </RouterLink>
      <a href="" class="nav-link show-past-1200" @click.prevent="signOut">Sign out</a>
    </template>
    <div class="vr show-past-1200" />
    <form class="show-past-1200">
      <input name="search" placeholder="Search..." type="text">
      <input type="submit">
    </form>
    <button id="hidden-menu">
      <MenuIcon width="4em" height="4em" />
    </button>
  </nav>
</template>

<style scoped>
  #hidden-menu {
    display: none;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: auto;
  }

  nav > * {
    margin: 4px;
  }

  form {
    margin-left: 8px;
  }

  .vr {
    height: 60px;
    border-left: 1px solid #888;
  }

  .router-link-exact-active {
    color: var(--active-color);
  }

  @media screen and (max-width: 1000px) {
    #hidden-menu {
      display: initial;
      border: none;
      border-radius: 5px;
      background: none;
    }

    #hidden-menu:hover {
      background: #ddd;
    }

    .show-past-1200 {
      display: none;
    }
  }

  /* nav > *:not(:first-child) {
    padding-left: 1em;
  } */

  /* 
  .nav-link {
    border: none;
    font-size: 1.2em;
    padding: 0.7em 1vw;
    background: #0091bd;
    background: linear-gradient(0deg, #0091bd 0%, #00b7bd 100%);
    color: #FBFBFB;
    text-align: center;
    text-decoration: none;
  }

  .nav-link:focus {
    outline: 2px solid #0040bd;
  }

  @media (hover: hover) {
    .nav-link:hover {
      background: #0091bd;
      color: #f9fdff;
    }
  }

  .router-link-exact-active {
    background: #017bac;
    background: #0091bd;
    background: linear-gradient(0deg, #0040bd 0%, #0091bd 100%);
    color: #fdfeff;
  } */
</style>
