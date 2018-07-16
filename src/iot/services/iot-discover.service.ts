import { Thing } from '../interfaces/thing/thing.interface';
import { Service } from "typedi";
import { BehaviorSubject } from "rxjs";
import { first } from "rxjs/operators";

@Service()
export class IOTDiscoverService {

    protected _things: BehaviorSubject<Thing[]> = new BehaviorSubject<Thing[]>([]);

    constructor() { }

    /**
     * Register a thing in the system
     * @param thing 
     */
    registerThing(thing: Thing) {
        this._things
            .pipe(first())
            .subscribe((things) => {
                const newThing = things.slice();
                newThing.push(thing);
                this._things.next(newThing);
            });
    }
}