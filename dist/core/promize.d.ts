import { Deferred } from './deferred';
import { Objekt } from './objekt';
/**
 * @class
 */
export declare class Promize<T, K> {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    resolve(opt_data?: T): void;
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data?: K): void;
    /**
     * @param {!Function} resolve
     * @param {!Function=} opt_reject
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    then(resolve: (...args: T extends Array<any> ? T : [T]) => void, opt_reject?: (...args: T extends Array<any> ? T : [T]) => void, opt_complete?: (...args: T extends Array<any> ? T : [T]) => void): void;
    /**
     * @param {!Deferred} defer
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    defer(defer: Deferred, opt_complete?: () => void): void;
}
