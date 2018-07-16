import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { ActionCallback } from '../interfaces/actions/action-callback.interface';
import { Item } from '../interfaces/item/item.interface';

export class HttpActionCallback<Parameters=any, Return=any> implements ActionCallback<Parameters, Return> {
    public get params() { return this._params; }
    public get target() { return this._target; }
    public get completion() { return this._completion; }

    protected _completion: ReplaySubject<Return> = new ReplaySubject<Return>(1);

    constructor(protected _params: Parameters, protected _target: Item[], protected _call: Observable<Return>) {
        this._call.subscribe((data) => {
            this._completion.next(data);
        });
    }


}