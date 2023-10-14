import { Promize } from './promize';
export class Deferred {
    constructor() {
        this._promise = new Promize();
    }
    promise() {
        return this._promise;
    }
    resolve(opt_data) {
        this._promise.resolve(opt_data);
    }
    reject(opt_data) {
        this._promise.reject(opt_data);
    }
}
