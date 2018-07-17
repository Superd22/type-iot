import { HttpAction } from './../../src/iot/action/http-action.class';
import { ThingImplementation } from '../../src/iot/interfaces/thing/thing.class';

export class FanThing extends ThingImplementation {
    public get actions() { return this._actions; }

    protected _actions = {
        get: new HttpAction<undefined, FanReturn>(`Get Status`, `Get the current status of the fan`, this._items, `/status`, "GET"),
        set: new HttpAction<FanReturn, FanReturn>(`Set Status`, `Set the fan speed`, this._items, `/status`, "POST")
    };

    constructor() {
        super(`http://192.168.1.21`);
    }
}

export interface FanReturn {
    status: FanSpeed
}

export enum FanSpeed {
    SHUT_DOWN = -1,
    SLOW_SPEED = 0,
    MEDIUM_SPEED = 4,
    MAX_SPEED = 5
}