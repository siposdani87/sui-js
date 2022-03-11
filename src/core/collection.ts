import { Id } from '../utils';
import {
    each,
    instanceOf,
    isUndefined,
    clear,
    eq,
    pluck,
} from '../utils/operation';
import { Objekt } from './objekt';

/**
 * @class
 * @template T
 */
export class Collection<T extends Object = Objekt> {
    Type: any;
    items: T[];
    options: Objekt;
    /**
     * @param {!Array=} opt_items
     * @param {!Function=} opt_type
     * @param {!Object=} opt_options
     */
    constructor(
        opt_items: Array<any> | undefined = [],
        opt_type: any = Objekt,
        opt_options: Object = {},
    ) {
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
    _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            id: 'id',
            parent: undefined,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @param {!Array<Object|T>} items
     * @return {undefined}
     */
    load(objects: Array<Object | T>): void {
        each(objects, (object) => {
            this.push(object);
        });
    }
    /**
     * @param {!Array<Object|T>} items
     * @return {undefined}
     */
    reload(objects: Array<Object | T>): void {
        this.clear();
        this.load(objects);
    }
    /**
     * @param {!Object|!T} object
     * @return {T}
     */
    push(object: Object | T): T {
        const item = this._createItem(object);
        this.items.push(item);
        return item;
    }
    /**
     * @private
     * @param {!Object|!T} object
     * @return {T}
     */
    _createItem(object: Object | T): T {
        if (!instanceOf(object, this.Type)) {
            const parent = !isUndefined(this.options.parent)
                ? this.options.parent
                : this;
            return (new this.Type(object, parent)) as T;
        }
        return object as T;
    }
    /**
     * @param {number} index
     * @param {!Object|!T} object
     * @return {T}
     */
    set(index: number, object: Object | T): T {
        const item = this._createItem(object);
        if (index < this.size()) {
            this.items[index] = item;
        } else {
            this.push(item);
        }
        return item;
    }
    /**
     * @param {!Object|!T} object
     * @return {!T}
     */
    replace(object: Object | T): T | null {
        const item = this._createItem(object);
        if (item && instanceOf(item, Objekt)) {
            const id = (item as any as Objekt).get<Id>(this.options.id);
            const oldItem = this.findById(id);
            if (oldItem && instanceOf(oldItem, Objekt)) {
                (oldItem as any as Objekt).merge(item);
                return oldItem;
            }
        }
        return null;
    }
    /**
     * @return {!Array<T>}
     */
    getItems(): Array<T> {
        return this.items;
    }
    /**
     * @param {function(T)} callback
     * @param {function(T, number)} next
     * @param {!Array<T>=} opt_items
     * @return {!Array<T>}
     */
    iterator(
        callback: (_item: T) => any,
        next: (_item: T, _index: number) => any,
        opt_items?: Array<T> | undefined,
    ): Array<T> {
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
    each(next: (_item: T, _index: number) => any): void {
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
    get<K = T>(
        index: number,
        opt_attribute?: string | undefined,
    ): T | K | null {
        if (index >= 0 && index < this.items.length) {
            const item = this.items[index];
            if (item && opt_attribute && instanceOf(item, Objekt)) {
                return (item as any as Objekt).get<K>(opt_attribute);
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
    getById<K = T>(id: Id, opt_attribute?: string): T | K {
        const item = this.findById(id);
        if (item && opt_attribute && instanceOf(item, Objekt)) {
            return (item as any as Objekt).get<K>(opt_attribute);
        }
        return item;
    }
    /**
     * @return {undefined}
     */
    clear(): void {
        clear(this.items);
    }
    /**
     * @param {Id} id
     * @return {!T}
     */
    findById(id: Id): T {
        return this.findBy(this.options.id, id);
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    findBy(attribute: string, value: any): T {
        return this.findByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    findByCondition(conditionCallback: Function): T {
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
    findAllBy(attribute: string, value: any): Array<T> {
        return this.findAllByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!Array<T>}
     */
    findAllByCondition(conditionCallback: Function): Array<T> {
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
    delete(value: object | T): T {
        return this.deleteByCondition((item) => {
            return eq(item, value);
        });
    }
    /**
     * @param {Id} id
     * @return {!T}
     */
    deleteById(id: Id): T {
        return this.deleteBy(this.options.id, id);
    }
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    deleteBy(attribute: string, value: any): T {
        return this.deleteByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    deleteByCondition(conditionCallback: Function): T {
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
    deleteAllBy(attribute: string, value: any): Array<T> {
        return this.deleteAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    /**
     * @param {!Function} conditionCallback
     * @return {!Array<T>}
     */
    deleteAllByCondition(conditionCallback: Function): Array<T> {
        const items = [];
        const deletedItems = [];
        each(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                deletedItems.push(this.get(i));
            } else {
                items.push(this.get(i));
            }
        });
        this.items = items;
        return deletedItems;
    }
    /**
     * @return {number}
     */
    size(): number {
        return this.items.length;
    }
    /**
     * @param {number} offset
     * @param {number=} opt_count
     * @return {!Array<T>}
     */
    limit(offset: number, opt_count: number | undefined = 10): Array<T> {
        return this.items.slice(offset, offset + opt_count);
    }
    /**
     * @param {string} attribute
     * @return {!Array<T>}
     */
    pluck(attribute: string): Array<T> {
        return pluck(this.items, attribute);
    }
}
