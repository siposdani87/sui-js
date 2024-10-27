import { Id } from '../utils';
import {
    each,
    instanceOf,
    isUndefined,
    clear,
    eq,
    eachArray,
} from '../utils/operation';
import { Objekt } from './objekt';

export class Collection<T extends object = object> {
    Type: any;
    items: T[];
    options: Objekt;

    constructor(
        opt_items: Array<T> | undefined = [],
        opt_type: any = Objekt,
        opt_options: object = {},
    ) {
        this.Type = opt_type;
        this._setOptions(opt_options);
        this.items = [];
        this.load(opt_items);
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: 'id',
            parent: undefined,
        });
        this.options.merge(opt_options);
    }

    load(objects: Array<object | T>): void {
        each(objects, (object) => {
            this.push(object);
        });
    }

    reload(objects: Array<object | T>): void {
        this.clear();
        this.load(objects);
    }

    push(object: object | T): T {
        const item = this._createItem(object);
        this.items.push(item);
        return item;
    }

    private _createItem(object: object | T): T {
        if (!instanceOf(object, this.Type)) {
            const parent = !isUndefined(this.options.parent)
                ? this.options.parent
                : this;
            return new this.Type(object, parent) as T;
        }
        return object as T;
    }

    set(index: number, object: object | T): T {
        const item = this._createItem(object);
        if (index < this.size()) {
            this.items[index] = item;
        } else {
            this.push(item);
        }
        return item;
    }

    replace(object: object | T): T | null {
        const item = this._createItem(object);
        if (item && instanceOf(item, Objekt)) {
            const id = (item as any as Objekt).get<Id>(this.options.id);
            const oldKnot = this.findById(id);
            if (oldKnot && instanceOf(oldKnot, Objekt)) {
                (oldKnot as any as Objekt).merge(item);
                return oldKnot;
            }
        }
        return null;
    }

    getItems(): Array<T> {
        return this.items;
    }

    iterator(
        callback: (_item: T) => boolean,
        next: (_item: T, _index: number) => void,
        opt_items?: Array<T> | undefined,
    ): Array<T> {
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

    each(next: (_item: T, _index: number) => void): void {
        this.iterator(() => {
            return true;
        }, next);
    }

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

    getById<K = T>(id: Id, opt_attribute?: string): T | K {
        const item = this.findById(id);
        if (item && opt_attribute && instanceOf(item, Objekt)) {
            return (item as any as Objekt).get<K>(opt_attribute);
        }
        return item;
    }

    clear(): void {
        clear(this.items);
    }

    findById(id: Id): T {
        return this.findBy(this.options.id, id);
    }

    findBy(attribute: string, value: any): T {
        return this.findByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }

    findByCondition(conditionCallback: Function): T {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        return this.get(i);
    }

    findAllBy(attribute: string, value: any): Array<T> {
        return this.findAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }

    findAllByCondition(conditionCallback: Function): Array<T> {
        const items = [];
        eachArray(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                items.push(this.get(i));
            }
        });
        return items;
    }

    delete(value: object | T): T {
        return this.deleteByCondition((item) => {
            return eq(item, value);
        });
    }

    deleteById(id: Id): T {
        return this.deleteBy(this.options.id, id);
    }

    deleteBy(attribute: string, value: any): T {
        return this.deleteByCondition((item, i) => {
            return this.get(i, attribute) === value;
        });
    }

    deleteByCondition(conditionCallback: Function): T {
        let i = 0;
        while (i < this.items.length && !conditionCallback(this.items[i], i)) {
            i++;
        }
        const item = this.get(i);
        this.items.splice(i, 1);
        return item;
    }

    deleteAllBy(attribute: string, value: any): Array<T> {
        return this.deleteAllByCondition((_item, i) => {
            return this.get(i, attribute) === value;
        });
    }

    deleteAllByCondition(conditionCallback: Function): Array<T> {
        const items = [];
        const deletedKnots = [];
        eachArray(this.items, (item, i) => {
            if (conditionCallback(item, i)) {
                deletedKnots.push(this.get(i));
            } else {
                items.push(this.get(i));
            }
        });
        this.items = items;
        return deletedKnots;
    }

    size(): number {
        return this.items.length;
    }

    limit(offset: number, opt_count: number | undefined = 10): Array<T> {
        return this.items.slice(offset, offset + opt_count);
    }
}
