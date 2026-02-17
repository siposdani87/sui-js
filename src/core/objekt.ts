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
 * Recursive object wrapper that provides dot-notation access to nested
 * properties. Objekt serves as the foundational data container throughout the
 * SUI framework, replacing plain JavaScript objects with a richer interface
 * for deep property access, recursive merging, and filtered copying.
 *
 * Nested plain objects are automatically converted to Objekt instances during
 * {@link Objekt.merge}, so the entire object tree supports the same API at
 * every level.
 *
 * @example
 * const config = new Objekt({
 *     server: { host: 'localhost', port: 3000 },
 *     debug: true,
 * });
 * config.get('server.host');       // 'localhost'
 * config.set('server.port', 8080);
 * config.get('server.port');       // 8080
 *
 * @see {@link Collection}
 * @category Core
 */
// Record, Entry, Thing
export class Objekt<T extends object = object> {
    [key: string]: T[keyof T | any];

    /**
     * Creates a new Objekt instance, optionally populated with the properties
     * of the given plain object. Nested plain objects are recursively converted
     * to Objekt instances.
     *
     * @param {T} [opt_object] Initial data to merge into this instance.
     *
     * @example
     * const obj = new Objekt({ name: 'Alice', address: { city: 'Paris' } });
     * obj.get('address.city'); // 'Paris'
     */
    constructor(opt_object?: T) {
        Object.call(this, opt_object);
        this.merge(opt_object);
    }

