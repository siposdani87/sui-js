goog.provide('SUI.lib.ActionCableClient');

goog.require('SUI.Deferred');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @param {!SUI.lib.ActionCable} parent
 * @param {!Object} options
 * @this {SUI.lib.ActionCableClient}
 */
SUI.lib.ActionCableClient = function(parent, options) {
  this.parent = parent;
  this.cable = parent.cable;
  this._init(options);
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.lib.ActionCableClient.prototype._init = function(options) {
  this.subscription = this._getSubscription(options);
};

/**
 * @private
 * @param {!Object} options
 * @return {!SUI.Promise}
 */
SUI.lib.ActionCableClient.prototype._getSubscription = function(options) {
  const deferred = new SUI.Deferred();
  this.client = this.cable['subscriptions']['create'](options, {
    received: (payload) => {
      const response = new SUI.Object(/** @type {!Object} */ (JSON.parse(payload['message'])));
      deferred.resolve(response);
    },
  });
  return deferred.promise();
};

/**
 * @return {!SUI.Promise}
 */
SUI.lib.ActionCableClient.prototype.subscribe = function() {
  return this.subscription;
};

/**
 * @param {string} message,
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.lib.ActionCableClient.prototype.send = function(message, opt_data = {}) {
  opt_data['message'] = message;
  this.client['send'](opt_data);
};

/**
 * @return {undefined}
 */
SUI.lib.ActionCableClient.prototype.unsubscribe = function() {
  this.client['unsubscribe']();
};
