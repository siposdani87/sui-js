import { Promize } from './promize';
/**
 * @class
 */
export declare class Deferred {
    _promise: Promize;
    /**
     */
    constructor();
    /**
     * @return {!Promize}
     */
    promise(): Promize;
    /**
     * @param {*=} opt_object
     * @return {undefined}
     */
    resolve(opt_object?: any): void;
    /**
     * @param {*=} opt_object
     * @return {undefined}
     */
    reject(opt_object?: any): void;
}
