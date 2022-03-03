import { Objekt } from './objekt';
/**
 * @class
 * @template T
 */
export declare class Collection {
    type: any;
    items: any[];
    options: Objekt;
    /**
     * @param {!Array=} opt_items
     * @param {!Function=} opt_type
     * @param {!Object=} opt_options
     */
    constructor(opt_items?: any[], opt_type?: any, opt_options?: {});
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    load(items: any): void;
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    reload(items: any): void;
    /**
     * @param {!Object|!T} object
     * @return {T}
     */
    push(object: any): any;
    /**
     * @private
     * @param {!Object|!T} object
     * @return {T}
     */
    _createItem(object: any): any;
    Type(object: any, Type: any): void;
    /**
     * @param {number} index
     * @param {!Object|!T} item
     * @return {T}
     */
    set(index: any, item: any): any;
    /**
     * @param {!Object|!T} item
     * @return {!T}
     */
    replace(item: any): any;
    /**
     * @return {!Array<T>}
     */
    getItems(): any[];
    /**
     * @param {function(T)} callback
     * @param {function(T, number)} next
     * @param {!Array=} opt_items
     * @return {!Array}
     */
    iterator(callback: any, next: any, opt_items?: any): any[];
    /**
     * @param {function(T, number)} next
     * @return {undefined}
     */
    each(next: any): void;
    /**
     * @param {number} index
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    get(index: any, opt_attribute?: any): any;
    /**
     * @param {string|number} id
     * @param {string=} opt_attribute
     * @return {T|*}
     */
    getById(id: any, opt_attribute?: any): any;
    /**
     * @return {undefined}
     */
    clear(): void;
    /**
     * @param {string|number} value
     * @return {!T}
     */
    findById(value: any): any;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    findBy(attribute: any, value: any): any;
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    findByCondition(conditionCallback: any): any;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!Array}
     */
    findAllBy(attribute: any, value: any): any[];
    /**
     * @param {!Function} conditionCallback
     * @return {!Array}
     */
    findAllByCondition(conditionCallback: any): any[];
    /**
     * @param {!Object|!T} value
     * @return {!T}
     */
    delete(value: any): any;
    /**
     * @param {string} value
     * @return {!T}
     */
    deleteById(value: any): any;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!T}
     */
    deleteBy(attribute: any, value: any): any;
    /**
     * @param {!Function} conditionCallback
     * @return {!T}
     */
    deleteByCondition(conditionCallback: any): any;
    /**
     * @param {string} attribute
     * @param {*} value
     * @return {!Array}
     */
    deleteAllBy(attribute: any, value: any): any[];
    /**
     * @param {!Function} conditionCallback
     * @return {!Array}
     */
    deleteAllByCondition(conditionCallback: any): any[];
    /**
     * @return {number}
     */
    size(): number;
    /**
     * @param {number} offset
     * @param {number=} opt_count
     * @return {!Array}
     */
    limit(offset: any, opt_count?: number): any[];
    /**
     * @param {string} attribute
     * @return {!Array}
     */
    pluck(attribute: any): any[];
}
