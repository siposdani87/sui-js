import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Cookie {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
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
     * @param {string} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @param {string=} opt_path
     * @param {string=} opt_domain
     * @param {boolean=} opt_secure
     * @return {undefined}
     */
    set(name: any, value: any, opt_expires?: any, opt_path?: string, opt_domain?: string, opt_secure?: boolean): void;
    /**
     * @param {string} name
     * @return {*}
     */
    get(name: any): any;
    /**
     * @param {string} name
     * @param {string=} opt_path
     * @param {string=} opt_domain
     * @param {boolean=} opt_secure
     * @return {undefined}
     */
    remove(name: any, opt_path?: string, opt_domain?: string, opt_secure?: boolean): void;
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasKey(name: any): boolean;
    /**
     * @return {!Array}
     */
    getKeys(): string[];
    /**
     * @return {undefined}
     */
    clear(): void;
}
