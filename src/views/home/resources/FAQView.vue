<script setup>
  import { reactive, ref } from 'vue';

  const content = [
    {
      question: 'What is Distribunity?', answer: `<p class="hidden">Distribunity is a <a href="https://en.wikipedia.org/wiki/Inventory_management_software"
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
      </ul>`},
    { question: 'Is Distribunity paid for?', answer: '<p class="hidden">Unfortunately for us, no. However, please do consider leaving a donation on our PayPal to keep this open-source and free software going.</p>' }
  ];

  const visible = Array.from({ length: content.length }, () => ref(false));

  function toggleAccordion(index) {
    visible[index].value = !visible[index].value;
  }

  // onMounted(() => {
  //   let acc = document.getElementsByClassName("accordion");

  //   for (let i = 0; i < acc.length; i++) {
  //     acc[i].addEventListener("click", function () {
  //       this.classList.toggle("active");

  //       let panel = this.nextElementSibling;
  //       if (panel.style.display === "block") {
  //         panel.style.display = "none";
  //       } else {
  //         panel.style.display = "block";
  //       }
  //     });
  //   }
  // });
</script>

<template>
  <main class="page-inner main-style">
    <article>
      <h2>FAQ</h2>
      <section v-for="(item, index) in content" :key="index">
        <button class="accordion" @click="toggleAccordion(index)">
          <h3><span class="arrow">❯</span> {{ item.question }}</h3>
        </button>
        <div v-if="visible[index]" v-html="item.answer"></div>
      </section>
      <!-- <section>
      <button class="accordion">
        <h3><span class="arrow">❯</span> What is Distribunity?</h3>
      </button>
      <p class="hidden">Distribunity is a <a href="https://en.wikipedia.org/wiki/Inventory_management_software"
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
      </ul>
    </section>
    <section>
      <button class="accordion">
        <h3><span class="arrow">❯</span> Is Distribunity paid for?</h3>
      </button>
      <p class="hidden"></p>
    </section> -->

      <h2>Still having trouble?</h2>
      <button class="home-btn" onclick="window.open('mailto:aburic1@unipu.student.hr');" style="margin-left: 0px;">
        Contact us
      </button>
    </article>
  </main>
</template>

<style scoped>
  main {
    background-color: white;
    padding: 30px;
  }

  h3 {
    font-weight: bold;
    max-width: calc(var(--page-width) / 2);
    font-size: 1.6em;
  }

  .arrow {
    user-select: none;
  }

  .dropdown {
    writing-mode: vertical-lr;
  }

  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    padding: 0px 15px;
  }

  .active,
  .accordion:hover {
    background-color: #ccc;
  }

  .hidden {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }
</style>