import { Item } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class ProgressStatus {
    progressStatusNode: Item;
    options: Objekt;
    iconNode: Item;
    textNode: Item;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selector?: string | undefined, opt_options?: Object | undefined);
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
     * @private
     * @param {string} cssClass
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    _setStatus(cssClass: string, text: string, opt_icon?: string | undefined): void;
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setSuccess(text: string, opt_icon?: string | undefined): void;
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setInfo(text: string, opt_icon?: string | undefined): void;
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setWarning(text: string, opt_icon?: string | undefined): void;
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setError(text: string, opt_icon?: string | undefined): void;
}
