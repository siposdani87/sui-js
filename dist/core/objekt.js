import { clear, copyArray, copyObject, each, eachObject, inArray, instanceOf, isArray, isEmpty, isNull, isObject, isUndefined, typeCast, } from '../utils/operation';
/**
 * @export
 * @class
 */
export class Objekt {
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object) {
        opt_object = opt_object || {};
        Object.call(this, opt_object);
        this.merge(opt_object);
    }
    /**
     * @export
     * @param {*} object
     * @return {!Objekt}
     */
    merge(object) {
        if (isObject(object)) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    if (!isNull(object[key]) &&
                        isObject(object[key]) &&
                        !isArray(object[key])) {
                        if (!instanceOf(this[key], Objekt)) {
                            this[key] = new Objekt(this[key]);
                        }
                        this[key].merge(object[key]);
                    }
                    else if (isArray(object[key]) &&
                        !isNull(object[key][0]) &&
                        isObject(object[key][0])) {
                        this._convertObject(object, key);
                        this[key] = object[key];
                    }
                    else {
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
    _convertObject(object, key) {
        each(object[key], (obj, i) => {
            object[key][i] = new Objekt(obj);
        });
    }
    /**
     * @deprecated Use get()
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    speedGet(opt_attribute, opt_defaultValue, opt_isSafe = false) {
        let value = this;
        if (opt_attribute) {
            value = this[opt_attribute];
            const attributes = opt_isSafe
                ? [opt_attribute]
                : opt_attribute.split('.');
            if (attributes.length > 1) {
                let properties = this;
                let i = 0;
                while (i < attributes.length &&
                    !isUndefined(properties[attributes[i]])) {
                    value = properties = properties[attributes[i]];
                    i++;
                }
                if (attributes.length !== i) {
                    return opt_defaultValue;
                }
            }
        }
        return value;
    }
    /**
     * @export
     * @template T
     * @param {string=} opt_attribute
     * @param {*=} opt_defaultValue
     * @param {boolean=} opt_isSafe
     * @return {*}
     */
    get(opt_attribute, opt_defaultValue, opt_isSafe = false) {
        let value = this;
        if (opt_attribute) {
            const attributes = opt_isSafe
                ? [opt_attribute]
                : opt_attribute.split('.');
            value = this._get(this, attributes);
        }
        return !isUndefined(value) ? value : opt_defaultValue;
    }
    /**
     * @private
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {!Object|!Objekt|undefined}
     */
    _get(object, attributes) {
        let result = undefined;
        each(object, (_value, property) => {
            if (attributes.length === 1 &&
                property.toString() === attributes[0]) {
                result = object[property];
            }
            else if (property.toString() === attributes[0] &&
                !isNull(object[property]) &&
                isObject(object[property])) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                result = this._get(object[property], copyAttributes);
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
    _set(object, attributes, value) {
        eachObject(object, (_oldValue, property) => {
            if (attributes.length === 1 && property === attributes[0]) {
                object[property] = value;
            }
            else if (property === attributes[0] &&
                !isNull(object[property]) &&
                isObject(object[property])) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                this._set(object[property], copyAttributes, value);
            }
        });
    }
    /**
     * @export
     * @param {string} attribute
     * @param {*} value
     * @return {undefined}
     */
    set(attribute, value) {
        let object = {};
        object = this._attributesToObject(object, attribute.split('.'), value);
        this.merge(object);
    }
    /**
     * @export
     * @param {string} attribute
     * @param {*} value
     * @param {boolean=} opt_isSafe
     * @return {undefined}
     */
    setRaw(attribute, value, opt_isSafe = false) {
        this.set(attribute, null);
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        this._set(this, attributes, value);
    }
    /**
     * @export
     * @param {string} attribute
     * @return {undefined}
     */
    remove(attribute) {
        const attributes = attribute.split('.');
        this._remove(this, attributes);
    }
    /**
     * @export
     * @return {undefined}
     */
    clear() {
        clear(this);
    }
    /**
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {undefined}
     */
    _remove(object, attributes) {
        for (const property in object) {
            if (object.hasOwnProperty(property)) {
                if (attributes.length === 1 && property === attributes[0]) {
                    delete object[property];
                }
                else if (property === attributes[0] &&
                    !isNull(object[property]) &&
                    isObject(object[property])) {
                    const copyAttributes = copyArray(attributes);
                    copyAttributes.shift();
                    this._remove(object[property], copyAttributes);
                }
            }
        }
    }
    /**
     * @export
     * @param {!Function} next
     * @param {!Object=} opt_properties
     * @param {!Array<string>=} opt_attributes
     * @return {undefined}
     */
    each(next, opt_properties, opt_attributes) {
        const properties = opt_properties || this;
        const attributes = opt_attributes || [];
        eachObject(properties, (value, property) => {
            const attributesCopy = copyArray(attributes);
            attributesCopy.push(property);
            if (!isNull(value) && isObject(value)) {
                this.each(next, value, attributesCopy);
            }
            else {
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
    _attributesToObject(object, attributes, value) {
        const lastAttribute = attributes.pop();
        let base = object;
        for (let i = 0; i < attributes.length; i++) {
            base = base[attributes[i]] = base[attributes[i]] || {};
        }
        base[lastAttribute] = value;
        return object;
    }
    /**
     * @export
     * @param {boolean=} opt_isNative
     * @return {!Objekt}
     */
    copy(opt_isNative = false) {
        let result = /** @type {!Objekt} */ copyObject(this);
        if (!opt_isNative) {
            result = new Objekt(result);
        }
        return result;
    }
    /**
     * @export
     * @return {boolean}
     */
    isEmpty() {
        return isEmpty(this);
    }
    /**
     * @export
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    allowKeys(keys) {
        return this.filterKeys(this, (key) => {
            return inArray(keys, key);
        });
    }
    /**
     * @export
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    denyKeys(keys) {
        return this.filterKeys(this, (key) => {
            return !inArray(keys, key);
        });
    }
    /**
     * @export
     * @param {!Objekt} obj
     * @param {!Function} condition
     * @return {!Objekt}
     */
    filterKeys(obj, condition) {
        const resultObj = new Objekt();
        obj.each((value, key) => {
            if (condition(key)) {
                resultObj.set(key, value);
            }
        });
        return resultObj;
    }
}
