<script lang="ts" setup>
  import { ref } from 'vue'

  const props = defineProps(['items'])
  const emit = defineEmits(['itemSelected'])

  const isOpen = ref(false)
  const selected = ref(null)

  function toggleDropdown() {
    isOpen.value = !isOpen.value
  }

  function handleClick(item) {
    if (item.type === 'button') {
      item.props.onClick()
    } else {
      selected.value = item
    }

    isOpen.value = false

    emit('item-selected', item)
  }
</script>

<template>
  <div class="dropdown" @click="toggleDropdown">
    <button class="dropdown-button">
      {{ selected || 'Select an option' }}
    </button>
    <div v-if="isOpen" class="dropdown-content">
      <ul>
        <li v-for="(item, index) in props.items" :key="index" @click="handleClick(item)">
          <component :is="item.type" v-bind="item.props">
            {{ item.label }}
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .dropdown-content li {
    padding: 12px 16px;
    cursor: pointer;
  }

  .dropdown-content li:hover {
    background-color: #ddd;
  }
</style>
