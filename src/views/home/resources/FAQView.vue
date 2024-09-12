<script lang="ts" setup>
  import { ref } from 'vue';

  const content = [
    {
      question: 'What is Distribunity?',
      answer: `<p>Distribunity is a <a href="https://en.wikipedia.org/wiki/Inventory_management_software"
          target="_blank">inventory management
          software</a> and digital <a href="https://en.wikipedia.org/wiki/Information_system"
          target="_blank">information system</a> web application intended for inventory administrators and their
        employees, providing features such as tracking
        item counts, orders and sales of a real life inventory, statistics, update history, other format imports and
        exports etc.
        Its main features are:
      </p>
      <ul>
        <li><b>role administration:</b> a main administrator of the business can invite other employees and grant them
          limited and scoped permissions, which provides an excellent way of keeping the system secure</li>
        <li><b>multiple inventories:</b> a business may have multiple locations where inventory is stored, and user
          permissions can also be restricted to each of these</li>
        <li><b></b></li>
      </ul>`,
    },
    {
      question: 'Is Distribunity paid for?',
      answer:
        '<p>Unfortunately for us, no. However, please do consider leaving a donation on our PayPal to keep this open-source and free software going.</p>',
    },
  ];

  const visible = ref(Array.from({ length: content.length }, () => false));

  function toggleAccordion(index: number) {
    visible.value[index] = !visible.value[index];
  }
</script>

<template>
  <main class="max-w-screen-2xl w-full mx-auto p-8 flex flex-col items-center bg-gray-200 dark:bg-gray-800 rounded-lg">
    <article>
      <h2 class="text-xl font-thin text-gray-900 dark:text-gray-100 mb-2">
        Frequently Asked Questions
      </h2>
      <section v-for="(item, index) in content" :key="index" class="expand-container">
        <button class="accordion" @click="toggleAccordion(index)">
          <h3 class="text-lg font-thin text-gray-900 dark:text-gray-100 mb-2">
            <span :class="{ arrow: true, open: visible[index] }">❯</span> {{ item.question }}
          </h3>
        </button>
        <div :class="{ 'expand-contract': true, expanded: visible[index], 'text-gray-800 dark:text-gray-200 mb-2': true }" v-html="item.answer" />
      </section>
      <h2 class="text-xl font-thin text-gray-900 dark:text-gray-100 mb-2">
        Still having trouble?
      </h2>
      <button class="fancy-button" onclick="window.open('mailto:aburic1@unipu.student.hr');" style="margin-left: 0px">
        Contact us
      </button>
    </article>
  </main>
</template>

<style scoped>
  section {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.27);
    border-radius: 10px;
    margin: 10px;
  }

  .arrow {
    user-select: none;
    transition: writing-mode 1s ease-out;
  }

  .open {
    writing-mode: vertical-rl;
  }

  .dropdown {
    writing-mode: vertical-lr;
  }

  .accordion {
    cursor: pointer;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 1s;
    padding: 0px 15px;
  }

  .accordion:hover {
    background-color: #ccc;
  }

  .expand-container {
    overflow: hidden;
  }

  .expand-contract {
    height: 0;
    transition: all 1s;
  }

  .expand-contract > * {
    margin: 0;
  }

  .expand-contract.expanded {
    height: auto;
    margin-top: 0;
  }

  .expand-contract.expanded > * {
    margin: 10px;
  }
</style>
