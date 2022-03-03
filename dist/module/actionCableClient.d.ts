/**
 * @class
 */
export declare class ActionCableClient {
    parent: any;
    subscription: any;
    client: any;
    identifier: any;
    /**
     * @param {!ActionCable} parent
     * @param {!Object} options
     */
    constructor(parent: any, options: any);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _init(options: any): void;
    /**
     * @private
     * @param {!Object} options
     * @return {!Promize}
     */
    _getSubscription(options: any): import("..").Promize;
    /**
     * @return {!Promize}
     */
    subscribe(): any;
    /**
     * @param {string} message,
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    send(message: any, opt_data?: {}): void;
    /**
     * @return {undefined}
     */
    unsubscribe(): void;
}
