import uuid from "uuid/v4"
import { HTTPMethod } from './http-action.class';
import { HttpService } from '../services/http.service';
import { HttpActionCallback } from './http-action-callback.class';
import { Action } from '../interfaces/actions/action.interface';
import { Item } from '../interfaces/item/item.interface';
import { Container } from 'typedi';

export class HttpAction<Parameters=any, Return=any> implements Action<Parameters> {
    public get id() { return this._id; }
    public get name() { return this._name; }
    public get description() { return this._description; }
    public get availableTargets() { return this._availableTargets }

    protected _httpService: HttpService = Container.get(HttpService);
    protected _id!: string;

    constructor(
        protected _name: string,
        protected _description: string,
        protected _availableTargets: Item[],
        protected _endPoint: string,
        protected _method: HTTPMethod,
    ) {
        this._id = uuid();
    }

    public trigger(): HttpActionCallback<Parameters, Return>
    public trigger(parameters: Parameters): HttpActionCallback<Parameters, Return>
    public trigger(parameters: Parameters, targets: Item[]): HttpActionCallback<Parameters, Return>
    public trigger(parameters?: Parameters, targets?: Item[]): HttpActionCallback<Parameters, Return> {
        targets = targets || this.availableTargets;
        const thingUrl = targets && targets[0] ? targets[0].thing.port : this.availableTargets[0].thing.port;
        const call = this._httpService[this.getRestMethod(this._method)]<Return>(`${thingUrl}${this._endPoint}`, this.buildParameters(parameters, targets));
        return new HttpActionCallback(parameters, targets || [], call);
    }

    protected buildParameters(parameters?: Parameters, targets?: Item[]): any {
        return parameters;
    }

    protected getRestMethod(method: HTTPMethod): "get" | "post" {
        return method.toLowerCase() as any;
    }

}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";