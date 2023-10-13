import { isArray, isFunction, noop } from '../utils/operation';
import { Deferred } from './deferred';
import { Objekt } from './objekt';

/**
 * @class
 */
export class Promize<T = Object, K = Object> {
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
    resolve(opt_data?: T | T[]): void {
        if (!isArray(opt_data)) {
            opt_data = opt_data ? [opt_data] : [];
        }
        if (
            isFunction(this.options.resolve) &&
            isFunction(this.options.complete)
        ) {
            this.options.resolve.apply(this, opt_data);
            this.options.complete.apply(this, opt_data);
        } else {
            this.options.data = opt_data;
            this.options.status = true;
        }
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data?: K | K[]): void {
        if (!isArray(opt_data)) {
            opt_data = opt_data ? [opt_data] : [];
        }
        if (
            isFunction(this.options.reject) &&
            isFunction(this.options.complete)
        ) {
            this.options.reject.apply(this, opt_data);
            this.options.complete.apply(this, opt_data);
        } else {
            this.options.data = opt_data;
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
        resolve: (...T) => void,
        opt_reject?: (...K) => void,
        opt_complete?: () => void,
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
