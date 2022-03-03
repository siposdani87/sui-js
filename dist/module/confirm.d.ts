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
    constructor(opt_options?: {});
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
     * @param {string} message
     * @param {string} okText
     * @param {string=} opt_cancelText
     * @param {string=} opt_title
     * @param {string=} opt_type
     */
    load(message: any, okText: any, opt_cancelText?: string, opt_title?: string, opt_type?: string): void;
}
