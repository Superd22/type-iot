import { Action } from './../actions/action.interface';
import { Thing } from './../thing/thing.interface';
import { Item } from "./item.interface";
import { ItemType } from "./item-types.type";
import { Room } from '../room/room.interface';
import uuid from "uuid/v4"

export class ItemImplementation implements Item {
    public get id() { return this._id; }
    public get type() { return this._type; }
    public get name() { return this._name || this._id }
    public get thing() { return this._thing; }
    public get room() { return this._room; }
    public get actions() { return this.getAvailableActions() }

    protected _id!: string;

    constructor(protected _type: ItemType, protected _thing: Thing, protected _name: string, protected _room?: Room) {
        this._id = uuid();
    }

    /**
     * Find the actions on this item's thing that can affect this item
     */
    protected getAvailableActions(): Action[] {
        if (this.thing.actions) {
            return this.thing.actions.filter((action) => {
                if (action.availableTargets) {
                    return Boolean(action.availableTargets.find((target) => {
                        return target.id === this._id;
                    }));
                }
            });
        }

        return [];
    }



}