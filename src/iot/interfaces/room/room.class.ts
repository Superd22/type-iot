import uuid from 'uuid/v4';
import { Service } from "typedi";
import { Room } from "./room.interface";
import { Item } from "../item/item.interface";

export class RoomImplementation implements Room {
    public get name() { return this._name };
    public get items() { return new Array<Item>(...this._items.values()); }
    public get id() { return this._id; }

    protected _id!: string;
    protected _items: Map<string, Item> = new Map<string, Item>();

    constructor(protected _name: string) {
        this._id = uuid();
    }

    registerItem(item: Item): void {
        if (!this._items.get(item.id)) this._items.set(item.id, item);
    }

    toJSON() {
        const proto = Object.getPrototypeOf(this);
        const jsonObj: any = Object.assign({}, this);
      
        Object.entries(Object.getOwnPropertyDescriptors(proto))
          .filter(([key, descriptor]) => typeof descriptor.get === 'function')
          .map(([key, descriptor]) => {
            if (descriptor && key[0] !== '_') {
              try {
                const val = (this as any)[key];
                jsonObj[key] = val;
              } catch (error) {
                console.error(`Error calling getter ${key}`, error);
              }
            }
          });
      
        return jsonObj;
      }

}