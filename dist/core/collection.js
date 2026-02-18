import { each, instanceOf, isUndefined, clear, eq, eachArray, } from '../utils/operation';
import { Objekt } from './objekt';
/**
 * Generic typed collection that wraps an array of items with find, delete,
 * iterate, and pagination operations. Items added as plain objects are
 * automatically instantiated through the configured `Type` constructor
 * (defaulting to {@link Objekt}), so every item in the collection shares a
 * consistent interface.
 *
 * Collection is used throughout the SUI framework to manage lists of
 * components, data records, and configuration entries. It supports
 * identifier-based lookups via a configurable ID attribute, condition-based
 * filtering, and bulk operations.
 *
 * @template T The item type stored in this collection.
 *
 * @example
 * const users = new Collection([
 *     { id: 1, name: 'Alice' },
 *     { id: 2, name: 'Bob' },
 * ]);
 * users.size();                  // 2
 * users.findById(1).get('name'); // 'Alice'
 * users.deleteById(2);
 * users.size();                  // 1
 *
 * @see {@link Objekt}
 * @category Core
 */
export class Collection {
    /**
     * Creates a new Collection, optionally pre-populated with initial items.
     * Each plain object in the items array is automatically wrapped using the
     * provided `Type` constructor.
     *
     * @param {Array<T>} [opt_items=[]] Initial items to load into the
     *     collection. Plain objects are wrapped via `Type`.
     * @param {any} [opt_type=Objekt] Constructor used to instantiate plain
     *     objects added to the collection. Called as
     *     `new Type(object, parent)`.
     * @param {object} [opt_options={}] Configuration options. Supports `id`
     *     (the attribute name used as the unique identifier, defaults to
     *     `'id'`) and `parent` (the parent reference passed to the `Type`
     *     constructor).
     *
     * @example
     * // Default: items become Objekt instances keyed by 'id'
     * const col = new Collection([{ id: 1, label: 'First' }]);
     *
     * // Custom type and ID attribute
     * const col2 = new Collection([], MyModel, { id: 'uuid' });
     */
    constructor(opt_items = [], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opt_type = Objekt, opt_options = {}) {
        this.Type = opt_type;
        this._setOptions(opt_options);
        this.items = [];
        this.load(opt_items);
    }
    /**
     * Initializes the options Objekt with defaults and merges any
     * user-provided overrides.
     *
     * @param {object} [opt_options={}] User-provided options to merge.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: 'id',
            parent: undefined,
        });
        this.options.merge(opt_options);
    }
    /**
     * Appends each object in the array to this collection. Plain objects are
     * automatically wrapped via the configured `Type` constructor.
     *
     * @param {Array<object | T>} objects Items to add to the collection.
     *
     * @example
     * const col = new Collection();
     * col.load([{ id: 1 }, { id: 2 }]);
     * col.size(); // 2
     */
    load(objects) {
        each(objects, (object) => {
            this.push(object);
        });
    }
    /**
     * Clears all existing items and loads the given objects, effectively
     * replacing the entire collection contents.
     *
     * @param {Array<object | T>} objects Items to populate the collection
     *     with after clearing.
     *
     * @example
     * const col = new Collection([{ id: 1 }]);
     * col.reload([{ id: 2 }, { id: 3 }]);
     * col.size(); // 2
     */
    reload(objects) {
        this.clear();
        this.load(objects);
    }
    /**
     * Adds a single item to the end of the collection. If the item is a
     * plain object (not already an instance of `Type`), it is wrapped via
     * the configured constructor.
     *
     * @param {object | T} object The item or plain object to add.
     * @returns {T} The item as stored in the collection (possibly wrapped).
     *
     * @example
     * const col = new Collection();
     * const item = col.push({ id: 5, name: 'Eve' });
     * item.get('name'); // 'Eve'
     */
    push(object) {
        const item = this._createItem(object);
        this.items.push(item);
        return item;
    }
    /**
     * Wraps a plain object in the configured `Type` if it is not already an
     * instance. The parent reference from options (or this collection) is
     * passed as the second constructor argument.
     *
     * @param {object | T} object The item or plain object to wrap.
     * @returns {T} The item as an instance of `Type`.
     */
    _createItem(object) {
        if (!instanceOf(object, this.Type)) {
            const parent = !isUndefined(this.options.parent)
                ? this.options.parent
                : this;
            return new this.Type(object, parent);
        }
        return object;
    }
    /**
     * Sets an item at a specific index in the collection. If the index is
     * within the current bounds, the existing item is replaced. If the index
     * is out of bounds, the item is appended via {@link Collection.push}.
     *
     * @param {number} index Zero-based position to set the item at.
     * @param {object | T} object The item or plain object to store.
     * @returns {T} The item as stored in the collection.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * col.set(0, { id: 10 });
     * col.get(0).get('id'); // 10
     */
    set(index, object) {
        const item = this._createItem(object);
        if (index < this.size()) {
            this.items[index] = item;
        }
        else {
            this.push(item);
        }
        return item;
    }
    /**
     * Finds an existing item by its ID and merges the given object's
     * properties into it. This is useful for updating an item in-place
     * without changing its reference in the collection.
     *
     * @param {object | T} object The object containing updated properties
     *     and an ID matching an existing item.
     * @returns {T | null} The updated item if found, or `null` if no item
     *     with a matching ID exists.
     *
     * @example
     * const col = new Collection([{ id: 1, name: 'Alice' }]);
     * col.replace({ id: 1, name: 'Alicia' });
     * col.findById(1).get('name'); // 'Alicia'
     */
    replace(object) {
        const item = this._createItem(object);
        if (item && instanceOf(item, Objekt)) {
            const id = item.get(this.options.id);
            const oldKnot = this.findById(id);
            if (oldKnot && instanceOf(oldKnot, Objekt)) {
                oldKnot.merge(item);
                return oldKnot;
            }
        }
        return null;
    }
    /**
     * Returns the raw internal array of items. The returned array is the
     * same reference used internally, so mutations will affect the
     * collection.
     *
     * @returns {Array<T>} The internal items array.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * col.getItems().length; // 2
     */
    getItems() {
        return this.items;
    }
    /**
     * Core iteration method that filters and processes items in a single
     * pass. The `callback` predicate determines which items to include, and
     * the `next` function is invoked for each matching item. Returns the
     * array of matching items.
     *
     * @param {Function} callback Predicate receiving an item; return `true`
     *     to include it.
     * @param {Function} next Function invoked with `(item, index)` for each
     *     matching item.
     * @param {Array<T>} [opt_items] Items to iterate over; defaults to the
     *     collection's internal array.
     * @returns {Array<T>} Array of items that matched the callback predicate.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * const evens = col.iterator(
     *     (item) => item.get('id') % 2 === 0,
     *     (item) => console.log(item.get('id')),
     * );
     * // Logs: 2
     * // evens.length === 1
     */
    iterator(callback, next, opt_items) {
        opt_items = opt_items || this.items;
        const results = [];
        eachArray(opt_items, (item, index) => {
            if (callback(item)) {
                next(item, index);
                results.push(item);
            }
        });
        return results;
    }
    /**
     * Iterates over every item in the collection, invoking the callback for
     * each one. This is a convenience wrapper around {@link Collection.iterator}
     * that accepts all items.
     *
     * @param {Function} next Function invoked with `(item, index)` for each
     *     item.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * col.each((item, index) => {
     *     console.log(index, item.get('id'));
     * });
     * // Logs: 0 1, 1 2
     */
    each(next) {
        this.iterator(() => {
            return true;
        }, next);
    }
    /**
     * Returns the item at the given index. If `opt_attribute` is provided
     * and the item is an {@link Objekt}, the attribute value is extracted
     * and returned instead of the item itself.
     *
     * @template K The type of the extracted attribute value.
     * @param {number} index Zero-based index of the item to retrieve.
     * @param {string} [opt_attribute] Optional dot-notation attribute to
     *     extract from the item via {@link Objekt.get}.
     * @returns {T | K | null} The item, the extracted attribute value, or
     *     `null` if the index is out of bounds.
     *
     * @example
     * const col = new Collection([{ id: 1, name: 'Alice' }]);
     * col.get(0);           // Objekt { id: 1, name: 'Alice' }
     * col.get(0, 'name');   // 'Alice'
     * col.get(99);          // null
     */
    get(index, opt_attribute) {
        if (index >= 0 && index < this.items.length) {
            const item = this.items[index];
            if (item && opt_attribute && instanceOf(item, Objekt)) {
                return item.get(opt_attribute);
            }
            return item;
        }
        return null;
    }
    /**
     * Finds an item by its ID and optionally extracts an attribute value.
     * Combines {@link Collection.findById} and {@link Objekt.get} in a
     * single call.
     *
     * @template K The type of the extracted attribute value.
     * @param {Id} id The identifier value to search for.
     * @param {string} [opt_attribute] Optional dot-notation attribute to
     *     extract from the found item.
     * @returns {T | K | null} The item, the extracted attribute value, or
     *     `null` if no item matches.
     *
     * @example
     * const col = new Collection([{ id: 1, name: 'Alice' }]);
     * col.getById(1);           // Objekt { id: 1, name: 'Alice' }
     * col.getById(1, 'name');   // 'Alice'
     * col.getById(999);         // null
     */
    getById(id, opt_attribute) {
        const item = this.findById(id);
        if (item && opt_attribute && instanceOf(item, Objekt)) {
            return item.get(opt_attribute);
        }
        return item;
    }
    /**
     * Removes all items from the collection, resetting its size to zero.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * col.clear();
     * col.size(); // 0
     */
    clear() {
        clear(this.items);
    }
    /**
     * Finds the first item whose configured ID attribute matches the given
     * value.
     *
     * @param {Id} id The identifier value to search for (compared with
     *     strict equality).
     * @returns {T | null} The matching item, or `null` if not found.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * col.findById(2).get('id'); // 2
     * col.findById(99);          // null
     */
    findById(id) {
        return this.findBy(this.options.id, id);
    }
    /**
     * Finds the first item where the given attribute equals the specified
     * value (strict equality).
     *
     * @param {string} attribute Dot-notation attribute path to compare.
     * @param {any} value The value to match against.
     * @returns {T | null} The first matching item, or `null` if not found.
     *
     * @example
     * const col = new Collection([
     *     { id: 1, role: 'admin' },
     *     { id: 2, role: 'user' },
     * ]);
     * col.findBy('role', 'admin').get('id'); // 1
     */
    findBy(attribute, value) {
        return this.findByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * Finds the first item for which the condition callback returns `true`.
     * Items are tested sequentially from index 0.
     *
     * @param {Function} conditionCallback Predicate receiving `(item, index)`;
     *     return `true` to select the item.
     * @returns {T | null} The first matching item, or `null` if none match.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * const item = col.findByCondition((item) => item.get('id') > 1);
     * item.get('id'); // 2
     */
    findByCondition(conditionCallback) {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        return this.get(i);
    }
    /**
     * Returns all items where the given attribute equals the specified value
     * (strict equality).
     *
     * @param {string} attribute Dot-notation attribute path to compare.
     * @param {any} value The value to match against.
     * @returns {Array<T>} Array of all matching items (may be empty).
     *
     * @example
     * const col = new Collection([
     *     { id: 1, role: 'user' },
     *     { id: 2, role: 'admin' },
     *     { id: 3, role: 'user' },
     * ]);
     * col.findAllBy('role', 'user').length; // 2
     */
    findAllBy(attribute, value) {
        return this.findAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * Returns all items for which the condition callback returns `true`.
     *
     * @param {Function} conditionCallback Predicate receiving `(item, index)`;
     *     return `true` to include the item.
     * @returns {Array<T>} Array of all matching items (may be empty).
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * const items = col.findAllByCondition((item) => item.get('id') >= 2);
     * items.length; // 2
     */
    findAllByCondition(conditionCallback) {
        const items = [];
        eachArray(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                items.push(this.get(i));
            }
        });
        return items;
    }
    /**
     * Removes the first item that is strictly equal to the given value
     * (reference equality via {@link eq}).
     *
     * @param {object | T} value The item reference to delete.
     * @returns {T | null} The deleted item, or `null` if not found.
     *
     * @example
     * const col = new Collection([{ id: 1 }]);
     * const item = col.get(0);
     * col.delete(item);
     * col.size(); // 0
     */
    delete(value) {
        return this.deleteByCondition((item) => {
            return eq(item, value);
        });
    }
    /**
     * Removes the first item whose configured ID attribute matches the
     * given value.
     *
     * @param {Id} id The identifier of the item to remove.
     * @returns {T | null} The deleted item, or `null` if no match was found.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * const deleted = col.deleteById(1);
     * deleted.get('id'); // 1
     * col.size();        // 1
     */
    deleteById(id) {
        return this.deleteBy(this.options.id, id);
    }
    /**
     * Removes the first item where the given attribute equals the specified
     * value.
     *
     * @param {string} attribute Dot-notation attribute path to compare.
     * @param {any} value The value to match against.
     * @returns {T | null} The deleted item, or `null` if no match was found.
     *
     * @example
     * const col = new Collection([
     *     { id: 1, role: 'admin' },
     *     { id: 2, role: 'user' },
     * ]);
     * col.deleteBy('role', 'user');
     * col.size(); // 1
     */
    deleteBy(attribute, value) {
        return this.deleteByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * Removes the first item for which the condition callback returns `true`.
     * The item is spliced from the internal array and returned.
     *
     * @param {Function} conditionCallback Predicate receiving `(item, index)`;
     *     return `true` to delete the item.
     * @returns {T | null} The deleted item, or `null` if no match was found.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * const deleted = col.deleteByCondition((item) => item.get('id') === 2);
     * deleted.get('id'); // 2
     * col.size();        // 2
     */
    deleteByCondition(conditionCallback) {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        const item = this.get(i);
        this.items.splice(i, 1);
        return item;
    }
    /**
     * Removes all items where the given attribute equals the specified value.
     *
     * @param {string} attribute Dot-notation attribute path to compare.
     * @param {any} value The value to match against.
     * @returns {Array<T>} Array of all deleted items.
     *
     * @example
     * const col = new Collection([
     *     { id: 1, role: 'user' },
     *     { id: 2, role: 'admin' },
     *     { id: 3, role: 'user' },
     * ]);
     * const deleted = col.deleteAllBy('role', 'user');
     * deleted.length; // 2
     * col.size();     // 1
     */
    deleteAllBy(attribute, value) {
        return this.deleteAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * Removes all items for which the condition callback returns `true`.
     * The internal array is rebuilt to contain only non-matching items.
     *
     * @param {Function} conditionCallback Predicate receiving `(item, index)`;
     *     return `true` to delete the item.
     * @returns {Array<T>} Array of all deleted items.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * const deleted = col.deleteAllByCondition(
     *     (item) => item.get('id') % 2 !== 0,
     * );
     * deleted.length; // 2 (ids 1 and 3)
     * col.size();     // 1 (id 2 remains)
     */
    deleteAllByCondition(conditionCallback) {
        const items = [];
        const deletedKnots = [];
        eachArray(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                deletedKnots.push(this.get(i));
            }
            else {
                items.push(this.get(i));
            }
        });
        this.items = items;
        return deletedKnots;
    }
    /**
     * Returns the number of items currently in the collection.
     *
     * @returns {number} The item count.
     *
     * @example
     * const col = new Collection([{ id: 1 }, { id: 2 }]);
     * col.size(); // 2
     */
    size() {
        return this.items.length;
    }
    /**
     * Returns a slice of the collection's items for pagination. The slice
     * starts at `offset` and contains up to `opt_count` items.
     *
     * @param {number} offset Zero-based starting index of the slice.
     * @param {number} [opt_count=10] Maximum number of items to return.
     * @returns {Array<T>} The sliced subset of items.
     *
     * @example
     * const col = new Collection([
     *     { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
     * ]);
     * col.limit(1, 2); // [Objekt{id:2}, Objekt{id:3}]
     * col.limit(3);    // [Objekt{id:4}, Objekt{id:5}]
     */
    limit(offset, opt_count = 10) {
        return this.items.slice(offset, offset + opt_count);
    }
}
