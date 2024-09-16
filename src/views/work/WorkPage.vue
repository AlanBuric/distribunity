<script lang="ts" setup>
  import ItemEditor from '@/components/work/ItemEditor.vue';
  import ItemTable from '@/components/work/ItemTable.vue';
  import WorkNavbar from '../../components/work/WorkNavbar.vue';
  import InventoryTree from '@/components/work/FolderTree.vue';
  import { computed, provide, ref } from 'vue';
  import Toolbar from '@/components/work/WorkToolbar.vue';
  import { findFirstInventory } from '@/scripts/items';
  import type { CountableItem, ExistingItem, Folder, Inventory } from '@/types/types';
  import { useDocument } from 'vuefire';
  import { doc } from 'firebase/firestore';
  import { database } from '@/firebase/init';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const organization = useDocument(doc(database, 'organizations', route.params.id as string), { maxRefDepth: 0 });
  const folders = computed(() => organization.value?.folders);

  const selectedInventory = ref<Inventory>();
  const selectedItem = ref<ExistingItem>();
  const newItem = ref<CountableItem>();

  function selectInventory(inventory: Inventory | undefined) {
    selectedInventory.value = inventory;
  }

  selectInventory(findFirstInventory([]));

  function createNewItem() {
    if (selectedItem.value) {
      alert(
        'You have unsaved changes. Please save or discard the current item being edited before creating a new item.',
      );
    } else {
      newItem.value = {
        name: 'New item',
        quantity: 0,
        unit: 'pieces',
        unitPrice: 1,
        attributes: [],
      };
    }
  }

  const addQuantity = (quantity: string) => {
    const input = parseInt(quantity) || 0;

    return (selectedItem.value!.quantity = Math.max(
      0,
      selectedItem.value!.quantity + input,
    ));
  };

  provide('inventories', []);
  provide('selectedInventory', selectedInventory);
</script>

<template>
  <div class="h-full flex flex-row items-stretch">
    <aside class="resizeable">
      <WorkNavbar id="navbar" />
      <h2 class="mt-1 text-xl">
        Organization inventory explorer
      </h2>
      <hr class="my-3">
      <InventoryTree
        v-if="folders" :folders="folders" :organization-name="organization!.name"
        @select-inventory="selectInventory"
      />
      <p v-else class="text-center text-red-500">
        Could not load your organization's folders.
      </p>
    </aside>
    <div class="flex flex-col flex-1 items-stretch">
      <Toolbar @new-item="createNewItem" class="flex-initial" />
      <div class="flex flex-1 space-x-3 mx-2 mt-2">
        <main class="flex-2 bg-white dark:bg-gray-800 w-full rounded-t-lg">
          <ItemTable v-if="selectedInventory" id="inventory" :inventory="selectedInventory" />
          <p v-else class="text-gray-400 text-center m-4">
            This inventory is currently empty.<br>
            <button>Add a new item.</button>
          </p>
        </main>
        <ItemEditor
          v-if="selectedItem" class="p-2 flex-1" :selected-item="selectedItem"
          @add-quantity="addQuantity"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  /*.resizeable {
        cursor: e-resize;
        resize: horizontal;
    }*/
  #inventory,
  #editor {
    border: 1px solid #c4c4c4;
    background: #f1f1f1;
  }

  aside {
    padding: 5px 10px;
    background: #1e1e20;
    color: #ddd;
    max-width: 40%;
  }
</style>
