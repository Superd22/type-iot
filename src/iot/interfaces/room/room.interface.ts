import { Item } from "../item/item.interface";

/**
 * Describes a physical Room
 */
export interface Room {
    /** unique id of the room */
    id: string;
    /** name of the room */
    name: string;
    /** items in this room */
    items: Item[]
    /** register a new item to this room */
    registerItem(item: Item): void
}