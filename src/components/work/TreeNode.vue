<script lang="ts" setup>
  import type { Folder, Inventory } from '@/types/types';
  import { inject } from 'vue';

  defineProps<{ folder: Folder }>();
  const emit = defineEmits(['selectInventory']);

  const selectedInventory = inject<Inventory>('selectedInventory');

  function handleInventoryClick(mouseEvent: MouseEvent, inventory: Inventory) {
    emit('selectInventory', inventory);
  }

  function isSelected(inventory: Inventory) {
    return selectedInventory?.name === inventory.name;
  }
</script>

<template>
  <ul>
    <li v-for="(subfolder, index) in folder.folders" :key="index">
      <details open>
        <summary>{{ subfolder.name }}</summary>
        <TreeNode :folder="subfolder" @select-inventory="(payload) => $emit('selectInventory', payload)" />
      </details>
    </li>
    <li
      v-for="(inventory, index) in folder.inventories" :key="index" :class="{ underline: isSelected(inventory) }"
      class="clickable"
      @click="(mouseEvent) => handleInventoryClick(mouseEvent, inventory)"
    >
      {{ inventory.name }}
    </li>
  </ul>
</template>
