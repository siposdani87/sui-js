import { isArray, isFunction, noop } from '../utils/operation';
import { Deferred } from './deferred';
import { Objekt } from './objekt';

export class Promize<T = object, K = object> {
    options!: Objekt;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            status: null,
            data: null,
            resolve: null,
            reject: null,
            complete: null,
        });
        this.options.merge(opt_options);
    }

    resolve(opt_data?: T): void {
        let data: any[] = [];
        if (opt_data) {
            data = isArray(opt_data) ? opt_data : [opt_data];
        }
        if (
            isFunction(this.options.resolve) &&
            isFunction(this.options.complete)
        ) {
            this.options.resolve.apply(this, data);
            this.options.complete.apply(this, data);
        } else {
            this.options.data = data;
            this.options.status = true;
        }
    }

    reject(opt_data?: K): void {
        let data: any[] = [];
        if (opt_data) {
            data = isArray(opt_data) ? opt_data : [opt_data];
        }
        if (
            isFunction(this.options.reject) &&
            isFunction(this.options.complete)
        ) {
            this.options.reject.apply(this, data);
            this.options.complete.apply(this, data);
        } else {
            this.options.data = data;
            this.options.status = false;
        }
    }

    then(
        resolve: (...args: T extends Array<any> ? T : [T]) => void,
        opt_reject?: (...args: K extends Array<any> ? K : [K]) => void,
        opt_complete?: (...args: T extends Array<any> ? T : [T]) => void,
    ): void {
        const reject = opt_reject || noop();
        const complete = opt_complete || noop();
        switch (this.options.status) {
            case true:
                resolve.apply(this, this.options.data);
                complete.apply(this, this.options.data);
                break;
            case false:
                reject.apply(this, this.options.data);
                complete.apply(this, this.options.data);
                break;
            default:
                this.options.merge({
                    resolve: resolve,
                    reject: reject,
                    complete: complete,
                });
        }
    }

    defer(defer: Deferred, opt_complete?: () => void): void {
        this.then(
            (...args) => {
                defer.resolve(args);
            },
            (...args) => {
                defer.reject(args);
            },
            opt_complete,
        );
    }
}
