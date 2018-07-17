import { ActionService } from './../../services/action.service';
import { Container } from 'typedi';
import { Action } from './../actions/action.interface';
import { Thing } from './../thing/thing.interface';
import { Item } from "./item.interface";
import { ItemType } from "./item-types.type";
import { Room } from '../room/room.interface';
import uuid from "uuid/v4"
import { ItemService } from '../../services/item.service';

export class ItemImplementation implements Item {
    public get id() { return this._id; }
    public get type() { return this._type; }
    public get name() { return this._name || this._id }
    public get thing() { return this._thing; }
    public get room() { return this._room; }
    public get actions() { return this.getAvailableActions() }

    protected _id!: string;

    protected _actionService: ActionService = Container.get(ActionService);
    protected _itemService: ItemService = Container.get(ItemService);

    constructor(protected _type: ItemType, protected _thing: Thing, protected _name: string, protected _room?: Room) {
        this._id = uuid();

        this._itemService.registerItem(this);
        _thing.addItem(this);
        _room.registerItem(this);
    }

    /**
     * Find the actions on this item's thing that can affect this item
     */
    protected getAvailableActions(): Action[] {
        return Object.keys(this.thing.actions)
            .map((actionName) => this.thing.actions[actionName])
            .filter((action) => this._actionService.canTrigger(action, this));
    }

}