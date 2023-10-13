import { Deferred } from './deferred';
import { Objekt } from './objekt';
/**
 * @class
 */
export declare class Promize<T = Object, K = Object> {
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
    resolve(opt_data?: T | T[]): void;
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data?: K | K[]): void;
    /**
     * @param {!Function} resolve
     * @param {!Function=} opt_reject
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    then(resolve: (...T: any[]) => void, opt_reject?: (...K: any[]) => void, opt_complete?: () => void): void;
    /**
     * @param {!Deferred} defer
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    defer(defer: Deferred, opt_complete?: () => void): void;
}
