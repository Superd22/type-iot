import { ActionService } from './../services/action.service';
import uuid from "uuid/v4"
import { HTTPMethod } from './http-action.class';
import { HttpService } from '../services/http.service';
import { HttpActionCallback } from './http-action-callback.class';
import { Action } from '../interfaces/actions/action.interface';
import { Item } from '../interfaces/item/item.interface';
import { Container, Inject } from 'typedi';
import { ItemService } from "../services/item.service";

export class HttpAction<Parameters=any, Return=any> implements Action<Parameters> {
    public get id() { return this._id; }
    public get name() { return this._name; }
    public get description() { return this._description; }
    public get availableTargets() { return this._availableTargets }

    protected _httpService: HttpService = Container.get(HttpService);
    protected _itemService: ItemService = Container.get(ItemService);
    protected _actionService: ActionService = Container.get(ActionService);

    protected _id!: string;

    constructor(
        protected _name: string,
        protected _description: string,
        protected _availableTargets: Item[],
        protected _endPoint: string,
        protected _method: HTTPMethod,
    ) {
        this._id = uuid();
        this._actionService.registerAction(this);
    }

    public trigger(): HttpActionCallback<Parameters, Return>
    public trigger(parameters: Parameters): HttpActionCallback<Parameters, Return>
    public trigger(parameters: Parameters, targets: Item[]): HttpActionCallback<Parameters, Return>
    public trigger(parameters: Parameters, targets: string[]): HttpActionCallback<Parameters, Return>
    public trigger(parameters?: Parameters, targets?: Item[] | string[]): HttpActionCallback<Parameters, Return> {
        targets = this.getTargets(targets);
        const thingUrl = targets && targets[0] ? targets[0].thing.port : this.availableTargets[0].thing.port;
        const call = this._httpService[this.getRestMethod(this._method)]<Return>(`${thingUrl}${this._endPoint}`, this.buildParameters(parameters, targets));
        return new HttpActionCallback(parameters, targets || [], call);
    }

    protected getTargets(targets?: Item[] | string[]): Item[] {
        targets = targets || this._availableTargets;

        if (typeof targets[0] === typeof "abc") {
            (targets as string[]).map((target, index, _targets) => {
                _targets[index] = this._itemService.get(target) as any;
            });
        }

        return targets as Item[];
    }

    protected buildParameters(parameters?: Parameters, targets?: Item[]): any {
        return parameters;
    }

    protected getRestMethod(method: HTTPMethod): "get" | "post" {
        return method.toLowerCase() as any;
    }

}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";