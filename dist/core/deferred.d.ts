import { Promize } from './promize';
/**
 * A deferred pattern wrapper around {@link Promize} that separates promise
 * creation from resolution. The Deferred holds an internal {@link Promize}
 * and exposes `resolve()` and `reject()` methods so that the promise can be
 * settled from outside the callback scope.
 *
 * This is the primary mechanism used throughout the framework to create
 * resolvable promises from within asynchronous flows such as
 * {@link Async} serial/parallel execution and controller lifecycle events.
 *
 * @example
 * const deferred = new Deferred<string, Error>();
 * const promise = deferred.promise();
 *
 * promise.then(
 *     (message) => console.log('Resolved:', message),
 *     (error) => console.error('Rejected:', error),
 * );
 *
 * // Resolve later from any scope that has a reference to the deferred
 * deferred.resolve('Operation complete');
 *
 * @see {@link Promize}
 * @see {@link Async}
 * @category Core
 */
export declare class Deferred<T = object, K = object> {
    private _promise;
    /**
     * Creates a new Deferred instance with an unsettled {@link Promize}.
     */
    constructor();
    /**
     * Returns the underlying {@link Promize} instance so that consumers can
     * register `then()` callbacks without having access to the resolve/reject
     * controls.
     *
     * @returns The internal {@link Promize} associated with this deferred.
     *
     * @example
     * const deferred = new Deferred<number>();
     * const promise = deferred.promise();
     * promise.then((value) => console.log(value));
     * deferred.resolve(42);
     */
    promise(): Promize<T, K>;
    /**
     * Resolves the deferred's {@link Promize} with the given data, triggering
     * any registered resolve and complete callbacks.
     *
     * @param opt_data Optional data to pass to the resolve callback.
     *
     * @example
     * const deferred = new Deferred<string>();
     * deferred.promise().then((msg) => console.log(msg));
     * deferred.resolve('Done');
     */
    resolve(opt_data?: T): void;
    /**
     * Rejects the deferred's {@link Promize} with the given data, triggering
     * any registered reject and complete callbacks.
     *
     * @param opt_data Optional data to pass to the reject callback.
     *
     * @example
     * const deferred = new Deferred<string, Error>();
     * deferred.promise().then(null, (err) => console.error(err));
     * deferred.reject(new Error('Something went wrong'));
     */
    reject(opt_data?: K): void;
}
