import { Objekt } from '../core/objekt';
type EventCallback = (...args: any[]) => any;
/**
 * Publish/subscribe event system that uses an {@link Objekt} as the
 * internal event store. Each named event can have multiple callback
 * functions registered against it. Callbacks are invoked serially via
 * {@link Async} when the event is triggered, and the result is returned
 * as a {@link Promize}.
 *
 * EventBus supports four operations on callbacks: register
 * ({@link EventBus.set}), remove by reference ({@link EventBus.remove}),
 * remove the most recently registered ({@link EventBus.pop}), and invoke
 * all registered callbacks ({@link EventBus.call}). The
 * {@link EventBus.override} method provides a fallback pattern where a
 * default callback is used when no listeners have been registered.
 *
 * @example
 * const eventBus = new EventBus();
 *
 * const onUserLogin = eventBus.set('user.login', (user) => {
 *     console.log('User logged in:', user.get('name'));
 * });
 *
 * eventBus.call('user.login', [currentUser]);
 *
 * // Later, remove the specific callback
 * eventBus.remove('user.login', onUserLogin);
 *
 * @see {@link Async}
 * @see {@link Objekt}
 * @category Module
 */
export declare class EventBus {
    eventStore: Objekt;
    /**
     * Creates a new EventBus with an empty event store.
     */
    constructor();
    /**
     * Registers a callback function for the named event. If the callback
     * is a valid function, it is appended to the event's callback list.
     * The callback reference is returned so it can be passed to
     * {@link EventBus.remove} later.
     *
     * @param {string} name The event name (dot-notation supported via
     *     {@link Objekt}).
     * @param {EventCallback} callback The function to invoke when the event
     *     fires.
     * @returns {EventCallback} The registered callback (same reference as the
     *     input), useful for later removal.
     *
     * @example
     * const handler = eventBus.set('data.loaded', (items) => {
     *     console.log('Loaded', items.length, 'items');
     * });
     */
    set(name: string, callback: EventCallback): EventCallback;
    /**
     * Removes a specific callback from the named event's callback list.
     * Uses reference equality, so the exact function reference originally
     * passed to {@link EventBus.set} must be provided.
     *
     * @param {string} name The event name.
     * @param {EventCallback} callback The callback reference to remove.
     *
     * @example
     * eventBus.remove('data.loaded', handler);
     */
    remove(name: string, callback: EventCallback): void;
    /**
     * Removes the most recently registered callback for the named event.
     * This is a convenience method when the caller does not hold a
     * reference to the callback function.
     *
     * @param {string} name The event name.
     *
     * @example
     * eventBus.pop('data.loaded');
     */
    pop(name: string): void;
    /**
     * Invokes all callbacks registered for the named event in serial
     * order via {@link Async}. If no callbacks are registered, a single
     * no-op callback is executed. Returns a {@link Promize} that resolves
     * when all callbacks have completed.
     *
     * @param {string} name The event name to trigger.
     * @param {Array<any>} [opt_args] Arguments passed to each callback.
     * @returns {Promize} Resolves when all callbacks have been executed.
     *
     * @example
     * eventBus.call('app.ready', [config]).then(() => {
     *     console.log('All ready handlers complete');
     * });
     */
    call(name: string, opt_args?: Array<any> | undefined): import("..").Promize<object, object>;
    /**
     * Invokes the registered callbacks for the named event, or falls back
     * to the provided callback if no listeners have been registered. This
     * enables a pattern where the caller supplies default behavior that
     * can be overridden by event subscribers.
     *
     * @param {string} name The event name to trigger.
     * @param {Array<any>} args Arguments passed to each callback.
     * @param {EventCallback} callback The fallback callback used when no
     *     listeners are registered for the event.
     * @returns {Promize} Resolves when all callbacks have been executed.
     *
     * @example
     * eventBus.override('confirm.action', [message], (msg) => {
     *     return window.confirm(msg);
     * });
     */
    override(name: string, args: Array<any>, callback: EventCallback): import("..").Promize<object, object>;
}
export {};
