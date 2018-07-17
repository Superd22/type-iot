import { ItemImplementation } from "../../src/iot/interfaces/item/item.class";
import { ShutterThing } from "./shutter.thing";
import { Room } from "../../src/iot/interfaces/room/room.interface";

export class ShutterItem extends ItemImplementation {
    constructor(thing: ShutterThing, channel: string, room?: Room) {
        super("SHUTTER", thing, channel, room);
        thing.addItem(this);
    }
}