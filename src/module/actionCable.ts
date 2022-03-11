import { inArray, eachArray, remove, clearArray } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Query } from '../core/query';
import { ActionCableClient } from './actionCableClient';
import { md5 } from '../utils/coder';

/**
 * @class
 */
export class ActionCable {
    cable: any;
    clients: any[];
    identifiers: any[];
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        if (window['ActionCable']) {
            this.cable = window['ActionCable']['createConsumer']();
        }
        this.clients = [];
        this.identifiers = [];
    }
    /**
     * @return {string}
     */
    getUrl() {
        let url = '';
        const cableMeta = new Query('meta[name="action-cable-url"]').getItem();
        if (!cableMeta.isEmpty()) {
            url = /** @type {string} */(cableMeta).getAttribute('content');
        }
        return url;
    }
    /**
     * @param {string} channel
     * @param {string} room
     * @return {!Promize}
     */
    subscribe(channel, room) {
        const options = { channel, room };
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
    }
    /**
     * @return {undefined}
     */
    unsubscribeAll() {
        eachArray(this.clients, (client) => {
            client.unsubscribe();
            remove(this.identifiers, client.identifier);
        });
        clearArray(this.clients);
    }
    /**
     * @protected
     * @param {!Object} options
     * @return {string}
     */
    _generateIdentifier(options) {
        return md5(JSON.stringify(options));
    }
}
