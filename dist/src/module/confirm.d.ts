import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
/**
 * @class
 * @extends {BaseModal}
 */
export declare class Confirm extends BaseModal {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
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
     * @param {string} message
     * @param {string} okText
     * @param {string=} opt_cancelText
     * @param {string=} opt_title
     * @param {string=} opt_type
     */
    load(message: string, okText: string, opt_cancelText?: string | undefined, opt_title?: string | undefined, opt_type?: string | undefined): void;
}
