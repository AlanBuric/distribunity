<script setup>
  import HomeIntro from '@/components/home/home/HomeIntro.vue';
  import ComingSoon from '@/components/home/home/ComingSoon.vue';
  import SolutionInfo from '@/components/home/home/SolutionInfo.vue';
  import FAQOffer from '@/components/home/home/FAQOffer.vue';
  import NewsletterForm from '@/components/home/home/NewsletterForm.vue';
</script>

<template>
  <main class="page-inner">
    <HomeIntro class="main-style"></HomeIntro>
    <SolutionInfo class="main-style"></SolutionInfo>
    <ComingSoon class="main-style"></ComingSoon>
    <NewsletterForm class="main-style"></NewsletterForm>
    <FAQOffer class="main-style"></FAQOffer>
  </main>
</template>