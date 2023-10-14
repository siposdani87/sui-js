import { isFunction, noop } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
export class EventBus {
    constructor() {
        this.eventStore = new Objekt();
    }
    set(name, callback) {
        if (isFunction(callback)) {
            const events = this.eventStore.get(name, []);
            events.push(callback);
            this.eventStore.set(name, events);
        }
        return callback;
    }
    remove(name, callback) {
        const events = this.eventStore.get(name, []);
        const index = events.indexOf(callback);
        if (index > -1) {
            events.splice(index, 1);
        }
    }
    pop(name) {
        const events = this.eventStore.get(name, []);
        events.pop();
        this.eventStore.set(name, events);
    }
    call(name, opt_args = []) {
        const calls = this.eventStore.get(name, [noop()]);
        const async = new Async();
        return async.serial(calls, opt_args);
    }
    override(name, args, callback) {
        const calls = this.eventStore.get(name, [callback]);
        const async = new Async();
        return async.serial(calls, args);
    }
}
