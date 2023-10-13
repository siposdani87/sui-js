import { Objekt } from '../core';
/**
 * @param {*} value
 * @return {*}
 */
export declare const typeCast: (value: any) => any;
/**
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
export declare const merge: (objA: Object, objB: Object) => Object | undefined;
/**
 * @template T
 * @param {string} str
 * @param {!Object|!Array|null=} opt_params
 * @param {string=} opt_prefix
 * @param {string=} opt_postfix
 * @return {string}
 */
export declare const format: <T>(str: string, opt_params?: Object | T[], opt_prefix?: string | undefined, opt_postfix?: string | undefined) => string;
/**
 * @template T
 * @param {T=} opt_result
 * @return {function():T}
 */
export declare const noop: <T>(opt_result?: T) => () => T;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const eq: (a: unknown, b: unknown) => boolean;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const neq: (a: unknown, b: unknown) => boolean;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const gt: (a: unknown, b: unknown) => boolean;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const gte: (a: unknown, b: unknown) => boolean;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const lt: (a: unknown, b: unknown) => boolean;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const lte: (a: unknown, b: unknown) => boolean;
/**
 * @template T
 * @param {*} value
 * @return {boolean}
 */
export declare const isArray: <T>(value: any) => value is T[];
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isFunction: (value: any) => value is Function;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isString: (value: any) => value is string;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isNumber: (value: any) => value is number;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isFloat: (value: any) => value is number;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isInteger: (value: any) => value is number;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isObject: (value: any) => value is Object;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isPureObject: (value: any) => value is Object;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isDate: (value: any) => value is Date;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isNull: (value: any) => value is null;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isInfinity: (value: any) => value is number;
/**
 * @param {*} value
 * @return {boolean}
 */
export declare const isUndefined: (value: any) => value is undefined;
/**
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export declare const is: (value: any, type: string) => value is string;
/**
 * @template T
 * @param {*} value
 * @param {T} obj
 * @return {boolean}
 */
export declare const instanceOf: <T>(value: any, obj: T) => boolean;
/**
 * @template T
 * @param {!Array<T>|!Object} items
 * @param {function(*, string|number):undefined} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export declare const each: <T>(items: Object | T[], next: (item: any, key: string | number) => void, opt_start?: number, opt_end?: number) => void;
/**
 * @template T
 * @param {!Array} items
 * @param {function(T, number):undefined} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export declare const eachArray: <T>(items: T[], next: (item: T, index: number) => void, opt_start?: number | undefined, opt_end?: number | undefined) => void;
/**
 * @param {!Object} object
 * @param {function(*, string):undefined} next
 * @return {undefined}
 */
export declare const eachObject: (object: Object, next: (value: any, key: string) => void) => void;
/**
 * @param {function(number):undefined} next
 * @param {number} i
 * @param {number} length
 * @param {number} duration
 * @return {undefined}
 */
export declare const sleepEach: (next: (_index: number) => void, i: number, length: number, duration: number) => void;
/**
 * @template T
 * @param {!Array|!Object} items
 * @return {undefined}
 */
export declare const clear: <T>(items: Object | T[]) => void;
/**
 * @template T
 * @param {!Array<T>} items
 * @return {undefined}
 */
export declare const clearArray: <T>(items: T[]) => void;
/**
 * @param {!Object} items
 * @return {undefined}
 */
export declare const clearObject: (items: Object) => void;
/**
 * @template T
 * @param {!Array<T>} items
 * @param {T} item
 * @return {boolean}
 */
export declare const inArray: <T>(items: T[], item: T) => boolean;
/**
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export declare const contain: (str: string, subStr: string) => boolean;
/**
 * @param {!Array<string>} items
 * @param {*} item
 * @return {boolean}
 */
export declare const inContainArray: (items: Array<string>, item: string) => boolean;
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const isSame: (a: any, b: any) => boolean;
/**
 * @template T
 * @param {!Array<T>} items
 * @param {T} item
 * @return {undefined}
 */
export declare const remove: <T>(items: T[], item: T) => void;
/**
 * @template T
 * @param {!Array<T>|!Object} items
 * @return {!Array<T>|!Object|undefined}
 */
export declare const copy: <T>(items: Object | T[]) => Object | T[];
/**
 * @template T
 * @param {!Array} items
 * @return {!Array}
 */
export declare const copyArray: <T>(items: T[]) => T[];
/**
 * @param {!Object} item
 * @return {!Object}
 */
export declare const copyObject: (item: Object) => Object;
/**
 * @template T
 * @param {!Array<T>|!Object} items
 * @return {boolean}
 */
export declare const isEmpty: <T>(items: Object | T[]) => boolean;
/**
 * @deprecated
 * @template T
 * @param {!Array<T>} args
 * @param {function(*):undefined} callback
 * @return {undefined}
 */
export declare const list: <T>(args: T[], callback: (...rest: T[]) => void) => void;
/**
 * @param {string} str
 * @return {string}
 */
export declare const capitalize: (str: string) => string;
/**
 * @template T
 * @param {!Array<T>} items
 * @param {string} attribute
 * @return {!Array<T>}
 */
export declare const pluck: <T, K extends Objekt<Object> = Objekt<Object>>(items: K[], attribute: string) => T[];
/**
 * @param {!Object} obj
 * @param {function(*, string):boolean} condition
 * @return {!Array<string>}
 */
export declare const pluckKeys: (obj: Object, condition: (value: any, key: string) => boolean) => Array<string>;
/**
 * @param {number} x
 * @param {number} y
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
export declare const scrollTo: (x: number, y: number, opt_duration?: number | undefined, opt_step?: number | undefined) => void;
/**
 * @deprecated
 * @use scrollIntoView
 * @param {string} selector
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
export declare const scrollToElement: (selector: string, opt_duration?: number | undefined, opt_step?: number | undefined) => void;
/**
 * @param {string} selector
 * @param {string=} opt_behavior
 * @return {undefined}
 */
export declare const scrollIntoView: (selector: string, opt_behavior?: ScrollBehavior | undefined) => void;
/**
 * @param {!Function} func
 * @param {number=} opt_wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
export declare const debounce: (func: (ev: Event) => void, opt_wait?: number | undefined, opt_immediate?: boolean | undefined) => (this: Window, ev: Event) => void;
/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
export declare const urlWithQueryString: (url: string, opt_params?: Object | undefined) => string;
/**
 * @param {!Object=} opt_params
 * @return {string}
 */
export declare const getQueryString: (opt_params?: Object) => string;
/**
 * @param {string} url
 * @return {string}
 */
export declare const getExtensionName: (url: string) => string;
/**
 * @param {string} str
 * @return {string}
 */
export declare const normalize: (str: string) => string;
/**
 * @param {string} str
 * @return {undefined}
 */
export declare const copyToClipboard: (str: string) => void;
