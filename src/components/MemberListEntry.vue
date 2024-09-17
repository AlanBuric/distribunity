<script setup lang="ts">
  import { database } from '@/firebase/init';
  import type { Member, User, WithId } from '@/types/types';
  import { doc, getDoc } from 'firebase/firestore';

  defineEmits<{ removeMember: [id: string] }>();
  const props = defineProps<{ member: Member & WithId, adminId: string }>();

  const userInfo = (await getDoc(doc(database, 'users', props.member.id))).data() as User;
</script>

<template>
  <tr :class="{'bg-white dark:bg-gray-800': true}">
    <td scope="row" class="text-center px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ `${userInfo.firstName} ${userInfo.lastName}` }}
    </td>
    <td
      :class="{
        'text-center px-3 py-2 font-medium whitespace-nowrap': true,
        'text-gray-900 dark:text-white': member.roles.length,
        'text-gray-700 dark:text-gray-400': !member.roles.length
      }"
    >
      {{ member.roles.length ? member.roles.join(', ') : "None" }}
    </td>
    <td class="flex justify-center px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <button
        v-if="member.id != adminId"
        @click="$emit('removeMember', member.id)"
        class="px-2 py-1 font-normal bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 text-white rounded"
      >
        Remove
      </button>
    </td>
  </tr>
</template>
