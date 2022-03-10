/**
 * @export
 * @class
 */
export declare class Objekt {
    [key: string]: any;
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object?: Object | undefined);
    /**
     * @export
     * @param {*} object
     * @return {!Objekt}
     */
    merge(object: any): Objekt;
    /**
     * @param {*} object
     * @param {string} key
     * @return {undefined}
     */
    _convertObject(object: any, key: string): void;
    /**
     * @deprecated Use get()
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    speedGet(opt_attribute?: string | undefined, opt_defaultValue?: any | undefined, opt_isSafe?: boolean | undefined): any;
    /**
     * @export
     * @template T
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    get<T>(opt_attribute?: string | undefined, opt_defaultValue?: any | undefined, opt_isSafe?: boolean | undefined): T;
    /**
     * @private
     * @param {!Object|!Objekt} object
     * @param {!Array} attributes
     * @return {!Object|!Objekt|undefined}
     */
    private _get;
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array} attributes
     * @param {*} value
     * @return {undefined}
     */
    _set(object: Object | Objekt, attributes: Array<any>, value: any): void;
    /**
     * @export
     * @param {string} attribute
     * @param {*} value
     * @return {undefined}
     */
    set(attribute: string, value: any): void;
    /**
     * @export
     * @param {string} attribute
     * @param {*} value
     * @param {boolean=} opt_isSafe
     * @return {undefined}
     */
    setRaw(attribute: string, value: any, opt_isSafe?: boolean | undefined): void;
    /**
     * @export
     * @param {string} attribute
     * @return {undefined}
     */
    remove(attribute: string): void;
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
    _remove(object: Object | Objekt, attributes: Array<any>): void;
    /**
     * @export
     * @param {!Function} next
     * @param {!Object=} opt_properties
     * @param {!Array=} opt_attributes
     * @return {undefined}
     */
    each(next: Function, opt_properties?: Object | undefined, opt_attributes?: Array<any> | undefined): void;
    /**
     * @param {!Object} object
     * @param {!Array} attributes
     * @param {*} value
     * @return {!Object}
     */
    _attributesToObject(object: Object, attributes: Array<any>, value: any): Object;
    /**
     * @export
     * @param {boolean=} opt_isNative
     * @return {!Objekt}
     */
    copy(opt_isNative?: boolean | undefined): any;
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
    allowKeys(keys: Array<any>): Objekt;
    /**
     * @export
     * @param {!Array} keys
     * @return {!Objekt}
     */
    denyKeys(keys: Array<any>): Objekt;
    /**
     * @export
     * @param {!Objekt} obj
     * @param {!Function} condition
     * @return {!Objekt}
     */
    filterKeys(obj: Objekt, condition: Function): Objekt;
}
