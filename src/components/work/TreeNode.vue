<script lang="ts" setup>
  const props = defineProps(['inventories', 'selectedInventory'])
  const emit = defineEmits(['selectInventory'])

  const isLeaf = (inventory) => inventory.inventories == null
  const bubbleEvent = (name, ...payload) => emit(name, ...payload)

  function handleInventoryClick(mouseEvent, inventory) {
    emit('selectInventory', inventory)
  }

  function isSelected(inventory) {
    return props.selectedInventory.name === inventory.name
  }
</script>

<template>
  <ul>
    <template v-for="(inventory, index) in props.inventories" :key="index">
      <li v-if="!isLeaf(inventory)">
        <details open>
          <summary>{{ inventory.name }}</summary>
          <TreeNode
:inventories="inventory.inventories" :selected-inventory="selectedInventory"
            @select-inventory="(payload) => bubbleEvent('selectInventory', payload)" />
        </details>
      </li>
      <li
v-else :class="{ underlined: isSelected(inventory) }" class="clickable"
        @click="(mouseEvent) => handleInventoryClick(mouseEvent, inventory)">
        {{ inventory.name }}
      </li>
    </template>
  </ul>
</template>
