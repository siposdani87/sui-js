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
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
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
    _handleData(data: Item, error: boolean): Item;
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message: Object): void;
}
