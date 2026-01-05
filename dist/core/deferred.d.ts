import { Promize } from './promize';
export declare class Deferred<T = object, K = object> {
    private _promise;
    constructor();
    promise(): Promize<T, K>;
    resolve(opt_data?: T): void;
    reject(opt_data?: K): void;
}
