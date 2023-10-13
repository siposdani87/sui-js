import { Promize } from './promize';
/**
 * @class
 */
export class Deferred {
    constructor() {
        this._promise = new Promize();
    }
    /**
     * @return {!Promize}
     */
    promise() {
        return this._promise;
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    resolve(opt_data) {
        this._promise.resolve(opt_data);
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data) {
        this._promise.reject(opt_data);
    }
}
