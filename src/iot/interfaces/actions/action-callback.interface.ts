import { Item } from "../item/item.interface";
import { Observable } from "rxjs";

/**
 * Callback when an action is triggered
 */
export interface ActionCallback<Parameters = any, Return=any> {
    /** the params that were sent to the Items */
    params: Parameters;
    /** the target(s) the action was sent to */
    target: Item | Item[]
    /** the completion packet we got */
    completion: Observable<Return>
}