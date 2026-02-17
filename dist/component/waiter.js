/**
 * @description Debounce/delay utility for input waiting and scheduled callbacks. Provides both
 * simple (counter-based) and advanced (floating-point counter) debounce mechanisms
 * with pause/resume support.
 *
 * @example
 * const waiter = new Waiter();
 * waiter.advancedWaiting(() => search(query), 500);
 *
 * @category Component
 */
export class Waiter {
    /**
     * @description Creates a new Waiter with zeroed counters.
     */
    constructor() {
        this.timeoutWaiting = 0;
        this.counter = 0;
    }
    /**
     * @description Schedules a callback after a debounce delay. Each call resets the timer;
     * the callback only fires when no new calls arrive within the duration.
     * @param {Function} callback - The function to execute after the delay.
     * @param {number} [opt_duration] - Delay in milliseconds (defaults to 3000).
     *
     * @example
     * input.addEventListener('keyup', () => {
     *     waiter.advancedWaiting(() => fetchResults(input.value), 500);
     * });
     */
    advancedWaiting(callback, opt_duration) {
        const duration = opt_duration || 3000;
        this._advancedDelayHandler(callback, duration, this.timeoutWaiting);
    }
    /**
     * @description Internal handler that compares counter snapshots after the delay to determine if the callback should fire.
     * @param {Function} callback - The function to execute.
     * @param {number} duration - Delay in milliseconds.
     * @param {number} counter - The counter snapshot at the time of scheduling.
     */
    _advancedDelayHandler(callback, duration, counter) {
        this.timeoutWaiting += 0.0001;
        setTimeout(() => {
            const prevCounter = this.timeoutWaiting - 0.0001;
            if (prevCounter.toFixed(4) === counter.toFixed(4)) {
                this.timeoutWaiting = 0;
                callback();
            }
        }, duration);
    }
    /**
     * @description Pauses the advanced waiting mechanism by continuously incrementing the counter,
     * preventing any pending callback from firing.
     *
     * @example
     * waiter.stopAdvancedWaiting(); // Pause debounce
     */
    stopAdvancedWaiting() {
        this.timeoutWaiting += 0.0001;
        this.intervall = setInterval(() => {
            this.timeoutWaiting += 0.0001;
        }, 1000);
    }
    /**
     * @description Resumes the advanced waiting mechanism by stopping the interval and
     * decrementing the counter to allow the pending callback to fire.
     *
     * @example
     * waiter.startAdvancedWaiting(); // Resume debounce
     */
    startAdvancedWaiting() {
        clearInterval(this.intervall);
        this.timeoutWaiting -= 0.0001;
    }
    /**
     * @description Schedules a callback using a simple integer-counter debounce mechanism.
     * @param {Function} callback - The function to execute after the delay.
     * @param {number} [opt_duration] - Delay in milliseconds (defaults to 3000).
     *
     * @example
     * waiter.simpleWaiting(() => save(), 1000);
     */
    simpleWaiting(callback, opt_duration) {
        const duration = opt_duration || 3000;
        this._simpleDelayHandler(callback, duration, this.counter);
    }
    /**
     * @description Internal handler that compares integer counter snapshots to determine if the callback should fire.
     * @param {Function} callback - The function to execute.
     * @param {number} duration - Delay in milliseconds.
     * @param {number} counter - The counter snapshot at the time of scheduling.
     */
    _simpleDelayHandler(callback, duration, counter) {
        this.counter++;
        setTimeout(() => {
            const prevCounter = this.counter - 1;
            if (counter === prevCounter) {
                this.counter = 0;
                callback();
            }
        }, duration);
    }
}
