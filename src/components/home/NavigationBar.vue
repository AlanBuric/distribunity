<script setup>
  import { navigate } from '@/shared';
  import NavAccessibility from './NavAccessibility.vue';
</script>

<template>
  <nav>
    <button @click="navigate('/')" :class="{ active: $route.path === '/' }">Home</button>
    <button @click="navigate('/news/1')" :class="{ active: $route.path === '/news' }">News</button>
    <button @click="navigate('/resources')" :class="{ active: $route.path === '/resources' }">Resources</button>
    <button @click="navigate('/login')" :class="{ active: $route.path === '/login' }">Log in</button>
    <button @click="navigate('/signup')" :class="{ active: $route.path === '/signup' }">Sign up</button>
    <!-- <select @v-model="locale" name="locale" id="locale-sel">
      <option value={{locale}}>{{ localeDisplay }}</option>
      <option value="hr">Hrvatski (HR)</option>
    </select> -->
    <!-- <button id="btn-theme">Theme</button> -->
    <NavAccessibility />
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    place-content: center;
  }

  nav button {
    height: 100%;
    border: none;
    border-bottom: 5px solid rgb(133, 236, 250);
    font-size: 1.2em;
    padding: 0.7em 0.1em;
    flex: 1;
  }

  nav button {
    background: #0091bd;
    background: linear-gradient(0deg, #0091bd 0%, #00b7bd 100%);
    color: #FBFBFB;
  }

  @media (hover: hover) {
    button:hover {
      background: #0091bd;
      color: #f9fdff;
    }
  }

  .active {
    /* background: #017bac; */
    background: #0091bd;
    background: linear-gradient(0deg, #0040bd 0%, #0091bd 100%);
    color: #fdfeff;
  }
</style>