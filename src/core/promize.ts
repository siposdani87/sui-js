import { is, isFunction, noop } from '../utils/operation';
import { Deferred } from './deferred';
import { Objekt } from './objekt';

/**
 * @class
 */
export class Promize<T, K> {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({
            status: null,
            data: null,
            resolve: null,
            reject: null,
            complete: null,
        });
        this.options.merge(opt_options);
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    resolve(opt_data?: T): void {
        let data = [];
        if (opt_data && !is(opt_data, 'array')) {
            data = [opt_data];
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
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data?: K): void {
        let data = [];
        if (opt_data && !is(opt_data, 'array')) {
            data = [opt_data];
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
    /**
     * @param {!Function} resolve
     * @param {!Function=} opt_reject
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
    then(
        resolve: (...args: T extends Array<any> ? T : [T]) => void,
        opt_reject?: (...args: T extends Array<any> ? T : [T]) => void,
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
    /**
     * @param {!Deferred} defer
     * @param {!Function=} opt_complete
     * @return {undefined}
     */
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
