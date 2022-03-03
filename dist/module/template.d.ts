import { Objekt } from '../core/objekt';
import { Http } from './http';
/**
 * @class
 */
export declare class Template {
    http: Http;
    options: Objekt;
    viewNode: any;
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http: any, opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {!Item}
     */
    getViewNode(): any;
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url: any, opt_force?: boolean): import("..").Promize;
    /**
     * @private
     * @param {!Item} data
     * @param {boolean} error
     * @return {!Item}
     */
    _handleData(data: any, error: any): any;
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message: any): void;
}
