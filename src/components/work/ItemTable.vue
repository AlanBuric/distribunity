<script lang="ts" setup>  import { ref } from 'vue'

  const props = defineProps(['inventory'])

  function calculateTotalItemPrice(item) {
    return parseFloat((item.unitPrice * item.quantity).toPrecision(12))
  }

  const activeRow = ref(props.inventory?.items[0])
  const columnNames = [
    { name: 'Item' },
    { quantity: 'Quantity' },
    { unit: 'Unit' },
    { unitPrice: 'Unit price' },
    { total: 'Total price', compute: calculateTotalItemPrice },
    { id: 'ID' }
  ]

  // const sortBy = (propertyKey) => props.inventory.items.sort((item) => item[propertyKey]);
  const setActiveRow = (id: string) => (activeRow.value = id)

  const getColumnValueForItem = (column, item) => {
    if (column.compute != null) {
      return column.compute(item)
    }

    return item[Object.keys(column)[0]]
  }
</script>

<template>
  <main>
    <table class="table-rounded">
      <tr v-if="props.inventory.items.length == 0">
        <td>This inventory is currently empty. Use the "New" button to create a new item!</td>
      </tr>
      <template v-else>
        <tr>
          <th
v-for="(columnName, index) in columnNames" :key="index" class="clickable"
            @click="sortBy(Object.keys(columnName)[0])">
            {{ Object.values(columnName)[0] }}
          </th>
        </tr>
        <tr
v-for="item in props.inventory.items" :id="item.id == activeRow ? 'active-item-row' : null" :key="item.id"
          @click="setActiveRow(item.id)">
          <td v-for="column in columnNames" :key="Object.keys(column)[0]">
            {{ getColumnValueForItem(column, item) }}
          </td>
        </tr>
      </template>
    </table>
  </main>
</template>

<style scoped>
  th {
    border-bottom: 1px solid rgb(165, 165, 165);
  }

  table {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 10px;
    /* This erases the excessive bottom border. */
    border-style: hidden;
    border-spacing: 0;
    overflow: hidden;
  }

  td {
    text-align: center;
  }

  td > button {
    border: none;
    background: none;
    font-weight: bold;
  }

  td,
  th {
    padding: 10px;
  }

  tr:nth-child(odd) {
    background-color: rgb(230, 230, 230);
  }

  #active-item-row {
    background: rgb(161, 255, 216);
  }

  .pointer.desc:after {
    content: '▲';
  }

  .pointer.asc:after {
    content: '▼';
  }

  desc:after {
    content: '▲';
  }

  .pointer.asc:after {
    content: '▼';
  }
</style>
