import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
/**
 * @class
 * @extends {BaseModal}
 */
export declare class Dialog extends BaseModal {
    http: any;
    options: Objekt;
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http: any, opt_options?: {});
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string} url
     * @return {!Promize}
     */
    loadTemplate(url: any): import("..").Promize;
    /**
     * @param {!Item} dom
     * @return {!Item}
     */
    _handleMessage(dom: any): any;
    /**
     * @param {!Item} dom
     * @return {!Item}
     */
    _handleDom(dom: any): any;
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    _handleActions(dom: any): void;
}
