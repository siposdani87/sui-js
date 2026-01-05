import { Deferred } from './deferred';
import { Objekt } from './objekt';
export declare class Promize<T = object, K = object> {
    options: Objekt;
    constructor(opt_options?: object | undefined);
    private _setOptions;
    resolve(opt_data?: T): void;
    reject(opt_data?: K): void;
    then(resolve: (...args: T extends Array<any> ? T : [T]) => void, opt_reject?: (...args: K extends Array<any> ? K : [K]) => void, opt_complete?: (...args: T extends Array<any> ? T : [T]) => void): void;
    defer(defer: Deferred, opt_complete?: () => void): void;
}
