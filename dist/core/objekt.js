import { clear, copyArray, copyObject, each, eachObject, inArray, instanceOf, isArray, isEmpty, isPureObject, isUndefined, typeCast, } from '../utils/operation';
// Record, Entry, Thing
export class Objekt {
    constructor(opt_object) {
        Object.call(this, opt_object);
        this.merge(opt_object);
    }
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
    _convertObject(object, key) {
        each(object[key], (obj, i) => {
            object[key][i] = new Objekt(obj);
        });
    }
    get(attribute, opt_defaultValue, opt_isSafe = false) {
        if (!attribute) {
            return this;
        }
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        const value = this._getByAttributes(this, attributes);
        return !isUndefined(value) ? value : opt_defaultValue;
    }
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
    set(attribute, value) {
        let object = {};
        object = this._attributesToObject(object, attribute.split('.'), value);
        this.merge(object);
    }
    setRaw(attribute, value, opt_isSafe = false) {
        this.set(attribute, null);
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        this._setByAttributes(this, attributes, value);
    }
    remove(attribute) {
        const attributes = attribute.split('.');
        this._removeByAttributes(this, attributes);
    }
    clear() {
        clear(this);
    }
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
    _attributesToObject(object, attributes, value) {
        const lastAttribute = attributes.pop();
        let base = object;
        for (const attribute of attributes) {
            base = base[attribute] = base[attribute] || {};
        }
        base[lastAttribute] = value;
        return object;
    }
    copy() {
        const copy = this.copyObject();
        return new Objekt(copy);
    }
    copyObject() {
        return copyObject(this);
    }
    isEmpty() {
        return isEmpty(this);
    }
    allowKeys(keys) {
        return this.filterKeys(this, (key) => {
            return inArray(keys, key);
        });
    }
    denyKeys(keys) {
        return this.filterKeys(this, (key) => {
            return !inArray(keys, key);
        });
    }
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
