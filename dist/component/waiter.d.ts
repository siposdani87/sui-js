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
export declare class Waiter {
    timeoutWaiting: number;
    counter: number;
    intervall: number;
    /**
     * @description Creates a new Waiter with zeroed counters.
     */
    constructor();
    /**
     * @description Schedules a callback after a debounce delay. Each call resets the timer;
     * the callback only fires when no new calls arrive within the duration.
     * @param {() => void} callback - The function to execute after the delay.
     * @param {number} [opt_duration] - Delay in milliseconds (defaults to 3000).
     *
     * @example
     * input.addEventListener('keyup', () => {
     *     waiter.advancedWaiting(() => fetchResults(input.value), 500);
     * });
     */
    advancedWaiting(callback: () => void, opt_duration: number | undefined): void;
    /**
     * @description Internal handler that compares counter snapshots after the delay to determine if the callback should fire.
     * @param {() => void} callback - The function to execute.
     * @param {number} duration - Delay in milliseconds.
     * @param {number} counter - The counter snapshot at the time of scheduling.
     */
    private _advancedDelayHandler;
    /**
     * @description Pauses the advanced waiting mechanism by continuously incrementing the counter,
     * preventing any pending callback from firing.
     *
     * @example
     * waiter.stopAdvancedWaiting(); // Pause debounce
     */
    stopAdvancedWaiting(): void;
    /**
     * @description Resumes the advanced waiting mechanism by stopping the interval and
     * decrementing the counter to allow the pending callback to fire.
     *
     * @example
     * waiter.startAdvancedWaiting(); // Resume debounce
     */
    startAdvancedWaiting(): void;
    /**
     * @description Schedules a callback using a simple integer-counter debounce mechanism.
     * @param {() => void} callback - The function to execute after the delay.
     * @param {number} [opt_duration] - Delay in milliseconds (defaults to 3000).
     *
     * @example
     * waiter.simpleWaiting(() => save(), 1000);
     */
    simpleWaiting(callback: () => void, opt_duration: number | undefined): void;
    /**
     * @description Internal handler that compares integer counter snapshots to determine if the callback should fire.
     * @param {() => void} callback - The function to execute.
     * @param {number} duration - Delay in milliseconds.
     * @param {number} counter - The counter snapshot at the time of scheduling.
     */
    private _simpleDelayHandler;
}
