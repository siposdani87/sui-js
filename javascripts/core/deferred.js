import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Deferred');

goog.require('SUI');
goog.require('SUI.Promize');

/**
 * @constructor
 * @this {SUI.Deferred}
 */
SUI.Deferred = function() {
  this._promise = new SUI.Promize();
};

/**
 * @return {!SUI.Promize}
 */
SUI.Deferred.prototype.promise = function() {
  return this._promise;
};

/**
 * @param {*=} opt_object
 * @return {undefined}
 */
SUI.Deferred.prototype.resolve = function(opt_object) {
  this._promise._resolve(opt_object);
};

/**
 * @param {*=} opt_object
 * @return {undefined}
 */
SUI.Deferred.prototype.reject = function(opt_object) {
  this._promise._reject(opt_object);
};
