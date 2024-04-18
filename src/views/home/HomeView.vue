<script setup>
  import HomeIntro from '@/components/home/home/HomeIntro.vue';
  import ComingSoon from '@/components/home/home/ComingSoon.vue';
  import SolutionInfo from '@/components/home/home/SolutionInfo.vue';
  import FAQOffer from '@/components/home/home/FAQOffer.vue';
</script>

<template>
  <HomeIntro></HomeIntro>
  <hr>
  <SolutionInfo></SolutionInfo>
  <hr>
  <ComingSoon></ComingSoon>
  <hr>
  <FAQOffer></FAQOffer>
</template>

<style scoped>
  hr {
    border: 2px solid #CCC;
  }
</style>