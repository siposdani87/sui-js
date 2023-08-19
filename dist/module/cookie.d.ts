import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Cookie {
    options: Objekt;
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
     * @return {!Array<string>}
     */
    getKeys(): Array<string>;
    /**
     * @return {undefined}
     */
    clear(): void;
}
