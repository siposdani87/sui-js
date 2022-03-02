import { inArray, eachArray, remove, clearArray, md5 } from "../base";
import { Deferred } from "../core/deferred";
import { Query } from "../core/query";
import { ActionCableClient } from "./actionCableClient";

/**
 * @constructor
 * @this {ActionCable}
 */
export const ActionCable = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
ActionCable.prototype._init = function() {
  if (window['ActionCable']) {
    this.cable = window['ActionCable']['createConsumer']();
  }
  this.clients = [];
  this.identifiers = [];
};

/**
 * @return {string}
 */
ActionCable.prototype.getUrl = function() {
  let url = '';
  const cableMeta = new Query('meta[name="action-cable-url"]').getItem();
  if (!cableMeta.isEmpty()) {
    url = /** @type {string} */ (cableMeta.getAttribute('content'));
  }
  return url;
};

/**
 * @param {string} channel
 * @param {string} room
 * @return {!Promize}
 */
ActionCable.prototype.subscribe = function(channel, room) {
  const options = {channel, room};
  const identifier = this._generateIdentifier(options);
  if (!inArray(this.identifiers, identifier)) {
    this.identifiers.push(identifier);
    const client = new ActionCableClient(this, options);
    client.identifier = identifier;
    this.clients.push(client);
    return client.subscribe();
  }
  const deferred = new Deferred();
  return deferred.promise();
};

/**
 * @return {undefined}
 */
ActionCable.prototype.unsubscribeAll = function() {
  eachArray(this.clients, (client) => {
    client.unsubscribe();
    remove(this.identifiers, client.identifier);
  });
  clearArray(this.clients);
};

/**
 * @protected
 * @param {!Object} options
 * @return {string}
 */
ActionCable.prototype._generateIdentifier = function(options) {
  return md5(JSON.stringify(options));
};
