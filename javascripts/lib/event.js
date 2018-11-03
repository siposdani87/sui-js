goog.provide('SUI.lib.Event');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Event}
 */
SUI.lib.Event = function() {
  this.eventContainer = new SUI.Object();
};

/**
 * @param {string} name
 * @param {!Function} callback
 * @return {!Function}
 */
SUI.lib.Event.prototype.set = function(name, callback) {
  if (SUI.isFunction(callback)) {
    const events = this.eventContainer.get(name, []);
    events.push(callback);
    this.eventContainer.set(name, events);
  }
  return callback;
};

/**
 * @param {string} name
 * @param {!Function} callback
 */
SUI.lib.Event.prototype.remove = function(name, callback) {
  const events = this.eventContainer.get(name, []);
  const index = events.indexOf(callback);
  if (index > -1) {
    events.splice(index, 1);
  }
};

/**
 * @param {string} name
 */
SUI.lib.Event.prototype.pop = function(name) {
  const events = this.eventContainer.get(name, []);
  events.pop();
  this.eventContainer.set(name, events);
};

/**
 * @param {string} name
 * @param {!Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.lib.Event.prototype.call = function(name, opt_args = []) {
  const calls = /** @type {!Array<function()>} */ (this.eventContainer.get(name, [SUI.noop()]));
  const async = new SUI.Async();
  return async.serial(calls, opt_args);
};

/**
 * @param {string} name
 * @param {!Array} args
 * @param {!Function} callback
 * @return {!SUI.Promise}
 */
SUI.lib.Event.prototype.override = function(name, args, callback) {
  const calls = /** @type {!Array<function()>} */ (this.eventContainer.get(name, [callback]));
  const async = new SUI.Async();
  return async.serial(calls, args);
};
