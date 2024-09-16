<script lang="ts" setup> import { getItemColumnValue } from '@/scripts/items';
  import { getPrettyEnumName } from '@/scripts/shared';
  import { ColumnType, type Inventory } from '@/types/types';
  import { ref } from 'vue';

  const props = defineProps<{
    inventory: Inventory
  }>();
  const columns = [ColumnType.NAME, ColumnType.UNIT, ColumnType.QUANTITY, ColumnType.UNIT_PRICE, ColumnType.TOTAL_PRICE, ColumnType.ATTRIBUTES].map(enumName => ({
    enumName: enumName,
    name: getPrettyEnumName(enumName),
  }));
  const activeRow = ref(props.inventory?.items[0]?.id);

  // const sortBy = (propertyKey) => props.inventory.items.sort((item) => item[propertyKey]);
  const setActiveRow = (id: string) => (activeRow.value = id);
</script>

<template>
  <table class="table-auto rounded-lg">
    <tr>
      <th v-for="(columnName, index) in columns" :key="index" class="cursor-pointer">
        {{ columnName.name }}
      </th>
    </tr>
    <template v-if="inventory.items.length > 0">
      <tr
        v-for="item in inventory.items" :key="item.id" :class="{ 'active-item-row': item.id == activeRow }"
        @click="setActiveRow(item.id)"
      >
        <td v-for="column in columns" :key="column.enumName">
          {{ getItemColumnValue(item, column.enumName) }}
        </td>
      </tr>
    </template>
    <tr v-else>
      <td colspan="6">
        Your inventory is empty. Consider adding some items.
      </td>
    </tr>
  </table>
</template>

<style scoped>
  th {
    border-bottom: 1px solid rgb(165, 165, 165);
  }

  table {
    width: 100%;
    background-color: #f5f5f5;
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

  .active-item-row {
    background-color: rgb(161, 255, 216) !important;
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
