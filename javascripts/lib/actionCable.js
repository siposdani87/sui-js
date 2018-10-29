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
  this.cable = window['ActionCable']['createConsumer']();
  this.clients = [];
  this.identifiers = [];
};

/**
 * @param {string} channel
 * @param {string} room
 * @return {!SUI.Promise}
 */
SUI.lib.ActionCable.prototype.subscribe = function(channel, room) {
  let options = {channel, room};
  let identifier = this._generateIdentifier(options);
  if (!SUI.inArray(this.identifiers, identifier)) {
    this.identifiers.push(identifier);
    let client = new SUI.lib.ActionCableClient(this, options);
    client.identifier = identifier;
    this.clients.push(client);
    return client.subscribe();
  }
  let deferred = new SUI.Deferred();
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
  let values = [];
  SUI.eachObject(options, (value) => {
    values.push(value);
  });
  return values.join('-');
};
