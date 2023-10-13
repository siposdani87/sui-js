/**
 * @class
 */
export declare class Objekt<T extends Object = Object> {
    [key: string]: T[keyof T | any];
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object?: T);
    /**
     * @param {*} object
     * @return {!Objekt}
     */
    merge(object: any): Objekt;
    /**
     * @param {*} object
     * @param {string} key
     * @return {undefined}
     */
    private _convertObject;
    /**
     * @template K
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    get<K>(attribute: string | undefined, opt_defaultValue?: K, opt_isSafe?: boolean | undefined): K;
    /**
     * @private
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {!Object|!Objekt|undefined}
     */
    private _getByAttributes;
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @param {*} value
     * @return {undefined}
     */
    private _setByAttributes;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {undefined}
     */
    set<K>(attribute: string, value: K): void;
    /**
     * @param {string} attribute
     * @param {*} value
     * @param {boolean=} opt_isSafe
     * @return {undefined}
     */
    setRaw<K>(attribute: string, value: K, opt_isSafe?: boolean | undefined): void;
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    remove(attribute: string): void;
    /**
     * @return {undefined}
     */
    clear(): void;
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {undefined}
     */
    private _removeByAttributes;
    /**
     * @param {!Function} next
     * @param {!Object=} opt_properties
     * @param {!Array<string>=} opt_attributes
     * @return {undefined}
     */
    each<K>(next: (value: K, key: string) => void, opt_properties?: Object | undefined, opt_attributes?: Array<string> | undefined): void;
    /**
     * @param {!Object} object
     * @param {!Array<string>} attributes
     * @param {*} value
     * @return {!Object}
     */
    private _attributesToObject;
    /**
     * @return {!Objekt}
     */
    copy(): Objekt;
    /**
     * @return {!Object}
     */
    copyObject(): Object;
    /**
     * @return {boolean}
     */
    isEmpty(): boolean;
    /**
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    allowKeys(keys: Array<string>): Objekt;
    /**
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    denyKeys(keys: Array<string>): Objekt;
    /**
     * @param {!Objekt} obj
     * @param {!Function} condition
     * @return {!Objekt}
     */
    filterKeys(obj: Objekt, condition: (key: string) => boolean): Objekt;
}
