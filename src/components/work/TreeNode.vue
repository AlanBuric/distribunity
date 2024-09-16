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
    console.log(selectedInventory?.name, inventory.name);
    return selectedInventory?.name == inventory.name;
  }

  function deleteInventory(index: number) {

  }
</script>

<template>
  <ul>
    <li v-for="(subfolder, index) in folder.folders" :key="index">
      <details open title="Click to open or collapse">
        <summary class="flex justify-between">
          <span>{{ subfolder.name }}</span>
          <div class="inline-block">
            <button title="Create new folder">
              ➕
            </button>
            <button title="Delete this inventory">
              🗑️
            </button>
          </div>
        </summary>
        <TreeNode :folder="subfolder" @select-inventory="(payload) => $emit('selectInventory', payload)" />
      </details>
    </li>
    <li v-for="(inventory, index) in folder.inventories" :key="index" class="flex justify-between">
      <span
        @click="(mouseEvent) => handleInventoryClick(mouseEvent, inventory)" :class="{ underline: isSelected(inventory), 'hover:underline': true }"
        class="cursor-pointer"
      >{{ inventory.name }}</span>
      <button title="Delete inventory">
        🗑️
      </button>
    </li>
  </ul>
</template>
