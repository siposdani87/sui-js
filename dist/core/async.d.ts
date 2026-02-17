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
export declare class Async {
    sum: number;
    call: {
        results: any[];
        counter: number;
        sum: number;
        isError: boolean;
    };
    /**
     * Creates a new Async instance.
     *
     * @param opt_sum Optional expected count for parallel batch operations
     *     using `parallelFunction()`. When set, the batch completes once
     *     this many functions have finished.
     */
    constructor(opt_sum?: number);
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
    parallel(calls: Array<Function>, opt_args?: Array<any>): import("./promize").Promize<object, object>;
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
    parallelFunction(call: Function, opt_args?: Array<any>, opt_index?: number): void;
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
    private _parallelWrapper;
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
    private _parallelCaller;
    /**
     * Resets the internal call tracking state to its initial values.
     */
    private _clear;
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
    setStatus(sum: number, isError: boolean, counter: number, results: Array<any>): void;
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
    eventComplete(isError: boolean, results: Array<any>): void;
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
    serial(calls: Array<Function>, opt_args?: Array<any>): import("./promize").Promize<object, object>;
    /**
     * Wraps a single serial step, executing the function at the given index
     * and forwarding its result to `_serialCaller()` for chain continuation.
     *
     * @param calls The full array of serial functions.
     * @param index The current step index to execute.
     * @param opt_args Optional arguments passed through to each function.
     * @returns A {@link Promize} that settles when this step completes.
     */
    private _serialWrapper;
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
    private _serialCaller;
}
