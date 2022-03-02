import { isFunction } from "../base";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {Scheduler}
 */
export const Scheduler = function() {
  this.schedulerContainer = new Objekt();

  this._callRunner();
};

/**
 * @private
 * @return {undefined}
 */
Scheduler.prototype._callRunner = function() {
  /* setTimeout(() => {
    eachObject(this.schedulerContainer, (schedulerCallbacks, timeKey) => {

    });
  }, 1000);*/
};

/**
 * @param {string} time
 * @param {!Function} callback
 * @return {!Function}
 */
Scheduler.prototype.everyDay = function(time, callback) {
  const name = time; // window['moment']
  if (isFunction(callback)) {
    const schedulers = this.schedulerContainer.get(name, []);
    schedulers.push(callback);
    this.schedulerContainer.set(name, schedulers);
  }
  return callback;
};
