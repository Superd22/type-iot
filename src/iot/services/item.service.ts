import { Item } from './../interfaces/item/item.interface';
import { Service } from "typedi";

@Service()
export class ItemService {

    public get items() { return new Array<Item>(...this._items.values()); }
    protected _items: Map<string, Item> = new Map<string, Item>();


    public registerItem(item: Item) {
        this._items.set(item.id, item);
    }

    public get(itemId: string) {
        return this._items.get(itemId);
    }

}