import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Item, Promize } from '../core';
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
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string} url
     * @return {!Promize}
     */
    loadTemplate(url: string): Promize;
    /**
     * @param {!Item} dom
     * @return {!Item}
     */
    _handleMessage(dom: Item): Item;
    /**
     * @param {!Item} dom
     * @return {!Item}
     */
    _handleDom(dom: Item): Item;
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    _handleActions(dom: Item): void;
}
