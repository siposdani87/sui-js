/**
 * Base class providing a simple event emitter pattern. Classes extending
 * Emitter gain `on()`, `off()`, and `emit()` methods for registering,
 * removing, and firing event handlers.
 *
 * This replaces the previous mutable callback property pattern
 * (`obj.eventFoo = handler`) with a standard emitter API
 * (`obj.on('foo', handler)`).
 *
 * @example
 * class MyComponent extends Emitter {
 *     doSomething(): void {
 *         this.emit('change', 'newValue', 'oldValue');
 *     }
 * }
 *
 * const component = new MyComponent();
 * component.on('change', (newVal, oldVal) => {
 *     console.log('Changed from', oldVal, 'to', newVal);
 * });
 *
 * @category Core
 */
export declare class Emitter {
    private _listeners;
    /**
     * Registers an event handler for the given event name.
     *
     * @param {string} eventName The event name to listen for.
     * @param {Function} handler The callback function to invoke when the
     *     event is emitted.
     *
     * @example
     * field.on('change', (value, previousValue) => {
     *     console.log('Changed:', value);
     * });
     */
    on(eventName: string, handler: (...args: any[]) => any): void;
    /**
     * Removes event handlers for the given event name. If a specific
     * handler is provided, only that handler is removed. Otherwise all
     * handlers for the event are removed.
     *
     * @param {string} eventName The event name to remove handlers for.
     * @param {Function} [opt_handler] A specific handler to remove. If
     *     omitted, all handlers for the event are removed.
     *
     * @example
     * field.off('change');
     * field.off('change', specificHandler);
     */
    off(eventName: string, opt_handler?: (...args: any[]) => any): void;
    /**
     * Emits an event, calling all registered handlers with the provided
     * arguments. Returns the result of the last handler called, or
     * undefined if no handlers are registered.
     *
     * @param {string} eventName The event name to emit.
     * @param {...*} args Arguments to pass to each handler.
     * @returns {*} The return value of the last handler, or undefined.
     *
     * @example
     * this.emit('change', newValue, oldValue);
     */
    emit(eventName: string, ...args: any[]): any;
}
