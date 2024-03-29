import { isUndefined, isFunction, eq, eachArray } from '../utils/operation';
import { consoleDebug } from '../utils/log';
import { Deferred } from './deferred';
export class Async {
    constructor(opt_sum) {
        this.sum = opt_sum || 0;
        this._clear();
    }
    parallel(calls, opt_args) {
        const deferred = new Deferred();
        if (calls.length === 0) {
            const results = opt_args || this.call.results;
            deferred.resolve(results);
            this._clear();
        }
        else {
            eachArray(calls, (call, index) => {
                this.call.results[index] = null;
                this._parallelWrapper(call, calls.length, false, index, opt_args).defer(deferred);
            });
        }
        return deferred.promise();
    }
    parallelFunction(call, opt_args, opt_index) {
        const index = !isUndefined(opt_index) ? opt_index : this.call.counter++;
        this.call.results[index] = null;
        this._parallelWrapper(call, this.sum, true, index, opt_args);
    }
    _parallelWrapper(call, length, allowEvent, index, opt_args) {
        const deferred = new Deferred();
        const args = opt_args || [];
        const promise = call.apply(this, args);
        if (promise && isFunction(promise.then)) {
            promise.then((object) => {
                this._parallelCaller(length, false, object, allowEvent, index, opt_args).defer(deferred);
            }, (object) => {
                this._parallelCaller(length, true, object, allowEvent, index, opt_args).defer(deferred);
            });
        }
        else if (promise || isUndefined(promise)) {
            this._parallelCaller(length, false, promise, allowEvent, index, opt_args).defer(deferred);
        }
        else {
            this._parallelCaller(length, true, promise, allowEvent, index, opt_args).defer(deferred);
        }
        return deferred.promise();
    }
    _parallelCaller(length, isError, result, allowEvent, index, opt_args) {
        const deferred = new Deferred();
        this.call.results[index] = result;
        if (isError) {
            this.call.isError = isError;
        }
        this.call.sum++;
        if (eq(this.call.sum, length)) {
            const results = opt_args || [...this.call.results];
            this._clear();
            if (!this.call.isError) {
                if (allowEvent) {
                    this.eventComplete(this.call.isError, results);
                }
                else {
                    deferred.resolve(results);
                }
            }
            else {
                if (allowEvent) {
                    this.eventComplete(this.call.isError, results);
                }
                else {
                    deferred.reject(results);
                }
            }
        }
        return deferred.promise();
    }
    _clear() {
        this.call = {
            sum: 0,
            isError: false,
            counter: 0,
            results: [],
        };
    }
    setStatus(sum, isError, counter, results) {
        this.call.sum = sum;
        this.call.isError = isError;
        this.call.counter = counter;
        this.call.results = results;
    }
    eventComplete(isError, results) {
        consoleDebug('Async.eventComplete(isError, results)', isError, results);
    }
    serial(calls, opt_args) {
        const deferred = new Deferred();
        if (calls.length === 0) {
            const results = opt_args || this.call.results;
            deferred.resolve(results);
            this._clear();
        }
        else {
            this._serialWrapper(calls, 0, opt_args).defer(deferred);
        }
        return deferred.promise();
    }
    _serialWrapper(calls, index, opt_args) {
        const deferred = new Deferred();
        const call = calls[index];
        const results = opt_args || this.call.results;
        const args = (opt_args || []).concat(this.call.results);
        const promise = call.apply(this, args);
        if (promise && isFunction(promise.then)) {
            promise.then((result) => {
                this._serialCaller(calls, index, result, opt_args).defer(deferred);
            }, () => {
                const results = opt_args || this.call.results;
                deferred.reject(results);
                this._clear();
            });
        }
        else if (promise || isUndefined(promise)) {
            this._serialCaller(calls, index, promise, opt_args).defer(deferred);
        }
        else {
            deferred.reject(results);
            this._clear();
        }
        return deferred.promise();
    }
    _serialCaller(calls, index, result, opt_args) {
        const deferred = new Deferred();
        this.call.results[index] = result;
        const nextIndex = index + 1;
        if (nextIndex < calls.length) {
            this._serialWrapper(calls, nextIndex, opt_args).defer(deferred);
        }
        else {
            const results = opt_args || this.call.results;
            deferred.resolve(results);
            this._clear();
        }
        return deferred.promise();
    }
}
