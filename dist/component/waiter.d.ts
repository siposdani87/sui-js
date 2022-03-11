/**
 * @class
 */
export declare class Waiter {
    timeoutWaiting: number;
    counter: number;
    intervall: number;
    /**
     */
    constructor();
    /**
     * @param {!Function} callback
     * @param {number=} opt_duration
     * @return {undefined}
     */
    advancedWaiting(callback: Function, opt_duration: number | undefined): void;
    /**
     * @private
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @return {undefined}
     */
    _advancedDelayHandler(callback: Function, duration: number, counter: number): void;
    /**
     * @return {undefined}
     */
    stopAdvancedWaiting(): void;
    /**
     * @return {undefined}
     */
    startAdvancedWaiting(): void;
    /**
     * @param {!Function} callback
     * @param {number=} opt_duration
     * @return {undefined}
     */
    simpleWaiting(callback: Function, opt_duration: number | undefined): void;
    /**
     * @private
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @return {undefined}
     */
    _simpleDelayHandler(callback: Function, duration: number, counter: number): void;
}
