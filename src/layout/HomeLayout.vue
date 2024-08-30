<script setup>
  import { RouterView } from 'vue-router'
  import TopBar from '@/components/home/TopBar.vue'
  import MainFooter from '@/components/home/MainFooter.vue'
</script>

<template>
  <div class="layout">
    <TopBar />
    <div id="separator"></div>
    <RouterView />
    <MainFooter />
  </div>
</template>

<style scoped>
  .layout {
    flex-direction: column;
    place-items: center;
  }

  :deep(.page-inner) {
    max-width: var(--page-width);
    width: var(--page-width);
  }

  :deep(main a) {
    color: var(--color-text);
  }

  /*
   * Manual offset from the top for the sticky navbar.
   */
  #separator {
    margin-bottom: 99px;
  }

  :deep(main) {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    gap: 20px;
  }

  :deep(.main-style) {
    border-radius: 20px;
    background-color: var(--color-background-mute);
    box-shadow: -2px 3px 5px rgba(40, 40, 40, 0.2);
    overflow: hidden;
  }

  @media screen and (max-width: 1600px) {
    :deep(.main-style) {
      border-radius: 0;
    }
  }

  :deep(.primary-btn) {
    color: #f7f7f7;
    background: rgb(10, 228, 210);
    background: radial-gradient(circle, rgba(10, 228, 210, 1) 20%, rgb(7, 210, 218) 100%);
    font-size: 1.4rem;
    font-weight: bold;
    border-radius: 20px;
    border: none;
    padding: 12px 16px;
    margin: 20px 0;
    width: fit-content;
    text-decoration: none;
    display: block;
    box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
    transition: background 0.3s, box-shadow 0.3s, color 0.3s;
  }

  :deep(.secondary-btn) {
    width: fit-content;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: bold;
    border-radius: 25px;
    border: none;
    box-shadow: none;
    color: var(--active-color);
    display: block;
    outline: 1px solid var(--active-color);
    box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
    background: transparent;
    padding: 15px 20px;
    margin: 20px 0;
  }

  @media (hover: hover) {
    :deep(.primary-btn:hover) {
      background: transparent;
      box-shadow: none;
      color: var(--active-color);
      outline: 1px solid var(--active-color);
    }

    :deep(.secondary-btn:hover) {
      box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
      background-color: #5f7ee7;
      color: #f7f7f7;
      outline: 1px solid var(--active-color);
    }
  }
</style>