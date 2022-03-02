import { Deferred } from "../core/deferred";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @param {!ActionCable} parent
 * @param {!Object} options
 * @this {ActionCableClient}
 */
export const ActionCableClient = function(parent, options) {
  this.parent = parent;
  this._init(options);
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
ActionCableClient.prototype._init = function(options) {
  this.subscription = this._getSubscription(options);
};

/**
 * @private
 * @param {!Object} options
 * @return {!Promize}
 */
ActionCableClient.prototype._getSubscription = function(options) {
  const deferred = new Deferred();
  this.client = this.parent.cable['subscriptions']['create'](options, {
    received: (payload) => {
      const response = new Objekt(/** @type {!Object} */ (JSON.parse(payload['message'])));
      deferred.resolve(response);
    },
  });
  return deferred.promise();
};

/**
 * @return {!Promize}
 */
ActionCableClient.prototype.subscribe = function() {
  return this.subscription;
};

/**
 * @param {string} message,
 * @param {!Object=} opt_data
 * @return {undefined}
 */
ActionCableClient.prototype.send = function(message, opt_data = {}) {
  opt_data['message'] = message;
  this.client['send'](opt_data);
};

/**
 * @return {undefined}
 */
ActionCableClient.prototype.unsubscribe = function() {
  this.client['unsubscribe']();
};
