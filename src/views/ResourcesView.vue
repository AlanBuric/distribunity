<script setup>
  // import { navigate } from '@/shared';
  import PanelButton from '@/components/main/PanelButton.vue';
</script>

<template>
  <div id="resources">
    <h1>FAQ</h1>
    <h2>Still having trouble?</h2>
    <PanelButton onclick="window.open('mailto:aburic1@unipu.student.hr');" style="margin-left: 0px;">
      Contact us
    </PanelButton>
  </div>
</template>

<style scoped>
  #resources {
    margin: 30px;
  }
</style>