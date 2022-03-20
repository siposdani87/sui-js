import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Promize } from '../core';
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
    loadTemplate(url: string): Promize;
    /**
     * @param {!Item} dom
     * @return {!Item}
     */
    private _handleMessage;
    /**
     * @param {!Item} dom
     * @return {!Item}
     */
    private _handleDom;
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    private _handleActions;
}
