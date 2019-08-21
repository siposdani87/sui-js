goog.provide('SUI.lib.Scheduler');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Scheduler}
 */
SUI.lib.Scheduler = function() {
  this.schedulerContainer = new SUI.Object();

  this._callRunner();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Scheduler.prototype._callRunner = function() {
  /* setTimeout(() => {
    SUI.eachObject(this.schedulerContainer, (schedulerCallbacks, timeKey) => {

    });
  }, 1000);*/
};

/**
 * @param {string} time
 * @param {!Function} callback
 * @return {!Function}
 */
SUI.lib.Scheduler.prototype.everyDay = function(time, callback) {
  const name = time; // window['moment']
  if (SUI.isFunction(callback)) {
    const schedulers = this.schedulerContainer.get(name, []);
    schedulers.push(callback);
    this.schedulerContainer.set(name, schedulers);
  }
  return callback;
};
