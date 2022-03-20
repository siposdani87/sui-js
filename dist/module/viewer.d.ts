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
     * @param {string} imageUrl
     * @param {string=} opt_title
     * @return {undefined}
     */
    loadImage(imageUrl: string, opt_title?: string | undefined): void;
    /**
     * @param {string} imageUrl
     * @return {undefined}
     */
    private _setImage;
}
