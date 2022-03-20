import { Promize } from '../core';
import { ActionCable } from './actionCable';
import { ChannelNameWithParams } from '@rails/actioncable';
/**
 * @class
 */
export declare class ActionCableClient {
    parent: ActionCable;
    subscription: Promize;
    client: any;
    identifier: string;
    /**
     * @param {!ActionCable} parent
     * @param {!ChannelNameWithParams} options
     */
    constructor(parent: ActionCable, options: ChannelNameWithParams);
    /**
     * @private
     * @param {!ChannelNameWithParams} options
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @param {!ChannelNameWithParams} options
     * @return {!Promize}
     */
    private _getSubscription;
    /**
     * @return {!Promize}
     */
    subscribe(): Promize;
    /**
     * @param {string} message,
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    send(message: string, opt_data?: Object | undefined): void;
    /**
     * @return {undefined}
     */
    unsubscribe(): void;
}
