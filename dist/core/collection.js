import { each, instanceOf, isUndefined, clear, eq, pluck, } from '../utils/operation';
import { Objekt } from './objekt';
/**
 * @class
 * @template T
 */
export class Collection {
    /**
     * @param {!Array=} opt_items
     * @param {!Function=} opt_type
     * @param {!Object=} opt_options
     */
    constructor(opt_items = [], opt_type = Objekt, opt_options = {}) {
        this.Type = opt_type;
        this._setOptions(opt_options);
        this.items = [];
        this.load(opt_items);
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: 'id',
            parent: undefined,
        });
        this.options.merge(opt_options);
    }
    /**
     * @param {!Array<Object|T>} items
     * @return {undefined}
     */
    load(objects) {
        each(objects, (object) => {
            this.push(object);
        });
    }
    /**
     * @param {!Array<Object|T>} items
     * @return {undefined}
     */
    reload(objects) {
        this.clear();
        this.load(objects);
    }
    /**
     * @param {!Object|!T} object
     * @return {T}
     */
    push(object) {
        const item = this._createKnot(object);
        this.items.push(item);
        return item;
    }
    /**
     * @private
     * @param {!Object|!T} object
     * @return {T}
     */
    _createKnot(object) {
        if (!instanceOf(object, this.Type)) {
            const parent = !isUndefined(this.options.parent)
                ? this.options.parent
                : this;
            return new this.Type(object, parent);
        }
        return object;
    }
    /**
     * @param {number} index
     * @param {!Object|!T} object
     * @return {T}
     */
    set(index, object) {
        const item = this._createKnot(object);
        if (index < this.size()) {
            this.items[index] = item;
        }
        else {
            this.push(item);
        }
        return item;
    }
    /**
     * @param {!Object|!T} object
     * @return {!T}
     */
    replace(object) {
        const item = this._createKnot(object);
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
     * @return {!Array<T>}
     */
    getItems() {
        return this.items;
    }
    /**
     * @param {function(T)} callback
     * @param {function(T, number)} next
     * @param {!Array<T>=} opt_items
     * @return {!Array<T>}
     */
    iterator(callback, next, opt_items) {
        opt_items = opt_items || this.items;
        const results = [];
        each(opt_items, (item, index) => {
            if (callback(item)) {
                next(item, index);
                results.push(item);
            }
        });
        return results;
    }
    /**
     * @param {function(T, number)} next
     * @return {undefined}
     */
    each(next) {
        this.iterator(() => {
            return true;
        }, next);
    }
    /**
     * @template K
     * @param {number} index
     * @param {string=} opt_attribute
     * @return {T|*}
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
     * @template K
     * @param {Id} id
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    getById(id, opt_attribute) {
        const item = this.findById(id);
        if (item && opt_attribute && instanceOf(item, Objekt)) {
            return item.get(opt_attribute);
        }
        return item;
    }
    /**
     * @return {undefined}
     */
    clear() {
        clear(this.items);
    }
    /**
     * @param {Id} id
     * @return {!T}
     */
    findById(id) {
        return this.findBy(this.options.id, id);
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    findBy(attribute, value) {
        return this.findByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    findByCondition(conditionCallback) {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        return this.get(i);
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!Array<T>}
     */
    findAllBy(attribute, value) {
        return this.findAllByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!Array<T>}
     */
    findAllByCondition(conditionCallback) {
        const items = [];
        each(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                items.push(this.get(i));
            }
        });
        return items;
    }
    /**
     * @param {!Object|!T} value
     * @return {!T}
     */
    delete(value) {
        return this.deleteByCondition((item) => {
            return eq(item, value);
        });
    }
    /**
     * @param {Id} id
     * @return {!T}
     */
    deleteById(id) {
        return this.deleteBy(this.options.id, id);
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    deleteBy(attribute, value) {
        return this.deleteByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
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
     * @param {string} attribute
     * @param {*} value
     * @return {!Array<T>}
     */
    deleteAllBy(attribute, value) {
        return this.deleteAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!Array<T>}
     */
    deleteAllByCondition(conditionCallback) {
        const items = [];
        const deletedKnots = [];
        each(this.items, (item, i) => {
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
     * @return {number}
     */
    size() {
        return this.items.length;
    }
    /**
     * @param {number} offset
     * @param {number=} opt_count
     * @return {!Array<T>}
     */
    limit(offset, opt_count = 10) {
        return this.items.slice(offset, offset + opt_count);
    }
    /**
     * @param {string} attribute
     * @return {!Array<T>}
     */
    pluck(attribute) {
        return pluck(this.items, attribute);
    }
}
