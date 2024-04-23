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

  @media screen and (max-width: 1600px) {
    .main-style {
      border-radius: 0;
    }
  }

  .home-btn {
    color: #f7f7f7;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 25px;
    border: none;
    background: #0ae4d2;
    padding: 15px 20px;
    margin: 20px 0;
    width: fit-content;
    text-decoration: none;
    display: block;
    box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
    transition: background 0.3s, box-shadow 0.3s, color 0.3s;
  }

  @media (hover: hover) {
    .home-btn:hover {
      background: transparent;
      box-shadow: none;
      /* color: var(--color-text);
    border-color: var(--color-text); */
      color: #1692be;
      outline: 2px solid #1692be;
    }
  }
</style>