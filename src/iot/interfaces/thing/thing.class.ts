import { Thing } from "./thing.interface";
import { Item } from "../item/item.interface";
import { Action } from "../actions/action.interface";

export abstract class ThingImplementation implements Thing {
    public get port() { return this._port; }
    public get items() { return this._items; }
    public get actions() { return this._actions; }

    protected _items: Item[] = [];
    protected _actions;

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