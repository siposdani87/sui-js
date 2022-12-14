/**
 * @class
 */
export declare class Objekt {
    [key: string]: any;
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object?: Object | undefined);
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
     * @template T
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    get<T>(opt_attribute?: string | undefined, opt_defaultValue?: T | undefined, opt_isSafe?: boolean | undefined): T;
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
    set(attribute: string, value: any): void;
    /**
     * @param {string} attribute
     * @param {*} value
     * @param {boolean=} opt_isSafe
     * @return {undefined}
     */
    setRaw(attribute: string, value: any, opt_isSafe?: boolean | undefined): void;
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
    each(next: Function, opt_properties?: Object | undefined, opt_attributes?: Array<string> | undefined): void;
    /**
     * @param {!Object} object
     * @param {!Array<string>} attributes
     * @param {*} value
     * @return {!Object}
     */
    _attributesToObject(object: Object, attributes: Array<string>, value: any): Object;
    /**
     * @param {boolean=} opt_isNative
     * @return {!Objekt}
     */
    copy(opt_isNative?: boolean | undefined): any;
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
    filterKeys(obj: Objekt, condition: Function): Objekt;
}
