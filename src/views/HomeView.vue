<script setup>
  import HomeIntro from '@/components/main/home/HomeIntro.vue';
  import ComingSoon from '@/components/main/home/ComingSoon.vue';
  import FAQOffer from '@/components/main/home/FAQOffer.vue';
  // import HomeItem from '@/components/main/HomeItem.vue';
  // import PanelButton from '@/components/main/PanelButton.vue';
</script>

<template>
  <HomeIntro />
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