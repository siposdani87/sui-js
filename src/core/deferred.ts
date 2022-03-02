import { Promize } from "./promize";

/**
 * @constructor
 * @this {Deferred}
 */
export const Deferred = function() {
  this._promise = new Promize();
};

/**
 * @return {!Promize}
 */
Deferred.prototype.promise = function() {
  return this._promise;
};

/**
 * @param {*=} opt_object
 * @return {undefined}
 */
Deferred.prototype.resolve = function(opt_object) {
  this._promise._resolve(opt_object);
};

/**
 * @param {*=} opt_object
 * @return {undefined}
 */
Deferred.prototype.reject = function(opt_object) {
  this._promise._reject(opt_object);
};
