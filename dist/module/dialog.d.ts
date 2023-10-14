import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Knot } from '../core';
/**
 * @class
 * @extends {BaseModal}
 */
export declare class Dialog extends BaseModal {
    http: Http;
    options: Objekt;
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http: Http, opt_options?: Object | undefined);
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @param {string} url
     * @return {!Promize}
     */
    loadTemplate(url: string): import("../core").Promize<Knot<HTMLElement>, Knot<HTMLElement>>;
    /**
     * @param {!Knot} dom
     * @return {!Knot}
     */
    private _handleMessage;
    /**
     * @param {!Knot} dom
     * @return {!Knot}
     */
    private _handleDom;
    /**
     * @param {!Knot} dom
     * @return {undefined}
     */
    private _handleActions;
}
