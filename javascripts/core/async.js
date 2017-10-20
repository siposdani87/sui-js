goog.provide('SUI.Async');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Async}
 * @param {number=} opt_sum
 */
SUI.Async = function(opt_sum) {
  this.sum = opt_sum || 0;
  this._clear();
};

/**
 * @param {!Array<!Function>} calls
 * @param {!Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.Async.prototype.parallel = function(calls, opt_args) {
  let deferred = new SUI.Deferred();
  if (calls.length === 0) {
    let results = opt_args || this.call.results;
    deferred.resolve(results);
    this._clear();
  } else {
    SUI.each(calls, function(call, index) {
      this.call.results[index] = null;
      this._parallelWrapper(call, calls.length, false, index, opt_args).defer(deferred);
    }.bind(this));
  }
  return deferred.promise();
};

/**
 * @param {!Function} call
 * @param {?Array=} opt_args
 * @param {number=} opt_index
 * @return {undefined}
 */
SUI.Async.prototype.parallelFunction = function(call, opt_args, opt_index) {
  let index = !SUI.isUndefined(opt_index) ? /** @type {number} */ (opt_index) : this.call.counter++;
  this.call.results[index] = null;
  this._parallelWrapper(call, this.sum, true, index, opt_args);
};

/**
 * @private
 * @param {!Function} call
 * @param {number} length
 * @param {boolean} allowEvent
 * @param {number} index
 * @param {?Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.Async.prototype._parallelWrapper = function(call, length, allowEvent, index, opt_args) {
  let deferred = new SUI.Deferred();
  let promise = call.apply(this, opt_args || []);
  if (promise && SUI.isFunction(promise.then)) {
    promise.then((object) => {
      this._parallelCaller(length, false, object, allowEvent, index, opt_args).defer(deferred);
    }, (object) => {
      this._parallelCaller(length, true, object, allowEvent, index, opt_args).defer(deferred);
    });
  }
  else if (promise || SUI.isUndefined(promise)) {
    this._parallelCaller(length, false, promise, allowEvent, index, opt_args).defer(deferred);
  }
  else {
    this._parallelCaller(length, true, promise, allowEvent, index, opt_args).defer(deferred);
  }
  return deferred.promise();
};

/**
 * @private
 * @param {number|undefined} length
 * @param {boolean} isError
 * @param {*} result
 * @param {boolean} allowEvent
 * @param {number} index
 * @param {?Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.Async.prototype._parallelCaller = function(length, isError, result, allowEvent, index, opt_args) {
  let deferred = new SUI.Deferred();
  this.call.results[index] = result;
  if (isError) {
    this.call.isError = isError;
  }
  this.call.sum++;
  if (SUI.eq(this.call.sum, length)) {
    let results = opt_args || /** @type {!Array} */ (SUI.copy(this.call.results));
    this._clear();
    if (!this.call.isError) {
      if (allowEvent) {
        this.eventComplete(this.call.isError, results);
      }
      else {
        deferred.resolve(results);
      }
    } else {
      if (allowEvent) {
        this.eventComplete(this.call.isError, results);
      }
      else {
        deferred.reject(results);
      }
    }
  }
  return deferred.promise();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Async.prototype._clear = function() {
  this.call = {
    sum: 0,
    isError: false,
    counter: 0,
    results: [],
  };
};

/**
 * @param {number} sum
 * @param {boolean} isError
 * @param {number} counter
 * @param {!Array} results
 * @return {undefined}
 */
SUI.Async.prototype.setStatus = function(sum, isError, counter, results) {
  this.call.sum = sum;
  this.call.isError = isError;
  this.call.counter = counter;
  this.call.results = results;
};

/**
 * @param {boolean} isError
 * @param {!Array} results
 * @return {undefined}
 */
SUI.Async.prototype.eventComplete = function(isError, results) {
  console.warn('Async.eventComplete(isError, results)', isError, results);
};

/**
 * @param {!Array<!Function>} calls
 * @param {!Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.Async.prototype.serial = function(calls, opt_args) {
  let deferred = new SUI.Deferred();
  if (calls.length === 0) {
    let results = opt_args || this.call.results;
    deferred.resolve(results);
    this._clear();
  }
  else {
    this._serialWrapper(calls, 0, opt_args).defer(deferred);
  }
  return deferred.promise();
};

/**
 * @private
 * @param {!Array<!Function>} calls
 * @param {number} index
 * @param {!Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.Async.prototype._serialWrapper = function(calls, index, opt_args) {
  let deferred = new SUI.Deferred();
  let call = calls[index];
  let promise = call.apply(this, opt_args);
  if (promise && SUI.isFunction(promise.then)) {
    promise.then(function(result) {
      this._serialCaller(calls, index, result, opt_args).defer(deferred);
    }.bind(this), function() {
      let results = opt_args || this.call.results;
      deferred.reject(results);
      this._clear();
    }.bind(this));
  }
  else if (promise || SUI.isUndefined(promise)) {
    this._serialCaller(calls, index, promise, opt_args).defer(deferred);
  }
  else {
    let results = opt_args || this.call.results;
    deferred.reject(results);
    this._clear();
  }
  return deferred.promise();
};

/**
 * @private
 * @param {!Array<!Function>} calls
 * @param {number} index
 * @param {*} result
 * @param {!Array=} opt_args
 * @return {!SUI.Promise}
 */
SUI.Async.prototype._serialCaller = function(calls, index, result, opt_args) {
  let deferred = new SUI.Deferred();
  this.call.results[index] = result;
  let nextIndex = index + 1;
  if (nextIndex < calls.length) {
    this._serialWrapper(calls, nextIndex, opt_args).defer(deferred);
  } else {
    let results = opt_args || this.call.results;
    deferred.resolve(results);
    this._clear();
  }
  return deferred.promise();
};
