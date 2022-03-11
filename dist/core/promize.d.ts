import { Deferred } from './deferred';
import { Objekt } from './objekt';
/**
 * @class
 */
export declare class Promize {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: object | undefined);
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    _resolve(opt_data: any | undefined): void;
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    _reject(opt_data: any | undefined): void;
    /**
     * @param {!Function} resolve
     * @param {!Function=} opt_reject
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    then(resolve: Function, opt_reject?: Function, opt_complete?: Function): void;
    /**
     * @param {!Deferred} defer
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    defer(defer: Deferred, opt_complete?: Function): void;
}
