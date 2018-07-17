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

}