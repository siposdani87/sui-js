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
export class Emitter {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._listeners = new Map();
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(eventName, handler) {
        if (!this._listeners.has(eventName)) {
            this._listeners.set(eventName, []);
        }
        this._listeners.get(eventName).push(handler);
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(eventName, opt_handler) {
        if (!opt_handler) {
            this._listeners.delete(eventName);
        }
        else {
            const handlers = this._listeners.get(eventName);
            if (handlers) {
                const index = handlers.indexOf(opt_handler);
                if (index !== -1) {
                    handlers.splice(index, 1);
                }
            }
        }
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(eventName, ...args) {
        const handlers = this._listeners.get(eventName);
        if (!handlers || handlers.length === 0) {
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result;
        for (const handler of handlers) {
            result = handler(...args);
        }
        return result;
    }
}
