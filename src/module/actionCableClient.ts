import { Promize } from '../core';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { ActionCable } from './actionCable';
import {
    ChannelNameWithParams,
    Consumer,
    Subscription,
} from '@rails/actioncable';

/**
 * @class
 */
export class ActionCableClient {
    parent: ActionCable;
    subscription: Promize;
    client: Subscription<Consumer>;
    identifier: string;
    /**
     * @param {!ActionCable} parent
     * @param {!ChannelNameWithParams} options
     */
    constructor(parent: ActionCable, options: ChannelNameWithParams) {
        this.parent = parent;
        this._init(options);
    }
    /**
     * @private
     * @param {!ChannelNameWithParams} options
     * @return {undefined}
     */
    private _init(options: ChannelNameWithParams): void {
        this.subscription = this._getSubscription(options);
    }
    /**
     * @private
     * @param {!ChannelNameWithParams} options
     * @return {!Promize}
     */
    private _getSubscription(options: ChannelNameWithParams): Promize {
        const deferred = new Deferred();
        this.client = this.parent.cable.subscriptions.create(options, {
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
    subscribe(): Promize {
        return this.subscription;
    }
    /**
     * @param {string} message,
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    send(message: string, opt_data: Object | undefined = {}): void {
        opt_data['message'] = message;
        this.client.send(opt_data);
    }
    /**
     * @return {undefined}
     */
    unsubscribe(): void {
        this.client.unsubscribe();
    }
}
