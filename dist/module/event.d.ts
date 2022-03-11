import { Objekt } from '../core/objekt';
import { Promize } from '../core';
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
    call(name: string, opt_args?: Array<any> | undefined): Promize;
    /**
     * @param {string} name
     * @param {!Array} args
     * @param {!Function} callback
     * @return {!Promize}
     */
    override(name: string, args: Array<any>, callback: Function): Promize;
}
