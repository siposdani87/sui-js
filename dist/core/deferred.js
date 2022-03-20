import { Promize } from './promize';
/**
 * @class
 */
export class Deferred {
    /**
     */
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
     * @param {*=} opt_object
     * @return {undefined}
     */
    resolve(opt_object) {
        this._promise.resolve(opt_object);
    }
    /**
     * @param {*=} opt_object
     * @return {undefined}
     */
    reject(opt_object) {
        this._promise.reject(opt_object);
    }
}