    /**
     * Recursively merges the properties of the given object into this Objekt.
     * Plain-object values are converted to Objekt instances so the full API
     * is available at every nesting level. Arrays whose first element is a
     * plain object are converted element-wise. Scalar values are passed
     * through {@link typeCast}.
     *
     * @param {any} object The source object whose properties will be merged.
     * @returns {Objekt} This instance, for chaining.
     *
     * @example
     * const obj = new Objekt({ a: 1 });
     * obj.merge({ b: 2, c: { d: 3 } });
     * obj.get('c.d'); // 3
     */
    merge(object: any): Objekt {
        if (isPureObject(object)) {
            const obj = object as Record<string, any>;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (isPureObject(obj[key])) {
                        if (!instanceOf(this[key], Objekt)) {
                            this[key] = new Objekt(this[key]);
                        }
                        this[key].merge(obj[key]);
                    } else if (isArray(obj[key]) && isPureObject(obj[key][0])) {
                        this._convertobject(obj, key);
                        this[key] = obj[key];
                    } else {
                        this[key] = typeCast(obj[key]);
                    }
                }
            }
        }
        return this;
    }

    /**
     * Converts each element in an array property from a plain object to an
     * Objekt instance, mutating the source array in place.
     *
     * @param {any} object The parent object containing the array.
     * @param {string} key The property name of the array to convert.
     */
    private _convertobject(object: any, key: string): void {
        each(object[key], (obj, i) => {
            object[key][i] = new Objekt(obj);
        });
    }

    /**
     * Retrieves a value from this Objekt using a dot-notation path. When the
     * path resolves to a nested Objekt, that Objekt is returned. If the path
     * does not exist, the optional default value is returned instead.
     *
     * When `opt_isSafe` is `true` the attribute string is treated as a single
     * literal key rather than being split on dots; this is useful when keys
     * themselves contain periods.
     *
     * @template K The expected return type.
     * @param {string | undefined} attribute Dot-notation path such as
     *     `'user.address.city'`, or `undefined` to return the entire Objekt.
     * @param {K} [opt_defaultValue] Value returned when the path does not
     *     resolve to an existing property.
     * @param {boolean} [opt_isSafe=false] When `true`, treat the attribute
     *     as a literal key without splitting on dots.
     * @returns {K} The resolved value, or the default value if the path is
     *     not found.
     *
     * @example
     * const obj = new Objekt({ user: { name: 'Bob', age: 30 } });
     * obj.get('user.name');             // 'Bob'
     * obj.get('user.email', 'n/a');     // 'n/a'
     * obj.get('user.name', '', true);   // undefined (literal key 'user.name')
     */
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

        return !isUndefined(value) ? value : opt_defaultValue!;
    }

    /**
     * Recursively walks the attribute path to retrieve a nested value.
     *
     * @template K The expected return type.
     * @param {object | Objekt} object The current level of the object tree.
     * @param {Array<string>} attributes Remaining path segments to resolve.
     * @returns {K | undefined} The value at the resolved path, or `undefined`.
     */
    private _getByAttributes<K>(
        object: object | Objekt,
        attributes: Array<string>,
    ): K | undefined {
        let result = undefined;
        const obj = object as Record<string, any>;
        each(object, (_value, property) => {
            if (
                attributes.length === 1 &&
                property.toString() === attributes[0]
            ) {
                result = obj[property];
            } else if (
                property.toString() === attributes[0] &&
                (isPureObject(obj[property]) || isArray(obj[property]))
            ) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                result = this._getByAttributes(obj[property], copyAttributes);
            }
        });
        return result;
    }

    /**
     * Recursively walks the attribute path and sets the value at the final
     * segment, mutating the existing object tree in place.
     *
     * @param {object | Objekt} object The current level of the object tree.
     * @param {Array<string>} attributes Remaining path segments to traverse.
     * @param {any} value The value to assign at the resolved path.
     */
    private _setByAttributes(
        object: object | Objekt,
        attributes: Array<string>,
        value: any,
    ): void {
        const obj = object as Record<string, any>;
        eachObject(obj, (_oldValue, property) => {
            if (attributes.length === 1 && property === attributes[0]) {
                obj[property] = value;
            } else if (
                property === attributes[0] &&
                (isPureObject(obj[property]) || isArray(obj[property]))
            ) {
                const copyAttributes = copyArray(attributes);
                copyAttributes.shift();
                this._setByAttributes(obj[property], copyAttributes, value);
            }
        });
    }

    /**
     * Sets a value at the given dot-notation path. Intermediate objects are
     * created as needed and merged into this Objekt, so the full path is
     * guaranteed to exist after the call.
     *
     * @template K The type of the value being set.
     * @param {string} attribute Dot-notation path such as `'theme.color'`.
     * @param {K} value The value to assign.
     *
     * @example
     * const obj = new Objekt();
     * obj.set('theme.color', 'blue');
     * obj.get('theme.color'); // 'blue'
     */
    set<K>(attribute: string, value: K): void {
        let object = {};
        object = this._attributesToobject(object, attribute.split('.'), value);
        this.merge(object);
    }

    /**
     * Sets a value at the given path, bypassing the recursive merge used by
     * {@link Objekt.set}. This is useful when the value is not a plain object
     * and should be stored as-is (e.g., class instances, DOM elements, or
     * functions).
     *
     * Internally, the path is first set to `null` via {@link Objekt.set} to
     * ensure the path exists, then the actual value is written directly with
     * {@link Objekt._setByAttributes}.
     *
     * @template K The type of the value being set.
     * @param {string} attribute Dot-notation path.
     * @param {K} value The value to assign without merging.
     * @param {boolean} [opt_isSafe=false] When `true`, treat the attribute
     *     as a literal key without splitting on dots.
     *
     * @example
     * const obj = new Objekt();
     * const el = document.createElement('div');
     * obj.setRaw('container', el);
     * obj.get('container') === el; // true
     */
    setRaw<K>(
        attribute: string,
        value: K,
        opt_isSafe: boolean | undefined = false,
    ): void {
        this.set(attribute, null);
        const attributes = opt_isSafe ? [attribute] : attribute.split('.');
        this._setByAttributes(this, attributes, value);
    }

    /**
     * Removes the property at the given dot-notation path. If the path
     * includes nested segments, only the leaf property is deleted.
     *
     * @param {string} attribute Dot-notation path of the property to remove.
     *
     * @example
     * const obj = new Objekt({ a: { b: 1, c: 2 } });
     * obj.remove('a.b');
     * obj.get('a.b'); // undefined
     * obj.get('a.c'); // 2
     */
    remove(attribute: string): void {
        const attributes = attribute.split('.');
        this._removeByAttributes(this, attributes);
    }

    /**
     * Removes all properties from this Objekt, leaving it empty.
     *
     * @example
     * const obj = new Objekt({ x: 1, y: 2 });
     * obj.clear();
     * obj.isEmpty(); // true
     */
    clear(): void {
        clear(this);
    }

    /**
     * Recursively walks the attribute path and deletes the property at the
     * final segment.
     *
     * @param {object | Objekt} object The current level of the object tree.
     * @param {Array<string>} attributes Remaining path segments to traverse.
     */
    private _removeByAttributes(
        object: object | Objekt,
        attributes: Array<string>,
    ): void {
        const obj = object as Record<string, any>;
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (attributes.length === 1 && property === attributes[0]) {
                    delete obj[property];
                } else if (
                    property === attributes[0] &&
                    (isPureObject(obj[property]) || isArray(obj[property]))
                ) {
                    const copyAttributes = copyArray(attributes);
                    copyAttributes.shift();
                    this._removeByAttributes(obj[property], copyAttributes);
                }
            }
        }
    }

    /**
     * Recursively iterates over every leaf value in this Objekt (or a
     * sub-tree), invoking the callback with the value and its full
     * dot-notation key. Nested objects and arrays are traversed automatically;
     * only scalar leaf values trigger the callback.
     *
     * @template K The type of the leaf values.
     * @param {Function} next Callback invoked for each leaf value, receiving
     *     `(value, key)` where `key` is the full dot-notation path.
     * @param {object} [opt_properties] Sub-tree to iterate; defaults to this
     *     Objekt.
     * @param {Array<string>} [opt_attributes] Accumulated path segments used
     *     during recursion.
     *
     * @example
     * const obj = new Objekt({ a: { b: 1 }, c: 2 });
     * obj.each((value, key) => {
     *     console.log(key, value);
     * });
     * // Logs: 'a.b' 1, 'c' 2
     */
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

    /**
     * Builds a nested plain-object structure from a dot-notation attribute
     * path and assigns the value at the deepest level.
     *
     * @param {object} object The object to populate with nested keys.
     * @param {Array<string>} attributes Path segments to create.
     * @param {any} value The value to assign at the deepest level.
     * @returns {object} The populated object.
     */
    private _attributesToobject(
        object: object,
        attributes: Array<string>,
        value: any,
    ): object {
        const lastAttribute = attributes.pop();
        let base: Record<string, any> = object as Record<string, any>;
        for (const attribute of attributes) {
            base = base[attribute] = base[attribute] || {};
        }
        base[lastAttribute!] = value;
        return object;
    }

    /**
     * Creates a deep copy of this Objekt, returning a new independent
     * instance with the same data.
     *
     * @returns {Objekt} A new Objekt containing a deep copy of this
     *     instance's data.
     *
     * @example
     * const original = new Objekt({ x: { y: 1 } });
     * const clone = original.copy();
     * clone.set('x.y', 99);
     * original.get('x.y'); // 1 (unchanged)
     */
    copy(): Objekt {
        const copy = this.copyObject();
        return new Objekt(copy);
    }

    /**
     * Returns a deep copy of this Objekt's data as a plain JavaScript object.
     *
     * @returns {object} A plain object representation of this Objekt.
     *
     * @example
     * const obj = new Objekt({ a: 1, b: { c: 2 } });
     * const plain = obj.copyObject();
     * // plain is { a: 1, b: { c: 2 } } (plain object, not Objekt)
     */
    copyObject(): object {
        return copyObject(this);
    }

    /**
     * Checks whether this Objekt has no properties.
     *
     * @returns {boolean} `true` if the Objekt contains no properties,
     *     `false` otherwise.
     *
     * @example
     * new Objekt().isEmpty();         // true
     * new Objekt({ a: 1 }).isEmpty(); // false
     */
    isEmpty(): boolean {
        return isEmpty(this);
    }

    /**
     * Creates a new Objekt containing only the properties whose
     * dot-notation keys appear in the given allowlist. All other properties
     * are excluded.
     *
     * @param {Array<string>} keys Dot-notation keys to include.
     * @returns {Objekt} A new Objekt with only the allowed keys.
     *
     * @example
     * const obj = new Objekt({ name: 'Alice', age: 30, role: 'admin' });
     * const filtered = obj.allowKeys(['name', 'role']);
     * filtered.get('name'); // 'Alice'
     * filtered.get('age');  // undefined
     */
    allowKeys(keys: Array<string>): Objekt {
        return this.filterKeys(this, (key) => {
            return inArray(keys, key);
        });
    }

    /**
     * Creates a new Objekt excluding the properties whose dot-notation keys
     * appear in the given denylist. All other properties are kept.
     *
     * @param {Array<string>} keys Dot-notation keys to exclude.
     * @returns {Objekt} A new Objekt without the denied keys.
     *
     * @example
     * const obj = new Objekt({ name: 'Alice', password: 'secret' });
     * const safe = obj.denyKeys(['password']);
     * safe.get('password'); // undefined
     * safe.get('name');     // 'Alice'
     */
    denyKeys(keys: Array<string>): Objekt {
        return this.filterKeys(this, (key) => {
            return !inArray(keys, key);
        });
    }

    /**
     * Creates a new Objekt by iterating over the leaf values of the source
     * Objekt and including only those whose dot-notation keys satisfy the
     * condition callback.
     *
     * @param {Objekt} obj The source Objekt to filter.
     * @param {Function} condition Predicate receiving a dot-notation key;
     *     return `true` to include the property.
     * @returns {Objekt} A new Objekt containing only the matching properties.
     *
     * @example
     * const obj = new Objekt({ a: 1, b: 2, c: 3 });
     * const result = obj.filterKeys(obj, (key) => key !== 'b');
     * result.get('a'); // 1
     * result.get('b'); // undefined
     */
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
