<script lang="ts" setup>
  const props = defineProps(['selectedItem'])
</script>

<template>
  <aside>
    <form>
      <h2>{{ props.selectedItem.name }}</h2>

      <!-- <input v-model.number="props.selectedItem.quantity" type="number" required="true" /> -->

      <button @click="$emit('saveItem')">
        Save
      </button>
      <button @click="$emit('discardChanges')">
        Discard changes
      </button>
      <button @click="$emit('deleteItem')">
        Delete
      </button>
    </form>
    <!-- <button @click="items.splice(index, 1)">❌</button>-->
  </aside>
</template>
