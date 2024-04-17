<script setup>
  import HomeIntro from '@/components/home/home/HomeIntro.vue';
  import ComingSoon from '@/components/home/home/ComingSoon.vue';
  import SolutionInfo from '@/components/home/home/SolutionInfo.vue';
  import FAQOffer from '@/components/home/home/FAQOffer.vue';
  // import HomeItem from '@/components/main/HomeItem.vue';
  // import PanelButton from '@/components/main/PanelButton.vue';
</script>

<template>
  <HomeIntro />
  <hr>
  <SolutionInfo></SolutionInfo>
  <hr>
  <ComingSoon />
  <hr>
  <FAQOffer />
</template>

<style scoped>
  hr {
    border: 2px solid #CCC;
  }
</style>