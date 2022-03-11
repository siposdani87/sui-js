import { isFunction, noop } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Promize } from '../core';

/**
 * @class
 */
export class Event {
    eventStore: Objekt;
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
    set(name: string, callback: Function): Function {
        if (isFunction(callback)) {
            const events = this.eventStore.get<Function[]>(name, []);
            events.push(callback);
            this.eventStore.set(name, events);
        }
        return callback;
    }
    /**
     * @param {string} name
     * @param {!Function} callback
     */
    remove(name: string, callback: Function) {
        const events = this.eventStore.get<Function[]>(name, []);
        const index = events.indexOf(callback);
        if (index > -1) {
            events.splice(index, 1);
        }
    }
    /**
     * @param {string} name
     */
    pop(name: string) {
        const events = this.eventStore.get<string[]>(name, []);
        events.pop();
        this.eventStore.set(name, events);
    }
    /**
     * @param {string} name
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    call(name: string, opt_args: Array<any> | undefined = []): Promize {
        const calls = /** @type {!Array<function()>} */ this.eventStore.get<
            Function[]
        >(name, [noop()]);
        const async = new Async();
        return async.serial(calls, opt_args);
    }
    /**
     * @param {string} name
     * @param {!Array} args
     * @param {!Function} callback
     * @return {!Promize}
     */
    override(name: string, args: Array<any>, callback: Function): Promize {
        const calls = /** @type {!Array<function()>} */ this.eventStore.get<
            Function[]
        >(name, [callback]);
        const async = new Async();
        return async.serial(calls, args);
    }
}
