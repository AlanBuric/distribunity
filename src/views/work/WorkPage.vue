<script lang="ts" setup>
  import ItemEditor from '@/components/work/ItemEditor.vue';
  import ItemTable from '@/components/work/ItemTable.vue';
  import WorkNavbar from '../../components/work/WorkNavbar.vue';
  import InventoryTree from '@/components/work/FolderTree.vue';
  import { provide, ref } from 'vue';
  import Toolbar from '@/components/work/WorkToolbar.vue';
  import { findFirstInventory } from '@/scripts/items';
  import type { CountableItem, ExistingItem, Folder, Inventory } from '@/types/types';

  const exampleFolders: Folder[] = [
    {
      name: 'Home',
      inventories: [],
      folders: [
        {
          name: 'Ground floor',
          folders: [
            {
              name: 'Kitchen',
              folders: [],
              inventories: [
                {
                  name: 'Pantry',
                  items: [
                    {
                      id: '11',
                      name: 'Tomato',
                      quantity: 3,
                      unit: '',
                      unitPrice: 0.2,
                      attributes: [],
                    },
                  ],
                },
              ],
            },
          ],
          inventories: [
            {
              name: 'Basement',
              items: [],
            },
            {
              name: 'Garage',
              items: [
                {
                  id: '1',
                  name: 'Paper',
                  quantity: 100,
                  unit: 'sheets',
                  unitPrice: 0.01,
                  attributes: [],
                },
                {
                  id: '2',
                  name: 'Screw',
                  quantity: 200,
                  unit: 'pieces',
                  unitPrice: 0.15,
                  attributes: [],
                },
                {
                  id: '3',
                  name: 'Wrench',
                  quantity: 20,
                  unit: 'pieces',
                  unitPrice: 16,
                  attributes: [],
                },
                {
                  id: '4',
                  name: 'Hammer',
                  quantity: 35,
                  unit: 'pieces',
                  unitPrice: 25,
                  attributes: [],
                },
                {
                  id: '5',
                  name: 'Nails',
                  quantity: 500,
                  unit: 'pieces',
                  unitPrice: 0.02,
                  attributes: [],
                },
                {
                  id: '6',
                  name: 'Drill',
                  quantity: 15,
                  unit: 'pieces',
                  unitPrice: 120,
                  attributes: [],
                },
                {
                  id: '7',
                  name: 'Saw',
                  quantity: 10,
                  unit: 'pieces',
                  unitPrice: 45,
                  attributes: [],
                },
                {
                  id: '8',
                  name: 'Pliers',
                  quantity: 25,
                  unit: 'pieces',
                  unitPrice: 12,
                  attributes: [],
                },
                {
                  id: '9',
                  name: 'Safety Goggles',
                  quantity: 50,
                  unit: 'pieces',
                  unitPrice: 8,
                  attributes: [],
                },
                {
                  id: '10',
                  name: 'Tape Measure',
                  quantity: 40,
                  unit: 'pieces',
                  unitPrice: 5,
                  attributes: [],
                },
              ],
            },
          ],
        },
        {
          name: 'First floor',
          inventories: [],
          folders: [],
        },
      ],
    },
    {
      name: 'Summer House',
      folders: [
        {
          name: 'Ground floor',
          folders: [],
          inventories: [
            {
              name: 'Kitchen',
              items: [],
            },
          ],
        },
      ],
      inventories: [
        {
          name: 'First floor',
          items: [],
        }],
    },
  ];

  const NEW_ITEM: CountableItem = { name: 'New item', quantity: 0, unit: 'pieces', unitPrice: 1, attributes: [] };

  const selectedInventory = ref<Inventory | undefined>();
  const selectedItem = ref<ExistingItem | undefined>();
  const isSelectedItemModified = ref(false);

  function selectInventory(inventory: Inventory | undefined) {
    selectedInventory.value = inventory;
  }

  selectInventory(findFirstInventory(exampleFolders));

  function newItem() {
    if (selectedItem.value) {
      alert(
        'You have unsaved changes. Please save or discard the current item being edited before creating a new item.',
      );
    } else {
      selectedItem.value = { id: '1', ...NEW_ITEM };
    }
  }

  const addQuantity = (quantity: string) => {
    const input = parseInt(quantity) || 0;

    return (selectedItem.value!.quantity = Math.max(
      0,
      selectedItem.value!.quantity + input,
    ));
  };

  provide('inventories', exampleFolders);
  provide('selectedInventory', selectedInventory);
</script>

<template>
  <div class="layout">
    <aside class="resizeable">
      <WorkNavbar id="navbar" />
      <h2 class="mt-1">
        Explorer
      </h2>
      <hr class="my-3">
      <InventoryTree :folders="exampleFolders" @select-inventory="selectInventory" />
    </aside>
    <div id="content">
      <Toolbar id="toolbar" @new-item="newItem" />
      <div id="content-2">
        <main class="flex-2 bg-white dark:bg-gray-800 w-full rounded-lg">
          <ItemTable v-if="selectedInventory" id="inventory" :inventory="selectedInventory" />
          <p v-else>
            This inventory is currently empty.<br><a href="">Add a new item.</a>
          </p>
        </main>
        <ItemEditor
          v-if="selectedItem" id="editor" :selected-item="selectedItem"
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
  .layout {
    flex-direction: row;
  }

  #content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;
    flex: 6;
  }

  #content-2 {
    display: flex;
    gap: 10px;
    margin: 0px 10px;
    flex: 1;
  }

  #toolbar,
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
    height: 100%;
    flex: 1;
  }

  #editor {
    padding: 10px;
    flex: 1;
  }

  #inventory {
    flex: 2;
  }
</style>
