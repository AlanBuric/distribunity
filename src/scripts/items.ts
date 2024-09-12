import { ColumnType, type CountableItem, type Folder, type Inventory } from '@/types/types';

type ColumnFunction = (item: CountableItem) => string;
const currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' });

const itemColumnRegistry: Record<ColumnType, ColumnFunction> = {
  [ColumnType.ATTRIBUTES]: item => item.attributes?.map(attr => attr.name).join(', ').substring(0, 16) ?? '',
  [ColumnType.TOTAL_PRICE]: item => currencyFormatter.format(item.unitPrice * item.quantity),
  [ColumnType.NAME]: item => item.name,
  [ColumnType.QUANTITY]: item => item.quantity + '',
  [ColumnType.UNIT]: item => item.unit,
  [ColumnType.UNIT_PRICE]: item => item.unitPrice + '',
};

export function getItemColumnValue(item: CountableItem, columnType: ColumnType | string) {
  return itemColumnRegistry[columnType](item);
}

export function findFirstInventory(folders: Folder[]): Inventory | undefined {
  for (const folder of folders) {
    if (folder.inventories.length > 0) {
      return folder.inventories[0];
    }

    const inventory = findFirstInventory(folder.folders);

    if (inventory) {
      return inventory;
    }
  }

  return undefined;
}
