goog.provide('SUI.Waiter');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Waiter}
 */
SUI.Waiter = function() {
  this.timeoutWaiting = 0;
  this.counter = 0;
};

/**
 * @param {!Function} callback
 * @param {number=} opt_duration
 */
SUI.Waiter.prototype.advancedWaiting = function(callback, opt_duration) {
  const duration = opt_duration || 3000;
  this._advancedDelayHandler(callback, duration, this.timeoutWaiting);
};

/**
 * @param {!Function} callback
 * @param {number} duration
 * @param {number} counter
 * @private
 */
SUI.Waiter.prototype._advancedDelayHandler = function(callback, duration, counter) {
  this.timeoutWaiting += 0.0001;
  setTimeout(() => {
    const prevCounter = this.timeoutWaiting - 0.0001;
    if (prevCounter.toFixed(4) === counter.toFixed(4)) {
      this.timeoutWaiting = 0;
      callback();
    }
  }, duration);
};

/**
 * @return {undefined}
 */
SUI.Waiter.prototype.stopAdvancedWaiting = function() {
  this.timeoutWaiting += 0.0001;
  this.intervall = setInterval(() => {
    this.timeoutWaiting += 0.0001;
  }, 1000);
};

/**
 * @return {undefined}
 */
SUI.Waiter.prototype.startAdvancedWaiting = function() {
  clearInterval(this.intervall);
  this.timeoutWaiting -= 0.0001;
};

/**
 * @param {!Function} callback
 * @param {number=} opt_duration
 */
SUI.Waiter.prototype.simpleWaiting = function(callback, opt_duration) {
  const duration = opt_duration || 3000;
  this._simpleDelayHandler(callback, duration, this.counter);
};

/**
 * @param {!Function} callback
 * @param {number} duration
 * @param {number} counter
 * @private
 */
SUI.Waiter.prototype._simpleDelayHandler = function(callback, duration, counter) {
  this.counter++;
  setTimeout(() => {
    const prevCounter = this.counter - 1;
    if (counter === prevCounter) {
      this.counter = 0;
      callback();
    }
  }, duration);
};
