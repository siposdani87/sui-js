import { Id } from '../utils';
import { Objekt } from './objekt';
/**
 * @class
 * @template T
 */
export declare class Collection<T extends Object = Object> {
    Type: any;
    items: T[];
    options: Objekt;
    /**
     * @param {!Array=} opt_items
     * @param {!Function=} opt_type
     * @param {!Object=} opt_options
     */
    constructor(opt_items?: Array<T> | undefined, opt_type?: any, opt_options?: Object);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @param {!Array<Object|T>} items
     * @return {undefined}
     */
    load(objects: Array<Object | T>): void;
    /**
     * @param {!Array<Object|T>} items
     * @return {undefined}
     */
    reload(objects: Array<Object | T>): void;
    /**
     * @param {!Object|!T} object
     * @return {T}
     */
    push(object: Object | T): T;
    /**
     * @private
     * @param {!Object|!T} object
     * @return {T}
     */
    private _createItem;
    /**
     * @param {number} index
     * @param {!Object|!T} object
     * @return {T}
     */
    set(index: number, object: Object | T): T;
    /**
     * @param {!Object|!T} object
     * @return {!T}
     */
    replace(object: Object | T): T | null;
    /**
     * @return {!Array<T>}
     */
    getItems(): Array<T>;
    /**
     * @param {function(T)} callback
     * @param {function(T, number)} next
     * @param {!Array<T>=} opt_items
     * @return {!Array<T>}
     */
    iterator(callback: (_item: T) => boolean, next: (_item: T, _index: number) => void, opt_items?: Array<T> | undefined): Array<T>;
    /**
     * @param {function(T, number)} next
     * @return {undefined}
     */
    each(next: (_item: T, _index: number) => void): void;
    /**
     * @template K
     * @param {number} index
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    get<K = T>(index: number, opt_attribute?: string | undefined): T | K | null;
    /**
     * @template K
     * @param {Id} id
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    getById<K = T>(id: Id, opt_attribute?: string): T | K;
    /**
     * @return {undefined}
     */
    clear(): void;
    /**
     * @param {Id} id
     * @return {!T}
     */
    findById(id: Id): T;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    findBy(attribute: string, value: any): T;
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    findByCondition(conditionCallback: Function): T;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!Array<T>}
     */
    findAllBy(attribute: string, value: any): Array<T>;
    /**
     * @param {!Function} conditionCallback
     * @return {!Array<T>}
     */
    findAllByCondition(conditionCallback: Function): Array<T>;
    /**
     * @param {!Object|!T} value
     * @return {!T}
     */
    delete(value: Object | T): T;
    /**
     * @param {Id} id
     * @return {!T}
     */
    deleteById(id: Id): T;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    deleteBy(attribute: string, value: any): T;
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    deleteByCondition(conditionCallback: Function): T;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!Array<T>}
     */
    deleteAllBy(attribute: string, value: any): Array<T>;
    /**
     * @param {!Function} conditionCallback
     * @return {!Array<T>}
     */
    deleteAllByCondition(conditionCallback: Function): Array<T>;
    /**
     * @return {number}
     */
    size(): number;
    /**
     * @param {number} offset
     * @param {number=} opt_count
     * @return {!Array<T>}
     */
    limit(offset: number, opt_count?: number | undefined): Array<T>;
}
