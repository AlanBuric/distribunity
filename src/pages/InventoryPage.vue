<script lang="ts" setup>
  import ItemEditor from '@/components/work/ItemEditor.vue';
  import ItemTable from '@/components/work/ItemTable.vue';
  import WorkNavigationBar from '@/components/work/WorkNavigationBar.vue';
  import { ref } from 'vue';
  import type { Item, Inventory, Organization, WithId } from '@/types';
  import { useCollection } from 'vuefire';
  import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
  import { database } from '@/firebase/init';
  import { RouterLink, useRoute } from 'vue-router';
  import ItemCreator from '@/components/work/ItemCreator.vue';
  import ItemViewer from '@/components/work/ItemViewer.vue';
  import InventoryTable from '@/components/work/InventoryTable.vue';
  import { deleteInventoryRecursively } from '@/scripts/firebase-utilities';
  import WorkToolbar from '@/components/work/WorkToolbar.vue';

  const unsavedChangesMessage = 'You have unsaved changes. Please save or discard the current item being edited before selecting a new inventory or item.';
  type ItemPanel = 'viewer' | 'editor' | 'creator';

  const organizationId = useRoute().params.id as string;
  const inventoriesRef = collection(database, 'organizations', organizationId, 'inventories');
  const inventories = useCollection<Inventory>(inventoriesRef, { maxRefDepth: 3 });
  const organization = ref<Organization | undefined>();

  getDoc(doc(database, 'organizations', organizationId)).then(organizationSnapshot => organization.value = organizationSnapshot.data() as Organization);

  const selectedInventoryIndex = ref<number | undefined>(inventories.value.length > 0 ? 0 : undefined);
  const selectedItem = ref<Item & WithId | undefined>();
  const activeItemPanel = ref<ItemPanel | undefined>(undefined);

  function isEditingItemInPanel() {
    return activeItemPanel.value != 'viewer' && activeItemPanel.value != null;
  }

  function closeItemForm() {
    selectedItem.value = undefined;
    activeItemPanel.value = undefined;
  }

  function createNewInventory() {
    const inventoryName = prompt('Enter your new inventory name:');

    if (inventoryName) {
      addDoc(collection(database, 'organizations', organizationId, 'inventories'), { name: inventoryName, items: [] });
    }
  }

  function deleteInventory(index: number) {
    if (isEditingItemInPanel()) {
      alert(unsavedChangesMessage);
      return;
    }

    const inventory = inventories.data.value[index];

    if (inventory && confirm(`Are you sure you want to delete inventory ${inventory.name}?`)) {
      closeItemForm();
      deleteInventoryRecursively(organizationId, inventory.id);
    }
  }

  async function renameInventory(index: number) {
    const inventory = inventories.data.value[index];

    if (inventory) {
      const newName = prompt(`What should the new name of inventory ${inventory.name} be?`);

      if (newName) {
        updateDoc(doc(database, 'organizations', organizationId, 'inventories', inventory.id), { name: newName });
      }
    }
  }

  function hasInventories() {
    return inventories?.value.length > 0;
  }

  function selectItemForViewing(item: Item & WithId) {
    if (isEditingItemInPanel()) {
      alert(unsavedChangesMessage);
    } else if (selectedInventoryIndex.value == null) {
      alert('Select an inventory before creating a new item for it.');
    } else {
      selectedItem.value = item;
      activeItemPanel.value = 'viewer';
    }
  }

  function selectItemForEditing(item: Item & WithId) {
    if (isEditingItemInPanel()) {
      alert(unsavedChangesMessage);
    } else if (selectedInventoryIndex.value == null) {
      alert('Select an inventory before creating a new item for it.');
    } else {
      selectedItem.value = item;
      activeItemPanel.value = 'editor';
    }
  }

  function tryOpenItemCreator() {
    if (isEditingItemInPanel()) {
      alert(unsavedChangesMessage);
    } else if (selectedInventoryIndex.value == null) {
      alert('Select an inventory before creating a new item for it.');
    } else {
      activeItemPanel.value = 'creator';
    }
  }

  function deleteItem(item: Item & WithId) {
    const inventory = getSelectedInventory();

    if (inventory == null) {
      console.warn('Selected inventory was found to be null.');
      return;
    }

    const isSelectedItem = item.id == selectedItem.value?.id;

    if (isSelectedItem && activeItemPanel.value == 'editor') {
      alert(unsavedChangesMessage);
    } else if (confirm(`Are you sure you want to delete ${item.name} from ${inventory.name}?`)) {
      if (isSelectedItem) {
        selectedItem.value = undefined;
      }

      deleteDoc(doc(database, 'organizations', organizationId, 'inventories', inventory.id, 'items', item.id));
    }
  }

  function getSelectedInventory() {
    return selectedInventoryIndex.value != null ? inventories.value[selectedInventoryIndex.value] : undefined;
  }

  function selectInventory(index: number) {
    if (isEditingItemInPanel()) {
      alert(unsavedChangesMessage);
    } else {
      selectedInventoryIndex.value = index;
    }
  }
