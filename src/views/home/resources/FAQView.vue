<script setup>
  // import { navigate } from '@/shared';
  import PanelButton from '@/components/home/PanelButton.vue';
</script>

<template>
  <div id="resources">
    <h2>FAQ</h2>
    <div>
      <h3><i class="arrow right"></i> What is Supplend?</h3>
      <p>Supplend is a <a href="https://en.wikipedia.org/wiki/Inventory_management_software" target="_blank">inventory management
          software</a>
        web application intended for inventory administrators and their employees, providing features such as tracking
        item
        counts, orders and sales of a real life inventory, statistics, update history, other format imports and exports
        etc.</p>
    </div>
    <div>
      <h3><i class="arrow right"></i> Is Supplend paid for?</h3>
      <p></p>
    </div>
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

  #resources div h3 {
    font-weight: bold;
    border: 1px solid gray;
    max-width: calc(var(--page-width) / 2);
  }

  .arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
</style>