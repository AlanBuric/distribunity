<template>
  <nav>
    <button
      class="link-like"
      @click="$emit('newItem')"
    >
      New
    </button>
    <form class="show-past-1200">
      <input
        name="search"
        placeholder="Search items..."
        type="search"
      >
      <input type="submit">
    </form>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    padding: 10px;
    gap: 10px;
    align-items: center;
  }
</style>
