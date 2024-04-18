<script setup>
  // import NavAccessibility from './NavAccessibility.vue';
</script>

<template>
  <nav>
    <RouterLink class="nav-link" to="/" exact>Home</RouterLink>
    <RouterLink class="nav-link" :to="{ name: 'news', query: { page: 1 } }">News</RouterLink>
    <RouterLink class="nav-link" to="/resources">Resources</RouterLink>
    <RouterLink class="nav-link" to="/login">Log in</RouterLink>
    <RouterLink class="nav-link" to="/signup">Sign up</RouterLink>
    <!-- <NavAccessibility /> -->
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    place-content: center;
  }

  .nav-link {
    height: 100%;
    border: none;
    border-bottom: 5px solid rgb(133, 236, 250);
    font-size: 1.2em;
    padding: 0.7em 0.1em;
    flex: 1;
    background: #0091bd;
    background: linear-gradient(0deg, #0091bd 0%, #00b7bd 100%);
    color: #FBFBFB;
    text-align: center;
    text-decoration: none;
  }

  @media (hover: hover) {
    .nav-link:hover {
      background: #0091bd;
      color: #f9fdff;
    }
  }

  .router-link-exact-active {
    /* background: #017bac; */
    background: #0091bd;
    background: linear-gradient(0deg, #0040bd 0%, #0091bd 100%);
    color: #fdfeff;
  }
</style>