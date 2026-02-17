import { isUndefined, isFunction, eq, eachArray } from '../utils/operation';
import { consoleDebug } from '../utils/log';
import { Deferred } from './deferred';
/**
 * Provides serial and parallel execution of asynchronous function calls
 * using the framework's {@link Deferred}/{@link Promize} system rather than
 * native Promises.
 *
 * Functions passed to `parallel()` or `serial()` may return a
 * {@link Promize} (or any thenable) to signal asynchronous completion, or
 * return a synchronous value (including `undefined`) to proceed immediately.
 *
 * The `parallelFunction()` method supports dynamic, incremental additions
 * to an ongoing parallel batch when the total count is known ahead of time
 * (set via the constructor's `opt_sum` parameter). When the batch completes,
 * the overridable `eventComplete()` hook is called.
 *
 * @example
 * const async = new Async();
 *
 * // Serial execution: each function runs after the previous resolves
 * async.serial([
 *     () => fetchUser(),
 *     () => fetchPosts(),
 * ]).then((results) => {
 *     console.log('All done:', results);
 * });
 *
 * @example
 * const async = new Async();
 *
 * // Parallel execution: all functions run concurrently
 * async.parallel([
 *     () => loadImage('a.png'),
 *     () => loadImage('b.png'),
 * ]).then((results) => {
 *     console.log('Images loaded:', results);
 * });
 *
 * @see {@link Deferred}
 * @see {@link Promize}
 * @category Core
 */
