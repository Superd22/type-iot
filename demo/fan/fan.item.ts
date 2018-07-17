import { FanThing } from './fan.thing';
import { Thing } from './../../src/iot/interfaces/thing/thing.interface';
import { Item } from './../../src/iot/interfaces/item/item.interface';
import { ItemType } from '../../src/iot/interfaces/item/item-types.type';
import { ItemImplementation } from '../../src/iot/interfaces/item/item.class';
import { Room } from '../../src/iot/interfaces/room/room.interface';

export class FanItem extends ItemImplementation {
    constructor(thing: FanThing, name: string, room?: Room) {
        super("FAN", thing, name, room);
    }
}