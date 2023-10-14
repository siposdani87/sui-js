import { isFunction, noop } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';

export class EventBus {
    eventStore: Objekt;

    constructor() {
        this.eventStore = new Objekt();
    }

    set(name: string, callback: Function): Function {
        if (isFunction(callback)) {
            const events = this.eventStore.get<Function[]>(name, []);
            events.push(callback);
            this.eventStore.set(name, events);
        }
        return callback;
    }

    remove(name: string, callback: Function) {
        const events = this.eventStore.get<Function[]>(name, []);
        const index = events.indexOf(callback);
        if (index > -1) {
            events.splice(index, 1);
        }
    }

    pop(name: string) {
        const events = this.eventStore.get<string[]>(name, []);
        events.pop();
        this.eventStore.set(name, events);
    }

    call(name: string, opt_args: Array<any> | undefined = []) {
        const calls = this.eventStore.get<Function[]>(name, [noop()]);
        const async = new Async();
        return async.serial(calls, opt_args);
    }

    override(name: string, args: Array<any>, callback: Function) {
        const calls = this.eventStore.get<Function[]>(name, [callback]);
        const async = new Async();
        return async.serial(calls, args);
    }
}
