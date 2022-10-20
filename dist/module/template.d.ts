import { Objekt } from '../core/objekt';
import { Http } from './http';
import { Knot, Promize } from '../core';
/**
 * @class
 */
export declare class Template {
    http: Http;
    options: Objekt;
    viewNode: Knot;
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
     * @return {!Knot}
     */
    getViewNode(): Knot;
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url: string, opt_force?: boolean | undefined): Promize;
    /**
     * @private
     * @param {!Knot} data
     * @param {boolean} error
     * @return {!Knot}
     */
    private _handleData;
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message: Object): void;
}
