import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class ActionCableClient {
    parent;
    subscription;
    client;
    identifier;
    /**
     * @param {!ActionCable} parent
     * @param {!Object} options
     */
    constructor(parent, options) {
        this.parent = parent;
        this._init(options);
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _init(options) {
        this.subscription = this._getSubscription(options);
    }
    /**
     * @private
     * @param {!Object} options
     * @return {!Promize}
     */
    _getSubscription(options) {
        const deferred = new Deferred();
        this.client = this.parent.cable['subscriptions']['create'](options, {
            received: (payload) => {
                const response = new Objekt(
                /** @type {!Object} */ JSON.parse(payload['message']));
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
