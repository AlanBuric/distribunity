<script setup>
  import { RouterView } from 'vue-router'
  import TopBar from '@/components/home/TopBar.vue'
  import MainFooter from '@/components/home/MainFooter.vue'
</script>

<template>
  <TopBar />
  <main class="page-inner">
    <RouterView />
  </main>
  <MainFooter />
</template>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: var(--color-background-soft);
  }

  .home-btn {
    border: 1px solid #03afbe;
    color: #FCFCFC;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 25px;
    background: #0ae4d2;
    padding: 15px 20px;
    margin: 20px 0;
    width: fit-content;
    text-decoration: none;
    display: block;
  }

  @media (hover: hover) {
    .home-btn:hover {
      background: #09d8c7;
      box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
      transition: 0.2s;
    }
  }
</style>