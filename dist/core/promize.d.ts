import { Objekt } from './objekt';
/**
 * @class
 */
export declare class Promize {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    _resolve(opt_data: any): void;
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    _reject(opt_data: any): void;
    /**
     * @param {!Function} resolve
     * @param {!Function=} opt_reject
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    then(resolve: any, opt_reject?: any, opt_complete?: any): void;
    /**
     * @param {!Deferred} defer
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    defer(defer: any, opt_complete?: any): void;
}
