import { Objekt } from '../core/objekt';
import { Http } from './http';
import { Knot, Promize } from '../core';
/**
 * @class
 */
export declare class Template {
    http: Http;
    options: Objekt;
    viewKnot: Knot;
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
    getViewKnot(): Knot;
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url: string, opt_force?: boolean | undefined): Promize;
    _spaNavigate(data: Knot, isError: boolean): void;
    /**
     * @private
     * @param {!Knot} data
     * @param {boolean} isError
     * @return {!Knot}
     */
    private _updateDOM;
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message: {
        type: string;
        content: string;
    }): void;
}
