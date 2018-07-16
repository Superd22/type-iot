import { Item } from "../item/item.interface";
import { Action } from "../actions/action.interface";

/**
 * Describe a thing that is connected to LAN and can be controlled
 * Remotely
 */
export interface Thing {
    /** LAN port to control this thing */
    port: string;
    /** items connected to this thing */
    items?: Item | Item[];
    /** actions available to do on this thing */
    actions?: Action[];

    addItem(item: Item): void
}