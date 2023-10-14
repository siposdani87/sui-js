import { each, instanceOf, isUndefined, clear, eq, eachArray, } from '../utils/operation';
import { Objekt } from './objekt';
export class Collection {
    constructor(opt_items = [], opt_type = Objekt, opt_options = {}) {
        this.Type = opt_type;
        this._setOptions(opt_options);
        this.items = [];
        this.load(opt_items);
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: 'id',
            parent: undefined,
        });
        this.options.merge(opt_options);
    }
    load(objects) {
        each(objects, (object) => {
            this.push(object);
        });
    }
    reload(objects) {
        this.clear();
        this.load(objects);
    }
    push(object) {
        const item = this._createItem(object);
        this.items.push(item);
        return item;
    }
    _createItem(object) {
        if (!instanceOf(object, this.Type)) {
            const parent = !isUndefined(this.options.parent)
                ? this.options.parent
                : this;
            return new this.Type(object, parent);
        }
        return object;
    }
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
    getItems() {
        return this.items;
    }
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
    each(next) {
        this.iterator(() => {
            return true;
        }, next);
    }
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
    getById(id, opt_attribute) {
        const item = this.findById(id);
        if (item && opt_attribute && instanceOf(item, Objekt)) {
            return item.get(opt_attribute);
        }
        return item;
    }
    clear() {
        clear(this.items);
    }
    findById(id) {
        return this.findBy(this.options.id, id);
    }
    findBy(attribute, value) {
        return this.findByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    findByCondition(conditionCallback) {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        return this.get(i);
    }
    findAllBy(attribute, value) {
        return this.findAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    findAllByCondition(conditionCallback) {
        const items = [];
        eachArray(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                items.push(this.get(i));
            }
        });
        return items;
    }
    delete(value) {
        return this.deleteByCondition((item) => {
            return eq(item, value);
        });
    }
    deleteById(id) {
        return this.deleteBy(this.options.id, id);
    }
    deleteBy(attribute, value) {
        return this.deleteByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }
    deleteByCondition(conditionCallback) {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        const item = this.get(i);
        this.items.splice(i, 1);
        return item;
    }
    deleteAllBy(attribute, value) {
        return this.deleteAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }
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
    size() {
        return this.items.length;
    }
    limit(offset, opt_count = 10) {
        return this.items.slice(offset, offset + opt_count);
    }
}
