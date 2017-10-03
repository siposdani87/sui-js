goog.provide('SUI.Util');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Util}
 */
SUI.Util = function () {
  this.timeoutWaiting = 0;
  this.counter = 0;
};

/**
 * @param {!Function} callback
 * @param {number=} opt_duration
 */
SUI.Util.prototype.advancedWaiting = function (callback, opt_duration) {
  var duration = opt_duration || 3000;
  this._advancedDelayHandler(callback, duration, this.timeoutWaiting);
};

/**
 * @param {!Function} callback
 * @param {number} duration
 * @param {number} counter
 * @private
 */
SUI.Util.prototype._advancedDelayHandler = function (callback, duration, counter) {
  this.timeoutWaiting += 0.0001;
  setTimeout(function () {
    var prevCounter = this.timeoutWaiting - 0.0001;
    if (prevCounter.toFixed(4) === counter.toFixed(4)) {
      this.timeoutWaiting = 0;
      callback();
    }
  }.bind(this), duration);
};

/**
 * @returns {undefined}
 */
SUI.Util.prototype.stopAdvancedWaiting = function () {
  this.timeoutWaiting += 0.0001;
  this.intervall = setInterval(function () {
    this.timeoutWaiting += 0.0001;
  }.bind(this), 1000);
};

/**
 * @returns {undefined}
 */
SUI.Util.prototype.startAdvancedWaiting = function () {
  clearInterval(this.intervall);
  this.timeoutWaiting -= 0.0001;
};

/**
 * @param {!Function} callback
 * @param {number=} opt_duration
 */
SUI.Util.prototype.simpleWaiting = function (callback, opt_duration) {
  var duration = opt_duration || 3000;
  this._simpleDelayHandler(callback, duration, this.counter);
};

/**
 * @param {!Function} callback
 * @param {number} duration
 * @param {number} counter
 * @private
 */
SUI.Util.prototype._simpleDelayHandler = function (callback, duration, counter) {
  this.counter++;
  setTimeout(function () {
    var prevCounter = this.counter - 1;
    if (counter === prevCounter) {
      this.counter = 0;
      callback();
    }
  }.bind(this), duration);
};