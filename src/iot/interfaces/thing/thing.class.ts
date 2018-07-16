import { Thing } from "./thing.interface";
import { Item } from "../item/item.interface";
import { Action } from "../actions/action.interface";

export class ThingImplementation implements Thing {
    public get port() { return this._port; }
    public get items() { return this._items; }
    public get actions() { return this._actions; }

    protected _items: Item[] = [];
    protected _actions: Action[] = [];

    /**
     * Create a new thing
     * @param _port port on which the thing resides
     */
    constructor(protected _port: string) {

    }

    public addItem(item: Item) {
        if (!this._items.find((itemCheck) => itemCheck.id === item.id))
            this._items.push(item);
    }

}