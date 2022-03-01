import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.ActionCableClient');

goog.requireType('SUI.ActionCable');

goog.require('SUI.Deferred');
goog.require('SUI.Objekt');
goog.require('SUI.Promize');

/**
 * @constructor
 * @param {!SUI.ActionCable} parent
 * @param {!Object} options
 * @this {SUI.ActionCableClient}
 */
SUI.ActionCableClient = function(parent, options) {
  this.parent = parent;
  this._init(options);
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.ActionCableClient.prototype._init = function(options) {
  this.subscription = this._getSubscription(options);
};

/**
 * @private
 * @param {!Object} options
 * @return {!SUI.Promize}
 */
SUI.ActionCableClient.prototype._getSubscription = function(options) {
  const deferred = new SUI.Deferred();
  this.client = this.parent.cable['subscriptions']['create'](options, {
    received: (payload) => {
      const response = new SUI.Objekt(/** @type {!Object} */ (JSON.parse(payload['message'])));
      deferred.resolve(response);
    },
  });
  return deferred.promise();
};

/**
 * @return {!SUI.Promize}
 */
SUI.ActionCableClient.prototype.subscribe = function() {
  return this.subscription;
};

/**
 * @param {string} message,
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.ActionCableClient.prototype.send = function(message, opt_data = {}) {
  opt_data['message'] = message;
  this.client['send'](opt_data);
};

/**
 * @return {undefined}
 */
SUI.ActionCableClient.prototype.unsubscribe = function() {
  this.client['unsubscribe']();
};
