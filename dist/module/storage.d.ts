import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Storage {
    type: 'LOCAL' | 'SESSION';
    options: Objekt;
    storage: globalThis.Storage;
    /**
     * @param {string} type
     * @param {!Object} opt_options
     */
    constructor(type: 'LOCAL' | 'SESSION', opt_options?: Object | undefined);
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
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getPropertyName;
    /**
     * @private
     * @param {string} propertyName
     * @return {string}
     */
    private _getName;
    /**
     * @param {string} name
     * @param {*} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {undefined}
     */
    set(name: string, value: any, opt_expires?: string | number | boolean | Date): void;
    /**
     * @param {string} name
     * @return {*}
     */
    get(name: string): any;
    /**
     * @param {string} name
     * @return {undefined}
     */
    remove(name: string): void;
    /**
     * @return {undefined}
     */
    clear(): void;
    /**
     * @private
     * @return {undefined}
     */
    private _checkExpires;
    /**
     * @private
     * @param {string} name
     * @return {boolean}
     */
    private _isExpired;
    /**
     * @private
     * @param {string} name
     * @return {?Date}
     */
    private _getExpiresDate;
    /**
     * @private
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {string}
     */
    private _getExpires;
}
