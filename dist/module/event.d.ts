import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Event {
    eventStore: Objekt;
    /**
     */
    constructor();
    /**
     * @param {string} name
     * @param {!Function} callback
     * @return {!Function}
     */
    set(name: any, callback: any): any;
    /**
     * @param {string} name
     * @param {!Function} callback
     */
    remove(name: any, callback: any): void;
    /**
     * @param {string} name
     */
    pop(name: any): void;
    /**
     * @param {string} name
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    call(name: any, opt_args?: any[]): import("..").Promize;
    /**
     * @param {string} name
     * @param {!Array} args
     * @param {!Function} callback
     * @return {!Promize}
     */
    override(name: any, args: any, callback: any): import("..").Promize;
}
