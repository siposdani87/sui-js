import { isFunction, noop } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class EventBus {
    /**
     */
    constructor() {
        this.eventStore = new Objekt();
    }
    /**
     * @param {string} name
     * @param {!Function} callback
     * @return {!Function}
     */
    set(name, callback) {
        if (isFunction(callback)) {
            const events = this.eventStore.get(name, []);
            events.push(callback);
            this.eventStore.set(name, events);
        }
        return callback;
    }
    /**
     * @param {string} name
     * @param {!Function} callback
     */
    remove(name, callback) {
        const events = this.eventStore.get(name, []);
        const index = events.indexOf(callback);
        if (index > -1) {
            events.splice(index, 1);
        }
    }
    /**
     * @param {string} name
     */
    pop(name) {
        const events = this.eventStore.get(name, []);
        events.pop();
        this.eventStore.set(name, events);
    }
    /**
     * @param {string} name
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    call(name, opt_args = []) {
        const calls = this.eventStore.get(name, [noop()]);
        const async = new Async();
        return async.serial(calls, opt_args);
    }
    /**
     * @param {string} name
     * @param {!Array} args
     * @param {!Function} callback
     * @return {!Promize}
     */
    override(name, args, callback) {
        const calls = this.eventStore.get(name, [callback]);
        const async = new Async();
        return async.serial(calls, args);
    }
}
