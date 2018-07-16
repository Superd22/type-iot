import { Action } from './../actions/action.interface';
import { Room } from '../room/room.interface';
import { ItemType } from './item-types.type';
import { Thing } from '../thing/thing.interface';
/**
 * Describes a physical item to be controlled
 */
export interface Item {
    /** unique id of the item */
    id: string;
    /** type of item */
    type: ItemType;
    /** name of the item */
    name: string;
    /** thing to which this item is linked */
    thing: Thing;
    /** room in which the item is in */
    room?: Room;
    /** action available on this item */
    actions?: Action[];
}