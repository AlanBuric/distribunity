<script lang="ts" setup>
  import ItemEditor from '@/components/work/ItemEditor.vue'
  import ItemTable from '@/components/work/ItemTable.vue'
  import Navbar from '../../components/work/WorkNavbar.vue'
  import InventoryTree from '@/components/work/InventoryTree.vue'
  import { reactive, ref } from 'vue'
  import Toolbar from '@/components/work/WorkToolbar.vue'
  import { findFirstLeafInTree } from '@/scripts/trees'
  import type { Inventory } from '@/types/types'

  const example = [
    {
      name: 'Home',
      inventories: [
        {
          name: 'Ground floor',
          inventories: [
            {
              name: 'Basement',
              items: []
            },
            {
              name: 'Garage',
              items: [
                {
                  id: 1,
                  name: 'Paper',
                  quantity: 100,
                  unit: 'sheets',
                  unitPrice: 0.01
                },
                {
                  id: 2,
                  name: 'Screw',
                  quantity: 200,
                  unit: 'pieces',
                  unitPrice: 0.15
                },
                {
                  id: 3,
                  name: 'Wrench',
                  quantity: 20,
                  unit: 'pieces',
                  unitPrice: 16
                },
                {
                  id: 4,
                  name: 'Hammer',
                  quantity: 35,
                  unit: 'pieces',
                  unitPrice: 25
                },
                {
                  id: 5,
                  name: 'Nails',
                  quantity: 500,
                  unit: 'pieces',
                  unitPrice: 0.02
                },
                {
                  id: 6,
                  name: 'Drill',
                  quantity: 15,
                  unit: 'pieces',
                  unitPrice: 120
                },
                {
                  id: 7,
                  name: 'Saw',
                  quantity: 10,
                  unit: 'pieces',
                  unitPrice: 45
                },
                {
                  id: 8,
                  name: 'Pliers',
                  quantity: 25,
                  unit: 'pieces',
                  unitPrice: 12
                },
                {
                  id: 9,
                  name: 'Safety Goggles',
                  quantity: 50,
                  unit: 'pieces',
                  unitPrice: 8
                },
                {
                  id: 10,
                  name: 'Tape Measure',
                  quantity: 40,
                  unit: 'pieces',
                  unitPrice: 5
                }
              ]
            },
            {
              name: 'Kitchen',
              inventories: [
                {
                  name: 'Pantry',
                  items: [
                    {
                      id: 11,
                      name: 'Tomato',
                      quantity: 3,
                      unit: '',
                      unitPrice: 0.2
                    }
                  ]
                }
              ]
            }
          ]
        },
        { name: 'First floor', inventories: [] }
      ]
    },
    {
      name: 'Summer House',
      inventories: [
        {
          name: 'Ground floor',
          items: [
            {
              name: 'Kitchen',
              items: []
            }
          ]
        },
        {
          name: 'First floor',
          items: []
        }
      ]
    }
  ]

  const NEW_ITEM = { name: 'New item', quantity: 0, unit: 'pieces', unitPrice: 1 }

  const selectedInventory = reactive({ name: '', items: [] })
  const selectedItem = ref({ ...(selectedInventory.value?.items[0] ?? NEW_ITEM) })
  const isSelectedItemModified = ref(false)

  const selectInventory = (inventory: Inventory) => {
    Object.assign(selectedInventory, inventory)
  }

  selectInventory(findFirstLeafInTree(example, (inventory: Inventory) => inventory.inventories))

  const newItem = () => {
    if (selectedItem.value?.modified) {
      alert(
        'You have unsaved changes. Please save or discard the current item being edited before creating a new item.'
      )
    } else {
      selectedItem.value = { ...NEW_ITEM }
    }
  }

  const addQuantity = (quantity: string) => {
    return (selectedItem.value.quantity = Math.max(
      0,
      selectedItem.value.quantity + parseInt(quantity)
    ))
  }
</script>

<template>
  <div class="layout">
    <!--draggable="true"-->
    <aside id="other" class="resizeable">
      <Navbar id="navbar" />
      <h2>Inventories</h2>
      <hr>
      <InventoryTree
        :inventories="example" :selected-inventory="selectedInventory"
        @select-inventory="selectInventory"
      />
    </aside>
    <div id="content">
      <Toolbar id="toolbar" @new-item="newItem" />
      <div id="content-2">
        <ItemTable id="inventory" :inventory="selectedInventory" />
        <ItemEditor id="editor" :selected-item="selectedItem" @add-quantity="addQuantity" />
      </div>
    </div>
  </div>
</template>

<style>

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
  }

  #content-2 {
    display: flex;
    gap: 10px;
    margin: 0px 10px;
    flex: 1;
  }

  #content-2 > * {
    padding: 10px;
    flex: 1;
  }

  /*#app > * {
        padding: 10px;
        box-shadow: -2px 2px 4px rgba(10, 10, 10, 0.5);
    }*/

  #toolbar,
  #inventory,
  #editor {
    border: 1px solid #c4c4c4;
    background: #f1f1f1;
  }

  #other {
    padding: 20px;
    background: #1e1e20;
    color: #ddd;
    max-width: 40%;
    height: 100%;
  }

  #other h2 {
    margin-top: 0;
  }

  #editor {
    border-radius: 12px 12px 0px 0px;
  }

  #inventory {
    border-radius: 12px 12px 0px 0px;
  }
</style>
