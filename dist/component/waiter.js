/**
 * @class
 */
export class Waiter {
    /**
     */
    constructor() {
        this.timeoutWaiting = 0;
        this.counter = 0;
    }
    /**
     * @param {!Function} callback
     * @param {number=} opt_duration
     * @return {undefined}
     */
    advancedWaiting(callback, opt_duration) {
        const duration = opt_duration || 3000;
        this._advancedDelayHandler(callback, duration, this.timeoutWaiting);
    }
    /**
     * @private
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @return {undefined}
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
     * @return {undefined}
     */
    stopAdvancedWaiting() {
        this.timeoutWaiting += 0.0001;
        this.intervall = setInterval(() => {
            this.timeoutWaiting += 0.0001;
        }, 1000);
    }
    /**
     * @return {undefined}
     */
    startAdvancedWaiting() {
        clearInterval(this.intervall);
        this.timeoutWaiting -= 0.0001;
    }
    /**
     * @param {!Function} callback
     * @param {number=} opt_duration
     * @return {undefined}
     */
    simpleWaiting(callback, opt_duration) {
        const duration = opt_duration || 3000;
        this._simpleDelayHandler(callback, duration, this.counter);
    }
    /**
     * @private
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @return {undefined}
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
