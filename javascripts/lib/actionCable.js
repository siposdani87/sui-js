goog.provide('SUI.lib.ActionCable');

goog.require('SUI');
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
};

/**
 * @param {string} channel
 * @param {string} room
 * @return {!SUI.Promise}
 */
SUI.lib.ActionCable.prototype.subscribe = function(channel, room) {
    let client = new SUI.lib.ActionCableClient(this.cable, {channel, room});
    this.clients.push(client);
    return client.subscribe();
};

/**
 * @return {undefined}
 */
SUI.lib.ActionCable.prototype.unsubscribeAll = function() {
    SUI.eachArray(this.clients, (client) => {
        client.unsubscribe();
    });
    SUI.clearArray(this.clients);
};
