<template>
  <nav class="flex items-center space-x-3">
    <RouterLink
      to="/"
      class="text-lg text-gray-400 hover:text-active-link"
    >
      Home
    </RouterLink>
    <RouterLink
      to="/resources"
      class="text-lg text-gray-400 hover:text-active-link"
    >
      Help
    </RouterLink>
    <RouterLink
      id="profile-btn"
      to="/settings"
      class="text-lg text-gray-400 hover:text-active-link"
    >
      Profile
      <!--<Logo width="2.5rem" />-->
    </RouterLink>
  </nav>
</template>

<style scoped>
  #profile-btn > svg {
    border-radius: 100%;
    box-shadow: -2px 2px 4px rgba(10, 10, 10, 0.5);
    transition:
      box-shadow 0.1s,
      outline 0.1s;
  }

  #profile-btn > svg:hover {
    outline: 1px solid gray;
  }
</style>
