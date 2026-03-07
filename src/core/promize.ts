import { isArray, noop } from '../utils/operation';
import type { Deferred } from './deferred';

/**
 * The framework's custom promise implementation, backed internally by a native
 * `Promise`. Promize supports resolve/reject semantics with deferred callback
 * registration: callbacks can be attached before or after the promise has been
 * settled.
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
export class Promize<T = object, K = object> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _nativePromise: Promise<any[]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _resolve!: (value: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _reject!: (value: any[]) => void;
    private _settled: boolean = false;

    /**
     * Creates a new Promize instance in an unsettled state, backed by
     * a native Promise internally.
     *
     * @param opt_options Optional configuration object. Kept for backward
     *     compatibility but ignored internally.
     */
    constructor(_opt_options: object | undefined = {}) {
        this._nativePromise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        // Prevent unhandled rejection crashes for Promize instances
        // that are rejected without a .then() handler registered
        this._nativePromise.catch(noop());
    }

    /**
     * Resolves the promise with the given data. Callbacks registered via
     * `then()` will be invoked on the microtask queue.
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
    resolve(opt_data?: T): void {
        if (this._settled) return;
        this._settled = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = opt_data
            ? (isArray(opt_data) ? opt_data : [opt_data])
            : [];
        this._resolve(data);
    }

    /**
     * Rejects the promise with the given data. Callbacks registered via
     * `then()` will be invoked on the microtask queue.
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
    reject(opt_data?: K): void {
        if (this._settled) return;
        this._settled = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = opt_data
            ? (isArray(opt_data) ? opt_data : [opt_data])
            : [];
        this._reject(data);
    }

    /**
     * Registers resolve, reject, and complete callbacks on this promise.
     *
     * Callbacks are always invoked asynchronously on the microtask queue,
     * whether the promise is already settled or still pending.
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
    then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve: (...args: T extends Array<any> ? T : [T]) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        opt_reject?: (...args: K extends Array<any> ? K : [K]) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        opt_complete?: (...args: T extends Array<any> ? T : [T]) => void,
    ): void {
        const reject = opt_reject || noop();
        const complete = opt_complete || noop();

        this._nativePromise.then(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data: any) => {
                resolve.apply(this, data);
                complete.apply(this, data);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data: any) => {
                reject.apply(this, data);
                complete.apply(this, data);
            },
        );
    }

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
