import { Promize } from './promize';

export class Deferred<T = object, K = object> {
    private _promise: Promize<T, K>;

    constructor() {
        this._promise = new Promize<T, K>();
    }

    promise(): Promize<T, K> {
        return this._promise;
    }

    resolve(opt_data?: T): void {
        this._promise.resolve(opt_data);
    }

    reject(opt_data?: K): void {
        this._promise.reject(opt_data);
    }
}
