import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Cookie {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
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
     * @param {string} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @param {string=} opt_path
     * @param {string=} opt_domain
     * @param {boolean=} opt_secure
     * @return {undefined}
     */
    set(name: string, value: string, opt_expires?: any, opt_path?: string | undefined, opt_domain?: string | undefined, opt_secure?: boolean | undefined): void;
    /**
     * @param {string} name
     * @return {*}
     */
    get(name: string): any;
    /**
     * @param {string} name
     * @param {string=} opt_path
     * @param {string=} opt_domain
     * @param {boolean=} opt_secure
     * @return {undefined}
     */
    remove(name: string, opt_path?: string | undefined, opt_domain?: string | undefined, opt_secure?: boolean | undefined): void;
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasKey(name: string): boolean;
    /**
     * @return {!Array}
     */
    getKeys(): Array<any>;
    /**
     * @return {undefined}
     */
    clear(): void;
}
