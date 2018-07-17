import { ThingImplementation } from "../../src/iot/interfaces/thing/thing.class";
import { HttpAction } from "../../src/iot/action/http-action.class";
import { Item } from "../../src/iot/interfaces/item/item.interface";

export class ShutterThing extends ThingImplementation {
    public get actions() { return this._actions; }

    protected _actions = {
        move: new ShutterMoveAction(`Move shutter`, `Move one or more shutter`, this._items, `/move`, "POST")
    };

    constructor() {
        super(`http://192.168.1.24`);
    }
}

export enum ShutterMoveDirection {
    UP = 2,
    DOWN = -1,
    STOP = 1
}

export class ShutterMoveAction extends HttpAction<ShutterMoveDirection[], void> {
    protected buildParameters(parameters: ShutterMoveDirection[], items: Item[]) {
        // We have a mismatch between the move and the targets
        if (parameters.length != items.length && parameters.length != 1) throw new Error(`Didn't send enough parameters`);

        const ret: { [channel: number]: ShutterMoveDirection } = {};

        // We wanted a few targets, so target them individually
        if (items.length !== this._availableTargets.length)
            items.map((item, index) => {
                const direction = parameters.length === 1 ? parameters[0] : parameters[index];
                ret[item.name] = direction;
            });
        else {
            // We wanna move all of them in one direction
            ret[5] = parameters[0];
        }

        return ret;
    }
}