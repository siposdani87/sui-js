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
    constructor(opt_options: any);
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
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title: any): void;
    /**
     * @param {!Item} target
     * @param {!Event} event
     * @return {undefined}
     */
    eventClick(target: any, event: any): void;
    /**
     * @param {string} email
     * @param {string=} opt_subject
     * @return {undefined}
     */
    mailTo(email: any, opt_subject?: string): void;
}
