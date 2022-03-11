import { isArray, isFunction, noop } from '../utils/operation';
import { Deferred } from './deferred';
import { Objekt } from './objekt';

/**
 * @class
 */
export class Promize {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
     _setOptions(opt_options: object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            status: null,
            data: null,
            resolve: null,
            reject: null,
            complete: null,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    _resolve(opt_data: any | undefined): void {
        if (!isArray(opt_data)) {
            opt_data = [opt_data];
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
    _reject(opt_data: any | undefined): void {
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
        resolve: Function,
        opt_reject?: Function,
        opt_complete?: Function,
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
    defer(defer: Deferred, opt_complete?: Function): void {
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
