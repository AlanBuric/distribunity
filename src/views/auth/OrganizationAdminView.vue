<script setup lang="ts">
  import { auth, database } from '@/firebase/init';
  import { ALL_PERMISSIONS, type Member, type Organization, type Role } from '@/types';
  import { doc, updateDoc, arrayRemove, arrayUnion, collection, addDoc, deleteDoc, writeBatch } from 'firebase/firestore';
  import { useRoute } from 'vue-router';
  import { useDocument, useCollection } from 'vuefire';
  import { ref } from 'vue';
  import MemberListEntry from '@/components/admin/MemberListEntry.vue';

  const organizationId = useRoute().params.id as string;
  const organizationDocRef = doc(database, 'organizations', organizationId);
  const membersCollRef = collection(organizationDocRef, 'members');
  const rolesCollRef = collection(organizationDocRef, 'roles');

  const organization = useDocument<Organization>(organizationDocRef);
  const members = useCollection<Member>(membersCollRef);
  const roles = useCollection<Role>(rolesCollRef);

  const newRoleName = ref('');
  const newInviteCode = ref('');

  function removeMember(memberId: string) {
    const batch = writeBatch(database);

    batch.delete(doc(membersCollRef, memberId));
    batch.update(doc(database, 'users', memberId), { organizations: arrayRemove(organizationDocRef) });

    batch.commit();
  }

  function createInviteCode() {
    if (newInviteCode.value.length < 6) {
      alert('Your invite code should be at least 6 characters long');
      return;
    }

    updateDoc(organizationDocRef, {
      invites: arrayUnion(newInviteCode.value),
    });

    newInviteCode.value = '';
  }

  function removeInviteCode(inviteCode: string) {
    updateDoc(organizationDocRef, {
      invites: arrayRemove(inviteCode),
    });
  }

  function createRole() {
    if (newRoleName.value) {
      addDoc(rolesCollRef, {
        name: newRoleName.value,
        permissions: [],
      });

      newRoleName.value = '';
    }
  }

  function deleteRole(roleId: string) {
    deleteDoc(doc(rolesCollRef, roleId));
  }

  function addPermission(roleId: string, permission: string) {
    updateDoc(doc(rolesCollRef, roleId), { permissions: arrayUnion(permission) });
  }

  function removePermission(roleId: string, permission: string) {
    updateDoc(doc(rolesCollRef, roleId), { permissions: arrayRemove(permission) });
  }
</script>

<template>
  <main v-if="organization" class="flex-grow flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 space-y-6">
    <h1 class="text-3xl font-semibold text-center">
      Organization: {{ organization.name }}
    </h1>

    <section class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow rounded-lg px-5 py-4">
      <h2 class="text-2xl font-semibold mb-4">
        Manage Members
      </h2>
      <table class="w-full">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-3 py-2">
              Name
            </th>
            <th scope="col" class="px-3 py-2">
              Roles
            </th>
            <th scope="col" class="px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <MemberListEntry
            v-for="(member, index) in members" :key="member.id" :member="member"
            :admin-id="auth.currentUser!.uid"
            :class="{'border-b dark:border-gray-700': index < members.length - 1}"
            @remove-member="removeMember"
          />
        </tbody>
      </table>
    </section>

    <section class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow rounded-lg px-5 py-4">
      <h2 class="text-2xl font-semibold mb-4">
        Invite Codes
      </h2>
      <form @submit.prevent="createInviteCode" class="flex space-x-4 mb-4">
        <input
          v-model="newInviteCode" minlength="6" placeholder="Enter new invite code"
          class="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 appearance-none dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-active-link"
        >
        <button type="submit" class="px-3 py-2 bg-teal-500 text-white rounded">
          Create
        </button>
      </form>
      <ul v-if="organization.invites.length < 20">
        <li v-for="(invite, index) in organization.invites" :key="index" class="flex justify-between items-center mb-2">
          <span>{{ invite }}</span>
          <button @click="removeInviteCode(invite)" class="px-3 py-1 bg-red-500 text-white rounded">
            Remove
          </button>
        </li>
      </ul>
      <p v-else>
        <span v-for="(invite, index) in organization.invites" :key="index">
          {{ invite }} <button class="text-red-500" @click.prevent="removeInviteCode(invite)">×</button>{{ index != organization.invites.length - 1 ? ', ' : '' }}
        </span>
      </p>
    </section>

    <section class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow rounded-lg px-5 py-4">
      <h2 class="text-2xl font-semibold mb-4">
        Manage Roles
      </h2>
      <form @submit.prevent="createRole" class="flex space-x-4 mb-4">
        <input v-model="newRoleName" placeholder="Enter new role name" class="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 appearance-none dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-active-link">
        <button type="submit" class="px-3 py-2 bg-teal-500 text-white rounded">
          Create
        </button>
      </form>
      <table class="w-full">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-3 py-2">
              Name
            </th>
            <th scope="col" class="px-3 py-2">
              Add permission
            </th>
            <th scope="col" class="px-3 py-2">
              Permissions
            </th>
            <th scope="col" class="px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id" class="bg-white dark:bg-gray-800 transition-all">
            <td class="px-3 py-2">
              {{ role.name }}
            </td>
            <td class="px-3 py-2">
              <form @submit.prevent="event => addPermission(role.id, event.target!['permission-to-add'].value)" class="space-x-1 space-y-1">
                <select name="permission-to-add" id="permission-to-add" class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:outline-none">
                  <option v-for="permission in ALL_PERMISSIONS" :key="permission" :disabled="role.permissions.includes(permission)">
                    {{ permission }}
                  </option>
                </select>
                <button type="submit" class="px-2 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 dark:hover:bg-teal-700 transition">
                  Add
                </button>
              </form>
            </td>
            <td class="px-3 py-2">
              <div class="flex flex-wrap gap-2">
                <div v-for="permission in role.permissions" :key="permission" class="bg-teal-500 text-white px-2 py-1 rounded flex items-center">
                  {{ permission }}
                  <button @click.prevent="removePermission(role.id, permission)" class="ml-2 text-red-500 hover:text-red-700">
                    &times;
                  </button>
                </div>
              </div>
            </td>
            <td class="px-3 py-2">
              <button @click.prevent="deleteRole(role.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
