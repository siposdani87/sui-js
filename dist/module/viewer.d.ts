import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
/**
 * @class
 * @extends {BaseModal}
 */
export declare class Viewer extends BaseModal {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: object | undefined);
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string} imageUrl
     * @param {string=} opt_title
     * @return {undefined}
     */
    loadImage(imageUrl: string, opt_title?: string | undefined): void;
    /**
     * @param {string} imageUrl
     * @return {undefined}
     */
    _setImage(imageUrl: string): void;
}
