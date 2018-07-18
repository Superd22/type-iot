import { Service } from "typedi";
import { CoreOptions } from "request";
import { RxHR } from "@akanass/rx-http-request";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Service()
export class HttpService {
    public get<T>(url: string, params?: {}, options?: CoreOptions) {
        options = this.makeOptions(options);
        return RxHR.get<T>(url, options).pipe(
            map((data) => {
                return data.body;
            }),
            catchError((err, caught) => {
                console.error(`HTTP Error`, err);
                return of({} as any);
            })
        );
    }


    public post<T>(url: string, params?: {}, options?: CoreOptions) {
        options = this.makeOptions(options, params);
        return RxHR.post<T>(url, options).pipe(
            map((data) => {
                return data.body;
            }),
            catchError((err, caught) => {
                console.error(`HTTP Error`, err);
                return of({} as any);
            })
        );
    }

    /**
     * Make the option param
     * @param options 
     */
    protected makeOptions(options?: CoreOptions, params?: {}): CoreOptions {
        return Object.assign({}, {
            body: params || {},
            json: true
        } as CoreOptions, options || {});
    }
}