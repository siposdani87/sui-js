import { Promize } from './promize';

/**
 * @class
 */
export class Deferred<T = Object, K = Object> {
    private _promise: Promize<T, K>;

    constructor() {
        this._promise = new Promize<T, K>();
    }
    /**
     * @return {!Promize}
     */
    promise(): Promize<T, K> {
        return this._promise;
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    resolve(opt_data?: T | T[]): void {
        this._promise.resolve(opt_data);
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data?: K | K[]): void {
        this._promise.reject(opt_data);
    }
}
