import { ColumnType, type CountableItem } from "@/types/types";

type ColumnFunction = (item: CountableItem) => string;

const itemColumnRegistry: Record<ColumnType, ColumnFunction> = {
    [ColumnType.ATTRIBUTES]: (item) => item.attributes?.map(attr => attr.name).join(", ").substring(0, 16) ?? "",
    [ColumnType.TOTAL_PRICE]: (item) => parseFloat((item.unitPrice * item.quantity).toPrecision(12)) + "",
    [ColumnType.NAME]: item => item.name,
    [ColumnType.QUANTITY]: item => item.quantity + "",
    [ColumnType.UNIT]: item => item.unit,
    [ColumnType.UNIT_PRICE]: item => item.unitPrice + "",
};

export function getItemColumnValue(item: CountableItem, columnType: ColumnType | string) {
    return itemColumnRegistry[columnType](item);
}