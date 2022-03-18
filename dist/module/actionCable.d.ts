import { ActionCableClient } from './actionCableClient';
import { Promize } from '../core';
import { Consumer } from '@rails/actioncable';
/**
 * @class
 */
export declare class ActionCable {
    cable: Consumer;
    clients: ActionCableClient[];
    identifiers: string[];
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {string}
     */
    getUrl(): string;
    /**
     * @param {string} channel
     * @param {string} room
     * @return {!Promize}
     */
    subscribe(channel: string, room: string): Promize;
    /**
     * @return {undefined}
     */
    unsubscribeAll(): void;
    /**
     * @protected
     * @param {!Object} options
     * @return {string}
     */
    _generateIdentifier(options: Object): string;
}
