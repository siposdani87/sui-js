/**
 * @class
 */
export declare class ActionCable {
    cable: any;
    clients: any[];
    identifiers: any[];
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
    subscribe(channel: any, room: any): any;
    /**
     * @return {undefined}
     */
    unsubscribeAll(): void;
    /**
     * @protected
     * @param {!Object} options
     * @return {string}
     */
    _generateIdentifier(options: any): string;
}
