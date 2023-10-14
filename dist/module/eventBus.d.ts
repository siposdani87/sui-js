import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class EventBus {
    eventStore: Objekt;
    /**
     */
    constructor();
    /**
     * @param {string} name
     * @param {!Function} callback
     * @return {!Function}
     */
    set(name: string, callback: Function): Function;
    /**
     * @param {string} name
     * @param {!Function} callback
     */
    remove(name: string, callback: Function): void;
    /**
     * @param {string} name
     */
    pop(name: string): void;
    /**
     * @param {string} name
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    call(name: string, opt_args?: Array<any> | undefined): import("..").Promize<Object, Object>;
    /**
     * @param {string} name
     * @param {!Array} args
     * @param {!Function} callback
     * @return {!Promize}
     */
    override(name: string, args: Array<any>, callback: Function): import("..").Promize<Object, Object>;
}
