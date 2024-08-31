<script lang="ts" setup></script>

<template>
  <section>
    <div id="intro-overtext">
      <h2 style="font-size: 2.2rem; margin-top: 0">
        It's time do ditch the spreadsheets and pen & paper.
      </h2>
      <p style="font-size: 1.3rem">
        <b>Distribunity</b> takes care of all the inventory changes, details and item tracking in
        one place.
      </p>
      <RouterLink class="primary-btn" to="/signup" style="margin-top: 5em">
        Sign up for free
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
  section {
    background: center url('@/assets/inventory-background.webp');
  }

  #intro-overtext {
    background: linear-gradient(110deg, white 30%, rgba(255, 255, 255, 0.5) 80%, transparent);
    height: 100%;
    padding: 20px;
    max-width: 500px;
    backdrop-filter: blur(5px);
    /* box-shadow: 0px 0px 20px 2px rgba(255, 255, 255, 0.5); */
  }
</style>
