import { database } from '@/firebase/init';
import { writeBatch, collection, getDocs, doc } from 'firebase/firestore';

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
