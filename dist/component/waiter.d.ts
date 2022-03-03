/**
 * @class
 */
export declare class Waiter {
    timeoutWaiting: number;
    counter: number;
    intervall: any;
    /**
     */
    constructor();
    /**
     * @param {!Function} callback
     * @param {number=} opt_duration
     */
    advancedWaiting(callback: any, opt_duration: any): void;
    /**
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @private
     */
    _advancedDelayHandler(callback: any, duration: any, counter: any): void;
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
     */
    simpleWaiting(callback: any, opt_duration: any): void;
    /**
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @private
     */
    _simpleDelayHandler(callback: any, duration: any, counter: any): void;
}
