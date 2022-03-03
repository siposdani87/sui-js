/**
 * @class
 */
export class Waiter {
    timeoutWaiting;
    counter;
    intervall;
    /**
     */
    constructor() {
        this.timeoutWaiting = 0;
        this.counter = 0;
    }
    /**
     * @param {!Function} callback
     * @param {number=} opt_duration
     */
    advancedWaiting(callback, opt_duration) {
        const duration = opt_duration || 3000;
        this._advancedDelayHandler(callback, duration, this.timeoutWaiting);
    }
    /**
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @private
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
     */
    simpleWaiting(callback, opt_duration) {
        const duration = opt_duration || 3000;
        this._simpleDelayHandler(callback, duration, this.counter);
    }
    /**
     * @param {!Function} callback
     * @param {number} duration
     * @param {number} counter
     * @private
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
