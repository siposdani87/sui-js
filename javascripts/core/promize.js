import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Promize');

goog.requireType('SUI.Deferred');

goog.require('SUI');
goog.require('SUI.Objekt');

/**
 * @constructor
 * @this {SUI.Promize}
 * @param {!Object=} opt_options
 */
SUI.Promize = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt({
    status: null,
    data: null,
    resolve: null,
    reject: null,
    complete: null,
  });
  _self.options.merge(opt_options);
};

/**
 * @param {*=} opt_data
 * @return {undefined}
 */
SUI.Promize.prototype._resolve = function(opt_data) {
  if (!SUI.isArray(opt_data)) {
    opt_data = [opt_data];
  }
  if (SUI.isFunction(this.options.resolve) && SUI.isFunction(this.options.complete)) {
    this.options.resolve.apply(this, opt_data);
    this.options.complete.apply(this, opt_data);
  } else {
    this.options.data = opt_data;
    this.options.status = true;
  }
};

/**
 * @param {*=} opt_data
 * @return {undefined}
 */
SUI.Promize.prototype._reject = function(opt_data) {
  if (!SUI.isArray(opt_data)) {
    opt_data = opt_data ? [opt_data] : [];
  }
  if (SUI.isFunction(this.options.reject) && SUI.isFunction(this.options.complete)) {
    this.options.reject.apply(this, opt_data);
    this.options.complete.apply(this, opt_data);
  } else {
    this.options.data = opt_data;
    this.options.status = false;
  }
};

/**
 * @param {!Function} resolve
 * @param {!Function=} opt_reject
 * @param {!Function=} opt_complete
 * @return {undefined}
 */
SUI.Promize.prototype.then = function(resolve, opt_reject, opt_complete) {
  const reject = opt_reject || SUI.noop();
  const complete = opt_complete || SUI.noop();
  switch (this.options.status) {
    case true:
      resolve.apply(this, this.options.data);
      complete.apply(this, this.options.data);
      break;
    case false:
      reject.apply(this, this.options.data);
      complete.apply(this, this.options.data);
      break;
    default:
      this.options.merge({
        resolve: resolve,
        reject: reject,
        complete: complete,
      });
  }
};

/**
 * @param {!SUI.Deferred} defer
 * @param {!Function=} opt_complete
 * @return {undefined}
 */
SUI.Promize.prototype.defer = function(defer, opt_complete) {
  this.then((...args) => {
    defer.resolve(args);
  }, (...args) => {
    defer.reject(args);
  }, opt_complete);
};
