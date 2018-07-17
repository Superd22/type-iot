import { Item } from '../item/item.interface';
import { ActionCallback } from './action-callback.interface';
/**
 * Describes an action that can be performed by a thing.
 * It can be linked to an item and have parameters
 */
export interface Action<Parameters = any> {
    /** unique id of this action */
    id: string;
    /** optional action name */
    name?: string;
    /** optional action description */
    description?: string;
    /** target(s) item(s) that will be affected by this action */
    availableTargets?: Item[];

    /**
     * Trigger this Action 
     * @param params paramaeters to trigger the action with
     * @param target the target(s) on which to trigger the action (default to the availableTargets of the action)
    */
    trigger(params?: Parameters, target?: Item[]): ActionCallback
    trigger(params?: Parameters, target?: string[]): ActionCallback
}