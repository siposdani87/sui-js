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

// Record, Entry, Thing
export class Objekt<T extends object = object> {
    [key: string]: T[keyof T | any];

    constructor(opt_object?: T) {
        Object.call(this, opt_object);
        this.merge(opt_object);
    }

    merge(object: any): Objekt {
        if (isPureObject(object)) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    if (isPureObject(object[key])) {
                        if (!instanceOf(this[key], Objekt)) {
                            this[key] = new Objekt(this[key]);
                        }
                        this[key].merge(object[key]);
                    } else if (
                        isArray(object[key]) &&
                        isPureObject(object[key][0])
                    ) {
                        this._convertobject(object, key);
                        this[key] = object[key];
                    } else {
                        this[key] = typeCast(object[key]);
                    }
                }
            }
        }
        return this;
    }

    private _convertobject(object: any, key: string): void {
        each(object[key], (obj, i) => {
            object[key][i] = new Objekt(obj);
        });
    }

    get<K>(
        attribute: string | undefined,
        opt_defaultValue?: K,
        opt_isSafe: boolean | undefined = false,
    ): K {
        if (!attribute) {
            return this as any;
        }
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        const value = this._getByAttributes<K>(this, attributes);

        return !isUndefined(value) ? value : opt_defaultValue;
    }

    private _getByAttributes<K>(
        object: object | Objekt,
        attributes: Array<string>,
    ): K | undefined {
        let result = undefined;
        each(object, (_value, property) => {
            if (
                attributes.length === 1 &&
                property.toString() === attributes[0]
            ) {
                result = object[property];
            } else if (
                property.toString() === attributes[0] &&
                (isPureObject(object[property]) || isArray(object[property]))
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

    private _setByAttributes(
        object: object | Objekt,
        attributes: Array<string>,
        value: any,
    ): void {
        eachObject(object, (_oldValue, property) => {
            if (attributes.length === 1 && property === attributes[0]) {
                object[property] = value;
            } else if (
                property === attributes[0] &&
                (isPureObject(object[property]) || isArray(object[property]))
            ) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                this._setByAttributes(object[property], copyAttributes, value);
            }
        });
    }

    set<K>(attribute: string, value: K): void {
        let object = {};
        object = this._attributesToobject(object, attribute.split('.'), value);
        this.merge(object);
    }

    setRaw<K>(
        attribute: string,
        value: K,
        opt_isSafe: boolean | undefined = false,
    ): void {
        this.set(attribute, null);
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        this._setByAttributes(this, attributes, value);
    }

    remove(attribute: string): void {
        const attributes = attribute.split('.');
        this._removeByAttributes(this, attributes);
    }

    clear(): void {
        clear(this);
    }

    private _removeByAttributes(
        object: object | Objekt,
        attributes: Array<string>,
    ): void {
        for (const property in object) {
            if (object.hasOwnProperty(property)) {
                if (attributes.length === 1 && property === attributes[0]) {
                    delete object[property];
                } else if (
                    property === attributes[0] &&
                    (isPureObject(object[property]) ||
                        isArray(object[property]))
                ) {
                    const copyAttributes = copyArray(attributes);
                    copyAttributes.shift();
                    this._removeByAttributes(object[property], copyAttributes);
                }
            }
        }
    }

    each<K>(
        next: (value: K, key: string) => void,
        opt_properties?: object | undefined,
        opt_attributes?: Array<string> | undefined,
    ): void {
        const properties = opt_properties || this;
        const attributes = opt_attributes || [];

        eachObject(properties, (value, property) => {
            const attributesCopy = copyArray(attributes);
            attributesCopy.push(property);
            if (isPureObject(value) || isArray(value)) {
                this.each(next, value, attributesCopy);
            } else {
                next(value, attributesCopy.join('.'));
            }
        });
    }

    private _attributesToobject(
        object: object,
        attributes: Array<string>,
        value: any,
    ): object {
        const lastAttribute = attributes.pop();
        let base = object;
        for (const attribute of attributes) {
            base = base[attribute] = base[attribute] || {};
        }
        base[lastAttribute] = value;
        return object;
    }

    copy(): Objekt {
        const copy = this.copyObject();
        return new Objekt(copy);
    }

    copyObject(): object {
        return copyObject(this);
    }

    isEmpty(): boolean {
        return isEmpty(this);
    }

    allowKeys(keys: Array<string>): Objekt {
        return this.filterKeys(this, (key) => {
            return inArray(keys, key);
        });
    }

    denyKeys(keys: Array<string>): Objekt {
        return this.filterKeys(this, (key) => {
            return !inArray(keys, key);
        });
    }

    filterKeys(obj: Objekt, condition: (key: string) => boolean): Objekt {
        const resultObj = new Objekt();
        obj.each((value, key) => {
            if (condition(key)) {
                resultObj.set(key, value);
            }
        });
        return resultObj;
    }
}
