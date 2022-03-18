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
    constructor(options: Object);
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
    _getPropertyName(name: string): string;
    /**
     * @private
     * @param {string} propertyName
     * @return {string}
     */
    _getName(propertyName: string): string;
    /**
     * @param {string} name
     * @param {*} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {undefined}
     */
    set(name: string, value: any, opt_expires: (string | number | boolean | Date) | undefined): void;
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
    _checkExpires(): void;
    /**
     * @private
     * @param {string} name
     * @return {boolean}
     */
    _isExpired(name: string): boolean;
    /**
     * @private
     * @param {string} name
     * @return {?Date}
     */
    _getExpiresDate(name: string): Date | null;
    /**
     * @private
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {string}
     */
    _getExpires(opt_expires?: (string | number | boolean | Date)): string;
}
