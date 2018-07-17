import { Action } from './../interfaces/actions/action.interface';
import { RoomImplementation } from './../interfaces/room/room.class';
import { Service } from "typedi";
import { Item } from '../interfaces/item/item.interface';

@Service()
export class ActionService {

    public get actions() { return new Array<Action>(...this._actions.values()); }
    protected _actions: Map<string, Action> = new Map<string, Action>();


    public registerAction(action: Action) {
        this._actions.set(action.id, action);
    }

    public get(actionId: string) {
        return this._actions.get(actionId);
    }

    /**
     * Check if a given action can trigger on a given item
     * @param action the action
     * @param item the item
     */
    public canTrigger(action: Action, item: Item) {
        return Boolean(action.availableTargets.find((actionItem) => actionItem.id === item.id))
    }

}