</script>

<template>
  <div class="h-full flex flex-row items-stretch">
    <aside class="bg-gray-100 dark:bg-gray-900 px-3 py-2">
      <WorkNavigationBar />
      <hr class="my-3 border-gray-500 dark:border-gray-300">
      <h2 class="mt-1 text-xl font-extrabold dark:text-gray-200">
        Organization inventory explorer
      </h2>
      <h2 class="mt-1 text-lg font-semibold dark:text-gray-200">
        <RouterLink :to="`/work/organizations/${organizationId}`" class="underline">
          {{ organization?.name ?? "Unknown organization" }}
        </RouterLink>
      </h2>
      <button @click.prevent="createNewInventory" class="cursor-pointer text-sm bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md px-3 py-1 my-4 shadow-sm hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none">
        New inventory
      </button>
      <InventoryTable
        v-if="hasInventories()" :inventories="inventories"
        :selected-inventory-index="selectedInventoryIndex"
        @delete-inventory="deleteInventory"
        @select-inventory="selectInventory"
        @rename-inventory="renameInventory"
      />
      <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-2">
        Your organization currently has no inventories.<br>
        <button class="cursor-pointer underline" @click.prevent="createNewInventory">
          Consider creating one.
        </button>
      </p>
    </aside>
    <div class="flex flex-col flex-1 items-stretch">
      <WorkToolbar @new-item="tryOpenItemCreator" :has-inventories="hasInventories()" class="flex-initial" />
      <div class="flex flex-1 gap-3 mx-2 mt-2 content-stretch">
        <main class="flex-1 bg-white dark:bg-gray-800 rounded-t-lg">
          <h2 class="p-3 text-semibold text-gray-500 dark:text-gray-400">
            <RouterLink to="/work/dashboard" class="underline" title="Visit this organization's dashboard">
              Organizations
            </RouterLink> > <RouterLink :to="`/work/organization/${organizationId}`" class="underline" title="Visit this organization's admin page">
              {{ organization?.name ?? "Unknown" }}
            </RouterLink> > <RouterLink :to="`/work/organization/${organizationId}/inventories`" class="underline" title="You're already here">
              Inventories
            </RouterLink> <span v-if="getSelectedInventory()">> {{ getSelectedInventory()!.name }}</span>
          </h2>
          <ItemTable
            v-if="getSelectedInventory()" id="inventory"
            :items-reference="collection(database, 'organizations', organizationId, 'inventories', getSelectedInventory()!.id, 'items')"
            :selected-item-id="selectedItem?.id"
            @delete-item="deleteItem"
            @edit-item="selectItemForEditing"
            @create-new-item="tryOpenItemCreator"
            @select-item="selectItemForViewing"
          />
          <p v-else-if="inventories.length == 0" class="text-gray-400 text-center m-4">
            Your organization currently has no inventories.<br>
            <button class="cursor-pointer underline" @click.prevent="createNewInventory">
              Consider creating one.
            </button>
          </p>
          <p v-else class="text-gray-400 text-center m-4">
            Select an inventory to start managing its items.
          </p>
        </main>
        <ItemCreator
          v-if="activeItemPanel == 'creator' && getSelectedInventory()"
          @close-form="closeItemForm"
          :selected-inventory="getSelectedInventory()!"
          :organization-id="organizationId"
          class="flex-1"
        />
        <ItemEditor
          v-else-if="activeItemPanel == 'editor' && selectedItem"
          @close-form="closeItemForm"
          :selected-item="selectedItem"
          :selected-inventory="getSelectedInventory()!"
          :organization-id="organizationId"
          class="flex-1"
        />
        <ItemViewer
          v-else-if="activeItemPanel == 'viewer' && selectedItem"
          @close-form="closeItemForm"
          :selected-item="selectedItem"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>
