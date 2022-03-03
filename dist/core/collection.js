import { each, instanceOf, isUndefined, clear, eq, pluck, } from '../utils/operation';
import { Objekt } from './objekt';
/**
 * @class
 * @template T
 */
export class Collection {
    type;
    items;
    options;
    /**
     * @param {!Array=} opt_items
     * @param {!Function=} opt_type
     * @param {!Object=} opt_options
     */
    constructor(opt_items = [], opt_type = Objekt, opt_options = {}) {
        this.type = opt_type;
        this._setOptions(opt_options);
        this.items = [];
        this.load(opt_items);
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            id: 'id',
            parent: undefined,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    load(items) {
        each(items, (item) => {
            this.push(item);
        });
    }
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    reload(items) {
        this.clear();
        this.load(items);
    }
    /**
     * @param {!Object|!T} object
     * @return {T}
     */
    push(object) {
        const item = this._createItem(object);
        this.items.push(item);
        return item;
    }
    /**
     * @private
     * @param {!Object|!T} object
     * @return {T}
     */
    _createItem(object) {
        let item = object;
        if (!instanceOf(object, this.Type)) {
            const parent = !isUndefined(this.options.parent)
                ? this.options.parent
                : this;
            item = new this.Type(object, parent);
        }
        return item;
    }
    Type(object, Type) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {number} index
     * @param {!Object|!T} item
     * @return {T}
     */
    set(index, item) {
        let itemObject = item;
        if (!instanceOf(item, this.Type)) {
            itemObject = new this.Type(item, this);
        }
        if (index < this.size()) {
            this.items[index] = itemObject;
        }
        else {
            this.push(itemObject);
        }
        return itemObject;
    }
    /**
     * @param {!Object|!T} item
     * @return {!T}
     */
    replace(item) {
        const oldItem = this.findById(item.get(this.options.id));
        if (oldItem) {
            oldItem.merge(item);
        }
        return oldItem;
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
     * @param {!Array=} opt_items
     * @return {!Array}
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
     * @param {number} index
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    get(index, opt_attribute) {
        let value = null;
        if (index >= 0 && index < this.items.length) {
            const item = this.items[index];
            value = item;
            if (opt_attribute) {
                value = item.get(opt_attribute);
            }
        }
        return value;
    }
    /**
     * @param {string|number} id
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    getById(id, opt_attribute) {
        const item = this.findById(id);
        if (item && opt_attribute) {
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
     * @param {string|number} value
     * @return {!T}
     */
    findById(value) {
        return this.findBy(this.options.id, value);
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
     * @return {!Array}
     */
    findAllBy(attribute, value) {
        return this.findAllByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!Array}
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
     * @param {string} value
     * @return {!T}
     */
    deleteById(value) {
        return this.deleteBy(this.options.id, value);
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
     * @return {!Array}
     */
    deleteAllBy(attribute, value) {
        return this.deleteAllByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!Array}
     */
    deleteAllByCondition(conditionCallback) {
        const items = [];
        const deletedItems = [];
        each(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                deletedItems.push(this.get(i));
            }
            else {
                items.push(this.get(i));
            }
        });
        this.items = items;
        return deletedItems;
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
     * @return {!Array}
     */
    limit(offset, opt_count = 10) {
        return this.items.slice(offset, offset + opt_count);
    }
    /**
     * @param {string} attribute
     * @return {!Array}
     */
    pluck(attribute) {
        return pluck(this.items, attribute);
    }
}
