/**
 * @export
 * @class
 */
export declare class Objekt {
    [key: string]: any;
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object?: any);
    /**
     * @export
     * @param {*} object
     * @return {!Objekt}
     */
    merge(object: any): this;
    /**
     * @param {*} object
     * @param {string} key
     * @return {undefined}
     */
    _convertObject(object: any, key: any): void;
    /**
     * @deprecated Use get()
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    speedGet(opt_attribute?: any, opt_defaultValue?: any, opt_isSafe?: boolean): any;
    /**
     * @export
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    get(opt_attribute?: any, opt_defaultValue?: any, opt_isSafe?: boolean): any;
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array} attributes
     * @return {!Object|!Objekt|undefined}
     */
    _get(object: any, attributes: any): any;
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array} attributes
     * @param {*} value
     * @return {undefined}
     */
    _set(object: any, attributes: any, value: any): void;
    /**
     * @export
     * @param {string} attribute
     * @param {*} value
     * @return {undefined}
     */
    set(attribute: any, value: any): void;
    /**
     * @export
     * @param {string} attribute
     * @param {*} value
     * @param {boolean=} opt_isSafe
     * @return {undefined}
     */
    setRaw(attribute: any, value: any, opt_isSafe?: boolean): void;
    /**
     * @export
     * @param {string} attribute
     * @return {undefined}
     */
    remove(attribute: any): void;
    /**
     * @export
     * @return {undefined}
     */
    clear(): void;
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array} attributes
     * @return {undefined}
     */
    _remove(object: any, attributes: any): void;
    /**
     * @export
     * @param {!Function} next
     * @param {!Object=} opt_properties
     * @param {!Array=} opt_attributes
     * @return {undefined}
     */
    each(next: any, opt_properties?: any, opt_attributes?: any): void;
    /**
     * @param {!Object} object
     * @param {!Array} attributes
     * @param {*} value
     * @return {!Object}
     */
    _attributesToObject(object: any, attributes: any, value: any): any;
    /**
     * @export
     * @param {boolean=} opt_isNative
     * @return {!Objekt}
     */
    copy(opt_isNative?: boolean): any;
    /**
     * @export
     * @return {boolean}
     */
    isEmpty(): boolean;
    /**
     * @export
     * @param {!Array} keys
     * @return {!Objekt}
     */
    allowKeys(keys: any): Objekt;
    /**
     * @export
     * @param {!Array} keys
     * @return {!Objekt}
     */
    denyKeys(keys: any): Objekt;
    /**
     * @export
     * @param {!Objekt} obj
     * @param {!Function} condition
     * @return {!Objekt}
     */
    filterKeys(obj: any, condition: any): Objekt;
}
