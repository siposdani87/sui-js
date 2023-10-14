import { Promize } from './promize';
/**
 * @class
 */
export declare class Deferred<T = Object, K = Object> {
    private _promise;
    constructor();
    /**
     * @return {!Promize}
     */
    promise(): Promize<T, K>;
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
}
