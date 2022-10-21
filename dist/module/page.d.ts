import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Page {
    options: Objekt;
    document: Document;
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
     * @param {!Knot} target
     * @param {!Event} event
     * @return {undefined}
     */
    eventClick(target: Knot, event: Event): void;
    /**
     * @param {string} email
     * @param {string=} opt_subject
     * @return {undefined}
     */
    mailTo(email: string, opt_subject?: string | undefined): void;
}
