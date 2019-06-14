goog.provide('SUI.lib.ActionCable');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.lib');
goog.require('SUI.lib.ActionCableClient');

/**
 * @constructor
 * @this {SUI.lib.ActionCable}
 */
SUI.lib.ActionCable = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.ActionCable.prototype._init = function() {
  if (window['ActionCable']) {
    this.cable = window['ActionCable']['createConsumer']();
  }
  this.clients = [];
  this.identifiers = [];
};

/**
 * @return {string}
 */
SUI.lib.ActionCable.prototype.getUrl = function() {
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
 * @return {!SUI.Promise}
 */
SUI.lib.ActionCable.prototype.subscribe = function(channel, room) {
  const options = {channel, room};
  const identifier = this._generateIdentifier(options);
  if (!SUI.inArray(this.identifiers, identifier)) {
    this.identifiers.push(identifier);
    const client = new SUI.lib.ActionCableClient(this, options);
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
SUI.lib.ActionCable.prototype.unsubscribeAll = function() {
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
SUI.lib.ActionCable.prototype._generateIdentifier = function(options) {
  return SUI.md5(JSON.stringify(options));
};