export class Async {
    /**
     * Creates a new Async instance.
     *
     * @param opt_sum Optional expected count for parallel batch operations
     *     using `parallelFunction()`. When set, the batch completes once
     *     this many functions have finished.
     */
    constructor(opt_sum) {
        this.sum = opt_sum || 0;
        this._clear();
    }
    /**
     * Executes an array of functions concurrently. Each function may return
     * a {@link Promize} for asynchronous work or a synchronous value. The
     * returned promise resolves with an array of results (one per function)
     * once all functions have completed, or rejects if any function fails.
     *
     * @param calls Array of functions to execute in parallel.
     * @param opt_args Optional arguments array passed to each function call.
     *     When provided, the results array in the resolution will contain
     *     these args instead of the individual function results.
     * @returns A {@link Promize} that resolves with the collected results.
     *
     * @example
     * const async = new Async();
     * async.parallel([
     *     () => loadResource('config.json'),
     *     () => loadResource('data.json'),
     * ]).then((results) => {
     *     const [config, data] = results;
     * });
     */
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
    /**
     * Adds a single function to an ongoing parallel batch. Unlike
     * `parallel()`, this method does not return a promise; instead, the
     * overridable `eventComplete()` hook is called when all expected
     * functions (determined by the constructor's `opt_sum`) have finished.
     *
     * This is useful for dynamic, incremental parallel execution where
     * functions are added one at a time rather than all at once.
     *
     * @param call The function to execute as part of the parallel batch.
     * @param opt_args Optional arguments array passed to the function.
     * @param opt_index Optional explicit index for storing the result.
     *     If omitted, an auto-incrementing counter is used.
     *
     * @example
     * const async = new Async(3);
     * async.eventComplete = (isError, results) => {
     *     console.log('Batch complete:', results);
     * };
     *
     * async.parallelFunction(() => loadItem(1));
     * async.parallelFunction(() => loadItem(2));
     * async.parallelFunction(() => loadItem(3));
     */
    parallelFunction(call, opt_args, opt_index) {
        const index = !isUndefined(opt_index) ? opt_index : this.call.counter++;
        this.call.results[index] = null;
        this._parallelWrapper(call, this.sum, true, index, opt_args);
    }
    /**
     * Wraps a single parallel function call, handling both thenable and
     * synchronous return values, and forwarding results to
     * `_parallelCaller()`.
     *
     * @param call The function to execute.
     * @param length Total number of expected parallel completions.
     * @param allowEvent Whether to fire `eventComplete()` instead of
     *     resolving/rejecting the deferred.
     * @param index The result index for this function.
     * @param opt_args Optional arguments passed through to the function.
     * @returns A {@link Promize} that settles when this function's result
     *     has been recorded.
     */
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
    /**
     * Records a single parallel function's result and checks whether all
     * expected functions have completed. When the batch is complete, either
     * resolves/rejects the deferred or fires `eventComplete()` depending
     * on the `allowEvent` flag.
     *
     * @param length Total number of expected parallel completions.
     * @param isError Whether this function's execution resulted in an error.
     * @param result The result or error value from the function.
     * @param allowEvent Whether to fire `eventComplete()` instead of
     *     settling the deferred.
     * @param index The result index for this function.
     * @param opt_args Optional arguments used as the results payload when
     *     provided (overrides the collected results array).
     * @returns A {@link Promize} that settles when the batch check completes.
     */
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
    /**
     * Resets the internal call tracking state to its initial values.
     */
    _clear() {
        this.call = {
            sum: 0,
            isError: false,
            counter: 0,
            results: [],
        };
    }
    /**
     * Manually sets the internal counter state. This is primarily used for
     * testing or external control scenarios where the internal tracking
     * needs to be adjusted without going through the normal execution flow.
     *
     * @param sum The current completed count.
     * @param isError Whether an error has occurred in the batch.
     * @param counter The auto-increment counter for `parallelFunction()`.
     * @param results The current results array.
     *
     * @example
     * const async = new Async(5);
     * async.setStatus(2, false, 2, [resultA, resultB]);
     */
    setStatus(sum, isError, counter, results) {
        this.call.sum = sum;
        this.call.isError = isError;
        this.call.counter = counter;
        this.call.results = results;
    }
    /**
     * Overridable hook called when a parallel batch started via
     * `parallelFunction()` completes (i.e., all expected functions have
     * finished). Override this method to handle batch completion events.
     *
     * @param isError Whether any function in the batch produced an error.
     * @param results Array of results from all functions in the batch.
     *
     * @example
     * const async = new Async(2);
     * async.eventComplete = (isError, results) => {
     *     if (!isError) {
     *         console.log('All parallel functions completed:', results);
     *     }
     * };
     */
    eventComplete(isError, results) {
        consoleDebug('Async.eventComplete(isError, results)', isError, results);
    }
    /**
     * Executes an array of functions sequentially, one after another. Each
     * function receives the optional args concatenated with accumulated
     * results from previous functions. The returned promise resolves with
     * the collected results array once all functions have completed, or
     * rejects on the first failure.
     *
     * @param calls Array of functions to execute in order.
     * @param opt_args Optional arguments array passed to each function
     *     call and used as the results payload when provided.
     * @returns A {@link Promize} that resolves with the collected results.
     *
     * @example
     * const async = new Async();
     * async.serial([
     *     () => authenticate(),
     *     () => loadUserProfile(),
     *     () => loadDashboard(),
     * ]).then(
     *     (results) => console.log('All steps complete:', results),
     *     (error) => console.error('Step failed:', error),
     * );
     */
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
    /**
     * Wraps a single serial step, executing the function at the given index
     * and forwarding its result to `_serialCaller()` for chain continuation.
     *
     * @param calls The full array of serial functions.
     * @param index The current step index to execute.
     * @param opt_args Optional arguments passed through to each function.
     * @returns A {@link Promize} that settles when this step completes.
     */
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
    /**
     * Records the result of a serial step and either advances to the next
     * step or resolves the chain if all steps are complete.
     *
     * @param calls The full array of serial functions.
     * @param index The index of the step that just completed.
     * @param result The result value from the completed step.
     * @param opt_args Optional arguments passed through for chain
     *     continuation.
     * @returns A {@link Promize} that settles when the chain progresses.
     */
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
