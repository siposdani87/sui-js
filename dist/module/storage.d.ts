import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Storage {
    options: Objekt;
    storage: globalThis.Storage;
    /**
     * @param {!Object} options
     */
    constructor(options: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getPropertyName(name: any): string;
    /**
     * @private
     * @param {string} propertyName
     * @return {string}
     */
    _getName(propertyName: any): any;
    /**
     * @param {string} name
     * @param {*} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {undefined}
     */
    set(name: any, value: any, opt_expires: any): void;
    /**
     * @param {string} name
     * @return {*}
     */
    get(name: any): any;
    /**
     * @param {string} name
     * @return {undefined}
     */
    remove(name: any): void;
    /**
     * @return {undefined}
     */
    clear(): void;
    /**
     * @private
     * @return {undefined}
     */
    _checkExpires(): void;
    /**
     * @private
     * @param {string} name
     * @return {boolean}
     */
    _isExpired(name: any): boolean;
    /**
     * @private
     * @param {string} name
     * @return {?Date}
     */
    _getExpiresDate(name: any): Date;
    /**
     * @private
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {string}
     */
    _getExpires(opt_expires: any): any;
}
