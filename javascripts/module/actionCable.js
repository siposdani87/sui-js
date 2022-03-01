import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.ActionCable');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Promize');
goog.require('SUI.Query');
goog.require('SUI.ActionCableClient');

/**
 * @constructor
 * @this {SUI.ActionCable}
 */
SUI.ActionCable = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.ActionCable.prototype._init = function() {
  if (window['ActionCable']) {
    this.cable = window['ActionCable']['createConsumer']();
  }
  this.clients = [];
  this.identifiers = [];
};

/**
 * @return {string}
 */
SUI.ActionCable.prototype.getUrl = function() {
  let url = '';
  const cableMeta = new SUI.Query('meta[name="action-cable-url"]').getItem();
  if (!cableMeta.isEmpty()) {
    url = /** @type {string} */ (cableMeta.getAttribute('content'));
  }
  return url;
};

/**
 * @param {string} channel
 * @param {string} room
 * @return {!SUI.Promize}
 */
SUI.ActionCable.prototype.subscribe = function(channel, room) {
  const options = {channel, room};
  const identifier = this._generateIdentifier(options);
  if (!SUI.inArray(this.identifiers, identifier)) {
    this.identifiers.push(identifier);
    const client = new SUI.ActionCableClient(this, options);
    client.identifier = identifier;
    this.clients.push(client);
    return client.subscribe();
  }
  const deferred = new SUI.Deferred();
  return deferred.promise();
};

/**
 * @return {undefined}
 */
SUI.ActionCable.prototype.unsubscribeAll = function() {
  SUI.eachArray(this.clients, (client) => {
    client.unsubscribe();
    SUI.remove(this.identifiers, client.identifier);
  });
  SUI.clearArray(this.clients);
};

/**
 * @protected
 * @param {!Object} options
 * @return {string}
 */
SUI.ActionCable.prototype._generateIdentifier = function(options) {
  return SUI.md5(JSON.stringify(options));
};
