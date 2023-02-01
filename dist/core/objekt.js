import { clear, copyArray, copyObject, each, eachObject, inArray, instanceOf, isArray, isEmpty, isPureObject, isUndefined, typeCast, } from '../utils/operation';
/**
 * @class
 */
// Record, Entry, Thing
export class Objekt {
    /**
     * @param {!Object=} opt_object
     */
    constructor(opt_object = {}) {
        Object.call(this, opt_object);
        this.merge(opt_object);
    }
    /**
     * @param {*} object
     * @return {!Objekt}
     */
    merge(object) {
        if (isPureObject(object)) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    if (isPureObject(object[key])) {
                        if (!instanceOf(this[key], Objekt)) {
                            this[key] = new Objekt(this[key]);
                        }
                        this[key].merge(object[key]);
                    }
                    else if (isArray(object[key]) &&
                        isPureObject(object[key][0])) {
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
            value = this._getByAttributes(this, attributes);
        }
        return !isUndefined(value) ? value : opt_defaultValue;
    }
    /**
     * @private
     * @param {!Object|!Objekt} object
     * @param {!Array<string>} attributes
     * @return {!Object|!Objekt|undefined}
     */
    _getByAttributes(object, attributes) {
        let result = undefined;
        each(object, (_value, property) => {
            if (attributes.length === 1 &&
                property.toString() === attributes[0]) {
                result = object[property];
            }
            else if (property.toString() === attributes[0] &&
                (isPureObject(object[property]) || isArray(object[property]))) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                result = this._getByAttributes(object[property], copyAttributes);
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
    _setByAttributes(object, attributes, value) {
        eachObject(object, (_oldValue, property) => {
            if (attributes.length === 1 && property === attributes[0]) {
                object[property] = value;
            }
            else if (property === attributes[0] &&
                (isPureObject(object[property]) || isArray(object[property]))) {
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
    set(attribute, value) {
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
    setRaw(attribute, value, opt_isSafe = false) {
        this.set(attribute, null);
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        this._setByAttributes(this, attributes, value);
    }
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    remove(attribute) {
        const attributes = attribute.split('.');
        this._removeByAttributes(this, attributes);
    }
    /**
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
    _removeByAttributes(object, attributes) {
        for (const property in object) {
            if (object.hasOwnProperty(property)) {
                if (attributes.length === 1 && property === attributes[0]) {
                    delete object[property];
                }
                else if (property === attributes[0] &&
                    (isPureObject(object[property]) ||
                        isArray(object[property]))) {
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
    each(next, opt_properties, opt_attributes) {
        const properties = opt_properties || this;
        const attributes = opt_attributes || [];
        eachObject(properties, (value, property) => {
            const attributesCopy = copyArray(attributes);
            attributesCopy.push(property);
            if (isPureObject(value) || isArray(value)) {
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
        for (const attribute of attributes) {
            base = base[attribute] = base[attribute] || {};
        }
        base[lastAttribute] = value;
        return object;
    }
    /**
     * @return {!Objekt}
     */
    copy() {
        const copy = this.copyObject();
        return new Objekt(copy);
    }
    /**
     * @return {!Object}
     */
    copyObject() {
        return copyObject(this);
    }
    /**
     * @return {boolean}
     */
    isEmpty() {
        return isEmpty(this);
    }
    /**
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    allowKeys(keys) {
        return this.filterKeys(this, (key) => {
            return inArray(keys, key);
        });
    }
    /**
     * @param {!Array<string>} keys
     * @return {!Objekt}
     */
    denyKeys(keys) {
        return this.filterKeys(this, (key) => {
            return !inArray(keys, key);
        });
    }
    /**
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
