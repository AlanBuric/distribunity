<script setup>
  import SupplendLogo from '../icons/SupplendLogo.vue'
</script>

<template>
  <header>
    <SupplendLogo width="100px" />
    <div id="title-block">
      <h1 id="title">Supplend</h1>
      <h4 id="title-quote">Inventory management done right.</h4>
    </div>
  </header>
</template>

<style scoped>

  /* #title-pair > * {
    margin: 5px;
  }

  #title {
    color: var(--title-color);
  } */
  header,
  #title-block {
    display: flex;
    place-content: center;
    padding: 10px;
  }

  header {
    flex-wrap: wrap;
  }

  #title-block {
    flex-direction: column;
  }

  #title {
    font-weight: bold;
    font-size: 3em;
    font-family: Pattaya, sans-serif;
  }

  #title-block > * {
    user-select: none;
  }
</style>