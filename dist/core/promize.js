import { isArray, isFunction, noop } from '../utils/operation';
import { Objekt } from './objekt';
export class Promize {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
    }
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
    resolve(opt_data) {
        let data = [];
        if (opt_data) {
            data = isArray(opt_data) ? opt_data : [opt_data];
        }
        if (isFunction(this.options.resolve) &&
            isFunction(this.options.complete)) {
            this.options.resolve.apply(this, data);
            this.options.complete.apply(this, data);
        }
        else {
            this.options.data = data;
            this.options.status = true;
        }
    }
    reject(opt_data) {
        let data = [];
        if (opt_data) {
            data = isArray(opt_data) ? opt_data : [opt_data];
        }
        if (isFunction(this.options.reject) &&
            isFunction(this.options.complete)) {
            this.options.reject.apply(this, data);
            this.options.complete.apply(this, data);
        }
        else {
            this.options.data = data;
            this.options.status = false;
        }
    }
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
    defer(defer, opt_complete) {
        this.then((...args) => {
            defer.resolve(args);
        }, (...args) => {
            defer.reject(args);
        }, opt_complete);
    }
}
