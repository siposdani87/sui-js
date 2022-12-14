import {
    clear,
    copyArray,
    copyObject,
    each,
    eachObject,
    inArray,
    instanceOf,
    isArray,
    isEmpty,
    isPureObject,
    isUndefined,
    typeCast,
} from '../utils/operation';

/**
 * @class
 */
// Record, Entry, Thing
export class Objekt {
    [key: string]: any;
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object?: Object | undefined) {
        opt_object = opt_object || {};
        Object.call(this, opt_object);
        this.merge(opt_object);
    }
    /**
     * @param {*} object
     * @return {!Objekt}
     */
    merge(object: any): Objekt {
        if (isPureObject(object)) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    if (isPureObject(object[key]) && !isArray(object[key])) {
                        if (!instanceOf(this[key], Objekt)) {
                            this[key] = new Objekt(this[key]);
                        }
                        this[key].merge(object[key]);
                    } else if (
                        isArray(object[key]) &&
                        isPureObject(object[key][0])
                    ) {
                        this._convertObject(object, key);
                        this[key] = object[key];
                    } else {
                        this[key] = typeCast(object[key]);
                    }
                }
            }
        }
        return this;
    }
    /**
     * @param {*} object
     * @param {string} key
     * @return {undefined}
     */
    private _convertObject(object: any, key: string): void {
        each(object[key], (obj, i) => {
            object[key][i] = new Objekt(obj);
        });
    }
    /**
     * @template T
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    get<T>(
        opt_attribute?: string | undefined,
        opt_defaultValue?: T | undefined,
        opt_isSafe: boolean | undefined = false,
    ): T {
        let value: Object = this;
        if (opt_attribute) {
            const attributes = opt_isSafe
                ? [opt_attribute]
                : opt_attribute.split('.');
            value = this._getByAttributes(this, attributes);
        }
        return !isUndefined(value) ? (value as T) : opt_defaultValue;
    }
    /**
     * @private
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {!Object|!Objekt|undefined}
     */
    private _getByAttributes(
        object: Object | Objekt,
        attributes: Array<string>,
    ): Object | Objekt | undefined {
        let result = undefined;
        each(object, (_value, property) => {
            if (
                attributes.length === 1 &&
                property.toString() === attributes[0]
            ) {
                result = object[property];
            } else if (
                property.toString() === attributes[0] &&
                isPureObject(object[property])
            ) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                result = this._getByAttributes(
                    object[property],
                    copyAttributes,
                );
            }
        });
        return result;
    }
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @param {*} value
     * @return {undefined}
     */
    private _setByAttributes(
        object: Object | Objekt,
        attributes: Array<string>,
        value: any,
    ): void {
        eachObject(object, (_oldValue, property) => {
            if (attributes.length === 1 && property === attributes[0]) {
                object[property] = value;
            } else if (
                property === attributes[0] &&
                isPureObject(object[property])
            ) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                this._setByAttributes(object[property], copyAttributes, value);
            }
        });
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {undefined}
     */
    set(attribute: string, value: any): void {
        let object = {};
        object = this._attributesToObject(object, attribute.split('.'), value);
        this.merge(object);
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @param {boolean=} opt_isSafe
     * @return {undefined}
     */
    setRaw(
        attribute: string,
        value: any,
        opt_isSafe: boolean | undefined = false,
    ): void {
        this.set(attribute, null);
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        this._setByAttributes(this, attributes, value);
    }
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    remove(attribute: string): void {
        const attributes = attribute.split('.');
        this._removeByAttributes(this, attributes);
    }
    /**
     * @return {undefined}
     */
    clear(): void {
        clear(this);
    }
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {undefined}
     */
    private _removeByAttributes(
        object: Object | Objekt,
        attributes: Array<string>,
    ): void {
        for (const property in object) {
            if (object.hasOwnProperty(property)) {
                if (attributes.length === 1 && property === attributes[0]) {
                    delete object[property];
                } else if (
                    property === attributes[0] &&
                    isPureObject(object[property])
                ) {
                    const copyAttributes = copyArray(attributes);
                    copyAttributes.shift();
                    this._removeByAttributes(object[property], copyAttributes);
                }
            }
        }
    }
    /**
     * @param {!Function} next
     * @param {!Object=} opt_properties
     * @param {!Array<string>=} opt_attributes
     * @return {undefined}
     */
    each(
        next: Function,
        opt_properties?: Object | undefined,
        opt_attributes?: Array<string> | undefined,
    ): void {
        const properties = opt_properties || this;
        const attributes = opt_attributes || [];

        eachObject(properties, (value, property) => {
            const attributesCopy = copyArray(attributes);
            attributesCopy.push(property);
            if (isPureObject(value)) {
                this.each(next, value, attributesCopy);
            } else {
                next(value, attributesCopy.join('.'));
            }
        });
    }
    /**
     * @param {!Object} object
     * @param {!Array<string>} attributes
     * @param {*} value
     * @return {!Object}
     */
    _attributesToObject(
        object: Object,
        attributes: Array<string>,
        value: any,
    ): Object {
        const lastAttribute = attributes.pop();
        let base = object;
        for (let i = 0; i < attributes.length; i++) {
            base = base[attributes[i]] = base[attributes[i]] || {};
        }
        base[lastAttribute] = value;
        return object;
    }
    /**
     * @param {boolean=} opt_isNative
     * @return {!Objekt}
     */
    copy(opt_isNative: boolean | undefined = false): any {
        let result = copyObject(this);
        if (!opt_isNative) {
            result = new Objekt(result);
        }

        return result;
    }
    /**
     * @return {boolean}
     */
    isEmpty(): boolean {
        return isEmpty(this);
    }
    /**
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    allowKeys(keys: Array<string>): Objekt {
        return this.filterKeys(this, (key) => {
            return inArray(keys, key);
        });
    }
    /**
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    denyKeys(keys: Array<string>): Objekt {
        return this.filterKeys(this, (key) => {
            return !inArray(keys, key);
        });
    }
    /**
     * @param {!Objekt} obj
     * @param {!Function} condition
     * @return {!Objekt}
     */
    filterKeys(obj: Objekt, condition: Function): Objekt {
        const resultObj = new Objekt();
        obj.each((value, key) => {
            if (condition(key)) {
                resultObj.set(key, value);
            }
        });
        return resultObj;
    }
}
