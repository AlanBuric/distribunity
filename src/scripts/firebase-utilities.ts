import { database } from '@/firebase/init';
import type { Organization, WithId } from '@/types';
import { writeBatch, collection, getDocs, doc, runTransaction, arrayRemove } from 'firebase/firestore';

export function firestoreAutoId(): string {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let autoId = '';

    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(
        Math.floor(Math.random() * CHARS.length),
      );
    }
    return autoId;
  }

export async function deleteInventoryRecursively(organizationId: string, inventoryId: string) {
    const batch = writeBatch(database);

    const itemsRef = collection(database, 'organizations', organizationId, 'inventories', inventoryId, 'items');
    const itemsSnapshot = await getDocs(itemsRef);

    itemsSnapshot.forEach((itemDoc) => {
      const itemDocRef = doc(database, 'organizations', organizationId, 'inventories', inventoryId, 'items', itemDoc.id);
      batch.delete(itemDocRef);
    });

    batch.delete(doc(database, 'organizations', organizationId, 'inventories', inventoryId));

    await batch.commit();
}

export async function deleteOrganization(organization: Organization & WithId) {
  if (!confirm(`Are you sure you want to delete the organization ${organization.name}? This action is irreversible.`)) {
    return;
  }

  const orgRef = doc(database, 'organizations', organization.id);
  const inventoriesRef = collection(database, 'organizations', organization.id, 'inventories');
  const membersRef = collection(database, 'organizations', organization.id, 'members');

  try {
    await runTransaction(database, async (transaction) => {
      const inventorySnapshots = await getDocs(inventoriesRef);
      inventorySnapshots.forEach(async (inventoryDoc) => {
        await deleteInventoryRecursively(organization.id, inventoryDoc.id);
      });

      (await getDocs(membersRef)).forEach((memberDoc) => {
        const userRef = doc(database, 'users', memberDoc.id);

        transaction.update(userRef, {
          organizations: arrayRemove(orgRef),
        });
      });

      transaction.delete(orgRef);
    });
  } catch (error) {
    console.error('An error was caught while trying to delete an organization', error);
    alert(`Sorry, we were unable to delete the organization ${organization.name}. Please contact us to resolve this issue.`);
  }
};
