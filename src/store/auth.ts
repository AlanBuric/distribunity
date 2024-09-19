import { auth, database } from '@/firebase/init';
import type { Member, Organization, Permission, Role, User, WithId } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAuthStore = defineStore('auth', () => {
    const userId = ref<string | undefined>(auth.currentUser?.uid);
    const userProfile = ref<User & WithId>();

    const currentOrganizationId = ref<string>();
    const currentOrganization = ref<Organization & WithId | undefined>();
    const currentOrganizationMember = ref<Member & WithId | undefined>();
    const currentOrganizationRoles = ref<(Role & WithId)[]>([]);

    async function loadUserProfile(newUserId: string) {
        userId.value = newUserId;
        userProfile.value = (await getDoc(doc(database, 'users', newUserId))).data() as User & WithId;
    }

    async function loadOrganizationData(organizationId: string, userId: string) {
        if (currentOrganizationId.value != organizationId) {
            currentOrganizationId.value = organizationId;
            currentOrganization.value = (await getDoc(doc(database, 'organizations', organizationId))).data() as Organization & WithId;
            currentOrganizationMember.value = (await getDoc(doc(database, 'organizations', organizationId, 'members', userId))).data() as Member & WithId;
            currentOrganizationRoles.value = (await Promise.all(currentOrganizationMember.value.roles.map(roleRef => getDoc(doc(database, 'organizations', organizationId, 'roles', roleRef.id))))).map(snapshot => snapshot.data() as Role & WithId);
        }
    }

    function isOrganizationOwner() {
        return currentOrganization.value && currentOrganization.value.owner.id == userId.value;
    }

    function hasPermission(permission: Permission) {
        return isOrganizationOwner() || currentOrganizationRoles.value.some(role => role.permissions.includes(permission));
      }

    return { userId, userProfile, currentOrganizationId, currentOrganization, currentOrganizationMember, currentOrganizationRoles, loadUserProfile, loadOrganizationData, isOrganizationOwner, hasPermission };
});

export default useAuthStore;
