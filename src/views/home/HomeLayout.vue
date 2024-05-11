<script setup>
  import { RouterView } from 'vue-router'
  import TopBar from '@/components/home/TopBar.vue'
  import MainFooter from '@/components/home/MainFooter.vue'
</script>

<template>
  <TopBar />
  <RouterView />
  <MainFooter />
</template>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .main-style {
    border-radius: 20px;
    background-color: var(--color-background);
    box-shadow: -2px 3px 5px rgba(40, 40, 40, 0.2);
    overflow: hidden;
  }

  .main-style > *:first-child {
    margin-top: 0;
  }

  .main-style > *:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1600px) {
    .main-style {
      border-radius: 0;
    }
  }

  .primary-btn {
    color: #f7f7f7;
    background: #0ae4d2;
    font-size: 1.4rem;
    font-weight: bold;
    border-radius: 25px;
    border: none;
    padding: 12px 16px;
    margin: 20px 0;
    width: fit-content;
    text-decoration: none;
    display: block;
    box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
    transition: background 0.3s, box-shadow 0.3s, color 0.3s;
  }

  .secondary-btn {
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
    background: transparent;
    padding: 15px 20px;
    margin: 20px 0;
  }

  @media (hover: hover) {
    .primary-btn:hover {
      background: transparent;
      box-shadow: none;
      color: var(--active-color);
      outline: 1px solid var(--active-color);
    }
  }
</style>