<script setup lang="ts">
  import type { Folder } from '@/types/types';
  import TreeNode from './TreeNode.vue';

  const props = defineProps<{ folders: Folder[], organizationName: string }>();

  defineEmits(['selectInventory']);
</script>

<template>
  <ul class="tree">
    <li>
      <details open>
        <summary class="flex justify-between">
          <span>{{ organizationName }}</span>
          <div class="inline-block">
            <button title="Create new folder">
              ➕
            </button>
            <button title="Delete this inventory">
              🗑️
            </button>
          </div>
        </summary>
        <TreeNode
          v-for="(folder, index) in folders" :key="index"
          :folder="folder" @select-inventory="(payload) => $emit('selectInventory', payload)"
        />
      </details>
    </li>
  </ul>
</template>

<style>
  /*
    * This beautiful CSS style can be found at https://iamkate.com/code/tree-views/.
    */

  .tree {
    --spacing: 1.5rem;
    --offset-x: 11px;
    --offset-y: 13px;
    padding: 0px;
    overflow-y: auto;
    scrollbar-color: rgb(95, 93, 93) #1e1e20;
  }

  .tree li {
    position: relative;
    padding-left: calc(2 * var(--spacing) - var(--offset-x) - 2px);
  }

  .tree ul {
    margin-left: calc(var(--offset-x) - var(--spacing));
    padding-left: 0;
  }

  .tree ul li {
    border-left: 2px solid #ddd;
  }

  .tree ul li:last-child {
    border-color: transparent;
  }

  .tree ul li::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(var(--spacing) / -2);
    left: -2px;
    width: calc(var(--spacing) + 2px);
    height: calc(var(--spacing) + 1px);
    border: solid #ddd;
    border-width: 0 0 2px 2px;
  }

  .tree summary {
    cursor: pointer;
  }

  .tree summary::marker,
  .tree summary::-webkit-details-marker {
    display: none;
  }

  .tree summary:focus {
    outline: none;
  }

  .tree summary:focus-visible {
    outline: 1px dotted #000;
  }

  .tree li::after,
  .tree summary::before {
    display: block;
    position: absolute;
    top: calc(var(--spacing) / 2 - var(--offset-y));
    left: calc(var(--spacing) - var(--offset-x) - 1px);
  }

  .tree li::after {
    content: '📦';
  }

  .tree summary::before {
    z-index: 1;
    content: '📁';
  }

  .tree details[open] > summary::before {
    background-position: calc(-2 * var(--offset-x)) 0;
    content: '📂'
  }
</style>
