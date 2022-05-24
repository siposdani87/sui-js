import { Objekt } from '../core/objekt';
import { Http } from './http';
import { Item, Promize } from '../core';
/**
 * @class
 */
export declare class Template {
    http: Http;
    options: Objekt;
    viewNode: Item;
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http: Http, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {!Item}
     */
    getViewNode(): Item;
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url: string, opt_force?: boolean | undefined): Promize;
    /**
     * @private
     * @param {!Item} data
     * @param {boolean} error
     * @return {!Item}
     */
    private _handleData;
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message: Object): void;
}
