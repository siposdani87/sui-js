import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class ActionCableClient {
    /**
     * @param {!ActionCable} parent
     * @param {!ChannelNameWithParams} options
     */
    constructor(parent, options) {
        this.parent = parent;
        this._init(options);
    }
    /**
     * @private
     * @param {!ChannelNameWithParams} options
     * @return {undefined}
     */
    _init(options) {
        this.subscription = this._getSubscription(options);
    }
    /**
     * @private
     * @param {!ChannelNameWithParams} options
     * @return {!Promize}
     */
    _getSubscription(options) {
        const deferred = new Deferred();
        this.client = this.parent.cable['subscriptions']['create'](options, {
            received: (payload) => {
                const response = new Objekt(JSON.parse(payload['message']));
                deferred.resolve(response);
            },
        });
        return deferred.promise();
    }
    /**
     * @return {!Promize}
     */
    subscribe() {
        return this.subscription;
    }
    /**
     * @param {string} message,
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    send(message, opt_data = {}) {
        opt_data['message'] = message;
        this.client['send'](opt_data);
    }
    /**
     * @return {undefined}
     */
    unsubscribe() {
        this.client['unsubscribe']();
    }
}
