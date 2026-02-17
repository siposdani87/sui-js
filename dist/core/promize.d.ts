import { Deferred } from './deferred';
import { Objekt } from './objekt';
/**
 * The framework's custom promise implementation, used instead of native
 * `Promise` throughout the codebase. Promize supports resolve/reject
 * semantics with deferred callback registration: callbacks can be attached
 * before or after the promise has been settled.
 *
 * Data is stored and passed as arrays to support multi-argument callback
 * invocation. The generic type parameters `T` (resolve data) and `K`
 * (reject data) provide type safety for the callback signatures.
 *
 * Promize works in tandem with {@link Deferred}, which wraps a Promize and
 * exposes its resolve/reject controls externally, and with {@link Async},
 * which orchestrates serial and parallel execution of Promize-returning
 * functions.
 *
 * @example
 * const promize = new Promize<string, Error>();
 *
 * promize.then(
 *     (message) => console.log('Resolved:', message),
 *     (error) => console.error('Rejected:', error),
 *     () => console.log('Complete'),
 * );
 *
 * promize.resolve('Success');
 *
 * @see {@link Deferred}
 * @see {@link Async}
 * @category Core
 */
export declare class Promize<T = object, K = object> {
    options: Objekt;
    /**
     * Creates a new Promize instance in an unsettled state.
     *
     * @param opt_options Optional configuration object merged into the
     *     internal options. Typically left empty; used internally by the
     *     framework for advanced scenarios.
     */
    constructor(opt_options?: object | undefined);
    /**
     * Initializes the internal options with default values for status,
     * data, and callback slots, then merges any provided overrides.
     *
     * @param opt_options Optional configuration to merge into defaults.
     */
    private _setOptions;
    /**
     * Resolves the promise with the given data. If `then()` callbacks have
     * already been registered, they are invoked immediately. Otherwise the
     * data and settled status are stored so that callbacks registered via a
     * later `then()` call receive the data synchronously.
     *
     * @param opt_data Optional data to pass to the resolve callback.
     *     Non-array values are wrapped in an array for consistent
     *     multi-argument spreading.
     *
     * @example
     * const promize = new Promize<number>();
     * promize.then((value) => console.log(value));
     * promize.resolve(42); // logs: 42
     */
    resolve(opt_data?: T): void;
    /**
     * Rejects the promise with the given data. If `then()` callbacks have
     * already been registered, the reject and complete callbacks are invoked
     * immediately. Otherwise the data and rejected status are stored for
     * deferred delivery.
     *
     * @param opt_data Optional data to pass to the reject callback.
     *     Non-array values are wrapped in an array for consistent
     *     multi-argument spreading.
     *
     * @example
     * const promize = new Promize<string, Error>();
     * promize.then(null, (err) => console.error(err));
     * promize.reject(new Error('Failed'));
     */
    reject(opt_data?: K): void;
    /**
     * Registers resolve, reject, and complete callbacks on this promise.
     *
     * If the promise has already been settled (resolved or rejected), the
     * appropriate callbacks are invoked immediately with the stored data.
     * If the promise is still pending, the callbacks are stored and will be
     * invoked when `resolve()` or `reject()` is called.
     *
     * @param resolve Callback invoked when the promise is resolved.
     * @param opt_reject Callback invoked when the promise is rejected.
     *     Defaults to a no-op function.
     * @param opt_complete Callback invoked after either resolve or reject.
     *     Defaults to a no-op function.
     *
     * @example
     * const promize = new Promize<string, string>();
     *
     * // Register before settlement
     * promize.then(
     *     (msg) => console.log('OK:', msg),
     *     (err) => console.log('Error:', err),
     *     () => console.log('Done'),
     * );
     *
     * promize.resolve('Hello');
     * // logs: "OK: Hello" then "Done"
     */
    then(resolve: (...args: T extends Array<any> ? T : [T]) => void, opt_reject?: (...args: K extends Array<any> ? K : [K]) => void, opt_complete?: (...args: T extends Array<any> ? T : [T]) => void): void;
    /**
     * Chains this promise to a {@link Deferred}, forwarding the resolution
     * or rejection to the deferred's promise. This is used internally to
     * propagate results through {@link Async} execution chains.
     *
     * @param defer The {@link Deferred} instance to forward results to.
     * @param opt_complete Optional complete callback invoked after forwarding.
     *
     * @example
     * const deferred = new Deferred<string[]>();
     * const promize = new Promize<string>();
     *
     * promize.defer(deferred);
     * promize.resolve('result');
     * // deferred.promise() is now resolved with ['result']
     */
    defer(defer: Deferred, opt_complete?: () => void): void;
}
