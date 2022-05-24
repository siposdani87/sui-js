import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Document {
    options: Objekt;
    document: globalThis.Document;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
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
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title: string): void;
    /**
     * @param {!Item} target
     * @param {!Event} event
     * @return {undefined}
     */
    eventClick(target: Item, event: Event): void;
    /**
     * @param {string} email
     * @param {string=} opt_subject
     * @return {undefined}
     */
    mailTo(email: string, opt_subject?: string | undefined): void;
}
