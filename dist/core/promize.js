import { isArray, isFunction, noop } from '../utils/operation';
import { Objekt } from './objekt';
/**
 * @class
 */
export class Promize {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
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
    resolve(opt_data) {
        if (!isArray(opt_data)) {
            opt_data = opt_data ? [opt_data] : [];
        }
        if (isFunction(this.options.resolve) &&
            isFunction(this.options.complete)) {
            this.options.resolve.apply(this, opt_data);
            this.options.complete.apply(this, opt_data);
        }
        else {
            this.options.data = opt_data;
            this.options.status = true;
        }
    }
    /**
     * @param {*=} opt_data
     * @return {undefined}
     */
    reject(opt_data) {
        if (!isArray(opt_data)) {
            opt_data = opt_data ? [opt_data] : [];
        }
        if (isFunction(this.options.reject) &&
            isFunction(this.options.complete)) {
            this.options.reject.apply(this, opt_data);
            this.options.complete.apply(this, opt_data);
        }
        else {
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
    then(resolve, opt_reject, opt_complete) {
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
    defer(defer, opt_complete) {
        this.then((...args) => {
            defer.resolve(args);
        }, (...args) => {
            defer.reject(args);
        }, opt_complete);
    }
}
