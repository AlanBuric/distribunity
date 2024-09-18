<script lang="ts" setup> import { getItemColumnValue } from '@/scripts/items';
  import { getPrettyEnumName } from '@/scripts/shared';
  import { ColumnType, type Item, type WithId } from '@/types';
  import { CollectionReference } from 'firebase/firestore';
  import { useCollection } from 'vuefire';

  defineEmits<{ editItem: [item: Item & WithId], deleteItem: [item: Item & WithId], selectItem: [item: Item & WithId], createNewItem: [] }>();
  const props = defineProps<{
    itemsReference: CollectionReference
    selectedItemId: string | undefined
  }>();
  const columns = [ColumnType.ICON_URL, ColumnType.NAME, ColumnType.UNIT, ColumnType.QUANTITY, ColumnType.UNIT_PRICE, ColumnType.TOTAL_PRICE].map(enumName => ({
    enumName: enumName,
    name: getPrettyEnumName(enumName),
  }));

  const items = useCollection<Item>(props.itemsReference);
</script>

<template>
  <table class="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th
          v-for="(columnName, index) in columns" :key="index" class="cursor-pointer px-3 py-2"
          scope="col"
        >
          {{ columnName.name }}
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="items.length > 0">
        <tr
          v-for="(item, index) in items" :key="item.id"
          @click="$emit('selectItem', item)"
          :class="{
            'hover:bg-gray-50 dark:hover:bg-gray-600': true, 'border-b dark:border-gray-700': index < items.length - 1,
            'bg-white dark:bg-gray-800': item.id != selectedItemId,
            'bg-gray-50 dark:bg-gray-600': item.id == selectedItemId
          }"
        >
          <td v-for="column in columns" :key="column.enumName" class="px-3 py-2">
            <img v-if="column.enumName == ColumnType.ICON_URL" :src="getItemColumnValue(item, column.enumName)" class="shadow-md border-gray-300 rounded-md">
            <span v-else>{{ getItemColumnValue(item, column.enumName) }}</span>
          </td>
          <td class="px-3 py-2 space-x-1">
            <button @click.prevent.stop="$emit('deleteItem', item)">
              🗑️
            </button>
            <button @click.prevent.stop="$emit('editItem', item)">
              ✏️
            </button>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="6" class="px-3 py-2 bg-white dark:bg-gray-800 text-center">
          Your inventory is empty.
          <button class="underline" @click.prevent="$emit('createNewItem')">
            Consider adding some items
          </button>.
        </td>
      </tr>
    </tbody>
  </table>
</template>
