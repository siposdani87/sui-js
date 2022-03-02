import { isFunction, noop } from "../base";
import { Async } from "../core/async";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {Event}
 */
export const Event = function() {
  this.eventContainer = new Objekt();
};

/**
 * @param {string} name
 * @param {!Function} callback
 * @return {!Function}
 */
Event.prototype.set = function(name, callback) {
  if (isFunction(callback)) {
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
Event.prototype.remove = function(name, callback) {
  const events = this.eventContainer.get(name, []);
  const index = events.indexOf(callback);
  if (index > -1) {
    events.splice(index, 1);
  }
};

/**
 * @param {string} name
 */
Event.prototype.pop = function(name) {
  const events = this.eventContainer.get(name, []);
  events.pop();
  this.eventContainer.set(name, events);
};

/**
 * @param {string} name
 * @param {!Array=} opt_args
 * @return {!Promize}
 */
Event.prototype.call = function(name, opt_args = []) {
  const calls = /** @type {!Array<function()>} */ (this.eventContainer.get(name, [noop()]));
  const async = new Async();
  return async.serial(calls, opt_args);
};

/**
 * @param {string} name
 * @param {!Array} args
 * @param {!Function} callback
 * @return {!Promize}
 */
Event.prototype.override = function(name, args, callback) {
  const calls = /** @type {!Array<function()>} */ (this.eventContainer.get(name, [callback]));
  const async = new Async();
  return async.serial(calls, args);
};
