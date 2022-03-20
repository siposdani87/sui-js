import {
    each,
    isUndefined,
    isFunction,
    eq,
    copyArray,
} from '../utils/operation';
import { consoleWarn } from '../utils/log';
import { Deferred } from './deferred';
import { Promize } from './promize';

/**
 * @class
 */
export class Async {
    sum: number;
    call: any;
    /**
     * @param {number=} opt_sum
     */
    constructor(opt_sum?: number) {
        this.sum = opt_sum || 0;
        this._clear();
    }
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    parallel(
        calls: Array<Function>,
        opt_args: Array<any> | undefined,
    ): Promize {
        const deferred = new Deferred();
        if (calls.length === 0) {
            const results = opt_args || this.call.results;
            deferred.resolve(results);
            this._clear();
        } else {
            each(calls, (call, index) => {
                this.call.results[index] = null;
                this._parallelWrapper(
                    call,
                    calls.length,
                    false,
                    index,
                    opt_args,
                ).defer(deferred);
            });
        }
        return deferred.promise();
    }
    /**
     * @param {!Function} call
     * @param {?Array=} opt_args
     * @param {number=} opt_index
     * @return {undefined}
     */
    parallelFunction(
        call: Function,
        opt_args?: Array<any> | null,
        opt_index?: number,
    ): void {
        const index = !isUndefined(opt_index)
            ? /** @type {number} */(opt_index)
            : this.call.counter++;
        this.call.results[index] = null;
        this._parallelWrapper(call, this.sum, true, index, opt_args);
    }
    /**
     * @private
     * @param {!Function} call
     * @param {number} length
     * @param {boolean} allowEvent
     * @param {number} index
     * @param {?Array=} opt_args
     * @return {!Promize}
     */
    _parallelWrapper(
        call: Function,
        length: number,
        allowEvent: boolean,
        index: number,
        opt_args?: (Array<any> | null) | undefined,
    ): Promize {
        const deferred = new Deferred();
        const args = opt_args || [];
        const promise = call.apply(this, args);
        if (promise && isFunction(promise.then)) {
            promise.then(
                (object) => {
                    this._parallelCaller(
                        length,
                        false,
                        object,
                        allowEvent,
                        index,
                        opt_args,
                    ).defer(deferred);
                },
                (object) => {
                    this._parallelCaller(
                        length,
                        true,
                        object,
                        allowEvent,
                        index,
                        opt_args,
                    ).defer(deferred);
                },
            );
        } else if (promise || isUndefined(promise)) {
            this._parallelCaller(
                length,
                false,
                promise,
                allowEvent,
                index,
                opt_args,
            ).defer(deferred);
        } else {
            this._parallelCaller(
                length,
                true,
                promise,
                allowEvent,
                index,
                opt_args,
            ).defer(deferred);
        }
        return deferred.promise();
    }
    /**
     * @private
     * @param {number|undefined} length
     * @param {boolean} isError
     * @param {*} result
     * @param {boolean} allowEvent
     * @param {number} index
     * @param {?Array=} opt_args
     * @return {!Promize}
     */
    _parallelCaller(
        length: number | undefined,
        isError: boolean,
        result: any,
        allowEvent: boolean,
        index: number,
        opt_args?: (Array<any> | null) | undefined,
    ): Promize {
        const deferred = new Deferred();
        this.call.results[index] = result;
        if (isError) {
            this.call.isError = isError;
        }
        this.call.sum++;
        if (eq(this.call.sum, length)) {
            const results = opt_args || copyArray(this.call.results);
            this._clear();
            if (!this.call.isError) {
                if (allowEvent) {
                    this.eventComplete(this.call.isError, results);
                } else {
                    deferred.resolve(results);
                }
            } else {
                if (allowEvent) {
                    this.eventComplete(this.call.isError, results);
                } else {
                    deferred.reject(results);
                }
            }
        }
        return deferred.promise();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _clear(): void {
        this.call = {
            sum: 0,
            isError: false,
            counter: 0,
            results: [],
        };
    }
    /**
     * @param {number} sum
     * @param {boolean} isError
     * @param {number} counter
     * @param {!Array} results
     * @return {undefined}
     */
    setStatus(
        sum: number,
        isError: boolean,
        counter: number,
        results: Array<any>,
    ): void {
        this.call.sum = sum;
        this.call.isError = isError;
        this.call.counter = counter;
        this.call.results = results;
    }
    /**
     * @param {boolean} isError
     * @param {!Array} results
     * @return {undefined}
     */
    eventComplete(isError: boolean, results: Array<any>): void {
        consoleWarn('Async.eventComplete(isError, results)', isError, results);
    }
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    serial(calls: Array<Function>, opt_args?: Array<any> | undefined): Promize {
        const deferred = new Deferred();
        if (calls.length === 0) {
            const results = opt_args || this.call.results;
            deferred.resolve(results);
            this._clear();
        } else {
            this._serialWrapper(calls, 0, opt_args).defer(deferred);
        }
        return deferred.promise();
    }
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    _serialWrapper(
        calls: Array<Function>,
        index: number,
        opt_args?: Array<any> | undefined,
    ): Promize {
        const deferred = new Deferred();
        const call = calls[index];
        const results = opt_args || this.call.results;
        const args = (opt_args || []).concat(this.call.results);
        const promise = call.apply(this, args);
        if (promise && isFunction(promise.then)) {
            promise.then(
                (result) => {
                    this._serialCaller(calls, index, result, opt_args).defer(
                        deferred,
                    );
                },
                () => {
                    const results = opt_args || this.call.results;
                    deferred.reject(results);
                    this._clear();
                },
            );
        } else if (promise || isUndefined(promise)) {
            this._serialCaller(calls, index, promise, opt_args).defer(deferred);
        } else {
            deferred.reject(results);
            this._clear();
        }
        return deferred.promise();
    }
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {*} result
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    _serialCaller(
        calls: Array<Function>,
        index: number,
        result: any,
        opt_args?: Array<any> | undefined,
    ): Promize {
        const deferred = new Deferred();
        this.call.results[index] = result;
        const nextIndex = index + 1;
        if (nextIndex < calls.length) {
            this._serialWrapper(calls, nextIndex, opt_args).defer(deferred);
        } else {
            const results = opt_args || this.call.results;
            deferred.resolve(results);
            this._clear();
        }
        return deferred.promise();
    }
}
